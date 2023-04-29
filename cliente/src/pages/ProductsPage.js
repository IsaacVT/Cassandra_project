import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Button, Container, Stack, Typography } from '@mui/material';
// Services
import { GetProducts } from '../services/product-service';
// components
import { ProductCartWidget, ProductList, ProductModalNew } from '../sections/@dashboard/products';

// ----------------------------------------------------------------------

export default function ProductsPage() {

  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    Promise.resolve(
      GetProducts()
    ).then((response) => {
      setList(response.map((product) => ({
        id: product.product_id,
        name: product.name,
        stock: product.amount,
        price: product.price,
        description: 'Belle oze amariyo, semidesnude acompañado de flores varias',
        cover: '/assets/illustrations/illustration_xv.png'
      })))
    })
  }, [setList]);

  const props = {
    products: list,
    editable: edit
  }

  return (
    <>
      <Helmet>
        <title> Products | TFlores </title>
      </Helmet>

      <Container>
        <Stack direction={"row"} justifyContent="space-between" alignItems="center" sx={{ mb: 5 }}>

          <Typography variant="h4">
            Productos
          </Typography>

          <Stack direction={'row'} spacing={2}>
            {edit && <ProductModalNew className={edit ? "show-element" : null} />}

            <Button onClick={() => setEdit(!edit)} variant="outlined">
              {edit ? `Cerrar editor` : `Abrir editor`}
            </Button>
          </Stack>
        </Stack>

        <ProductList {...props} />

        <ProductCartWidget />
      </Container>
    </>
  );
}
