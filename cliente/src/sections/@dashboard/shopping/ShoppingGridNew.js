import { useState, useEffect } from 'react';
// @mui
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { Button, Grid, Stack, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { AddNewShopping, GetProductsNames } from '../../../services/shopping-service';

export default function ShoppingGridNew() {

  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState(0);
  const [provider, setProvider] = useState('');
  const [price, setPrice] = useState(0.0);

  function resetInfo() {
    setProductName('');
    setProvider('');
    setProductQuantity(0);
    setPrice(0.0);
  }

  // Add Shopping
  const addShopping = () => {
    const products = {
        name: productName,
        amount: productQuantity,
        price
    };
    const newShopping = { 
        provider_name:provider,
        products:[JSON.stringify(products)]
    };

    try {
      Promise.resolve(AddNewShopping(newShopping)).then((res) => {
        console.log('🚀 ~ file: ShoppingGridNew.js:52 ~ ).then ~ res:', res);
        window.location.reload(true);
        resetInfo();
      });
    } catch (err) {
      console.log('🚀 ~ file: ShoppingGridNew.js:57 ~ addShopping ~ err:', err);
    }
  };
  useEffect(() => {
    Promise.resolve(
        GetProductsNames()
    ).then((response) => {
        console.log('GetProductsNames', response)
        setProducts(response)
    })
}, [])
  return (
    <>
      <Grid item xs={12}>
        <Stack spacing={3} sx={{ mb: 3 }}>
          <TextField
            required
            name="name"
            label="Name"
            value={provider}
            onChange={(event) => {
              setProvider(event.target.value);
            }}
          />

          <Stack spacing={3} direction="row">
            <TextField
              required
              name="productQuantity"
              label="Quantity"
              value={productQuantity}
              onChange={(event) => {
                setProductQuantity(event.target.value);
              }}
            />

            <TextField
              required
              name="price"
              label="Price"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </Stack>
          <FormControl required >
            <InputLabel id="shipment-label">Product</InputLabel>
            <Select
              labelid="shipment-label"
              label="Product"
              name="productName"
              value={productName}
              onChange={(event) => setProductName(event.target.value)}
            >
              {products.length > 0 ? (
                products.map((option, index) => (
                  <MenuItem key={index} value={`${option}`}>
                    {option}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value={''}>No Productos</MenuItem>
              )}
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            endIcon={<AddCircleOutlineRoundedIcon />}
            disabled={products.length === 0 || productQuantity === 0 || price === 0}
            onClick={addShopping}
          >
            Agregar
          </Button>
        </Stack>
      </Grid>
    </>
  );
}
