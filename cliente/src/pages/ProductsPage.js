import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Button, Container, Stack, Typography } from '@mui/material';
// Services
import { GetProducts } from '../services/product-service';
// components
import { ProductCartWidget, ProductList, ProductModalNew } from '../sections/@dashboard/products';
// Mock
import DefaultImg from '../_mock/product';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    Promise.resolve(GetProducts()).then((response) => {
      setList(
        response.map((product) => ({
          id: product.product_id,
          name: product.name,
          stock: product.amount,
          price: product.price,
          description: `Beautiful ${product.name}`,
          cover: product.cover || DefaultImg,
        }))
      );
    });
  }, [setList]);

  const props = {
    products: list,
    editable: edit,
  };

  return (
    <>
      <Helmet>
        <title> Products | TFlores </title>
      </Helmet>

      <Container>
        <Stack direction={'row'} justifyContent="space-between" alignItems="center" sx={{ mb: 5 }}>
          <Typography variant="h4">Products</Typography>

          <Stack direction={'row'} spacing={2}>
            {edit && <ProductModalNew className={edit ? 'show-element' : null} />}

            <Button onClick={() => setEdit(!edit)} variant="outlined">
              {edit ? `Close editor` : `Open editor`}
            </Button>
          </Stack>
        </Stack>

        <ProductList {...props} />

        <ProductCartWidget />
      </Container>
    </>
  );
}
