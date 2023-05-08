import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';

import { AddNewShopping, GetProductsNames } from '../../../services/shopping-service';

const ShoppingButton = () => {
  const [productName, setProductName] = useState([]);
  const [provider, setProvider] = useState('');
  const [products, setProducts] = useState([{ name: '', amount: 0, price: 0 }]);

  const handleAddProduct = () => {
    if (products.length < 5) {
      setProducts([...products, { name: '', amount: 0, price: 0 }]);
    }
  };

  const handleProductChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  const handleSubmit = () => {
    const newShopping = {
      provider_name: provider,
      products: products.map((product) => JSON.stringify(product)),
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
  function resetInfo() {
    setProvider('');
    setProducts([{ name: '', amount: 0, price: 0 }]);
  }
  useEffect(() => {
    Promise.resolve(GetProductsNames()).then((response) => {
      console.log('GetProductsNames', response);
      setProductName(response);
    });
  }, []);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack spacing={3} sx={{ mb: 3 }} direction="row" justifyContent="center" alignItems="center">
          <Paper>
            <TextField
              label="Proveedor"
              value={provider}
              onChange={(event) => setProvider(event.target.value)}
              fullWidth
              margin="normal"
            />
          </Paper>
          <Button onClick={handleAddProduct} variant="contained" color="primary" size="large">
            Add product
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Precio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <FormControl
                      sx={{
                        width: 200,
                      }}
                    >
                      <InputLabel id="shipment-label">Product</InputLabel>
                      <Select
                        labelid="shipment-label"
                        label="Product"
                        name="productName"
                        value={product.name}
                        onChange={(event) => handleProductChange(index, 'name', event.target.value)}
                        fullWidth
                        margin="none"
                      >
                        {productName.length > 0 ? (
                          productName.map((option, index) => (
                            <MenuItem key={index} value={`${option}`}>
                              {option}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem value={''}>No Products</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={product.amount}
                      onChange={(event) => handleProductChange(index, 'amount', Number(event.target.value))}
                      type="number"
                      fullWidth
                      margin="none"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={product.price}
                      onChange={(event) => handleProductChange(index, 'price', Number(event.target.value))}
                      type="number"
                      fullWidth
                      margin="none"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={handleSubmit}
          variant="contained"
          fullWidth
          disabled={products.length === 0 || provider === ''}
          color="primary"
        >
          Enviar datos
        </Button>
      </Grid>
    </Grid>
  );
};

export default ShoppingButton;
