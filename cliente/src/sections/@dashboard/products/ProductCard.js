import PropTypes from 'prop-types';
// @mui
import { Avatar, Box, ButtonGroup, Card, CardActionArea, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// Icons
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
// utils
import { fCurrency } from '../../../utils/formatNumber';
import { AddLocalProd } from '../../../utils/localData';
// components
import ProductModalDelete from './ProductModalDelete';
import ProductModalDetails from './ProductModalDetails';
import ProductModalEdit from './ProductModalEdit';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const styBtn = {
  position: 'absolute',
  top: '0',
  left: '0',
  transform: 'translate(25%, 25%)',
  bgcolor: 'background.default',
  boxShadow: 24,
  p: 1
}

// ----------------------------------------------------------------------

ProductCard.propTypes = {
  product: PropTypes.object,
  editable: PropTypes.bool
};

export default function ProductCard({ product, editable }) {
  const { id, name, cover, price } = product;

  const addToCart = (e) => {
    AddLocalProd(e)
    window.location.reload(true)
  }

  return (
    <>
      <Card>
        <>
          {editable &&
            <ButtonGroup variant="contained" fullWidth className={editable ? "show-element" : null}>
              <ProductModalDelete product={product} />
              <ProductModalEdit product={product} />
            </ButtonGroup>}
        </>
        <CardActionArea>

          <Box sx={{ pt: '100%', position: 'relative' }}>
            <StyledProductImg alt={name} src={cover} />
            <Avatar color="secondary" onClick={() => { addToCart({ id, name, price }) }} sx={{ ...styBtn }}>
              <AddShoppingCartRoundedIcon color='action' />
            </Avatar>
          </Box>

          <Stack spacing={1.5} sx={{ p: 3 }}>
            <Typography sx={{ fontSize: 'h5.fontSize' }}>
              {name}
            </Typography>

            <Stack spacing={1} direction='row'>
              <Typography sx={{ fontSize: 'h4.fontSize' }}>
                {fCurrency(price)}
              </Typography>
              <Typography component="span" sx={{ color: 'error.main', fontWeight: 'bold', fontSize: 'h7.fontSize' }} >
                20% OFF
              </Typography>
            </Stack>

            <ProductModalDetails product={product} />

          </Stack>
        </CardActionArea>
      </Card>
    </>
  );
}
