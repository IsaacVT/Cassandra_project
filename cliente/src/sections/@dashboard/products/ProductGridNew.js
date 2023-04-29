import { useState } from 'react';
// @mui
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { Button, Grid, Stack, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AddNewProd } from '../../../services/product-service';

const StyledProductImg = styled('img')({
    top: 0,
    width: '90%',
    height: '115%',
    objectFit: 'cover',
    position: 'absolute',
    borderRadius: '25px'
});

export default function ProductGridNew() {

    // Product elements
    const [name, setName] = useState('');
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0.0);

    function resetInfo() {
        setName('');
        setStock(0);
        setPrice(0.0);
    }

    // Add Product
    const addProduct = () => {
        const newProduct = { name, amount: stock, price }

        try {
            Promise.resolve(
                AddNewProd(newProduct)
            ).then((res) => {
                console.log("🚀 ~ file: ProductGridNew.js:52 ~ ).then ~ res:", res)
                window.location.reload(true)
                resetInfo();
            })
        } catch (err) {
            console.log("🚀 ~ file: ProductGridNew.js:57 ~ addProduct ~ err:", err)
        }
    }

    return (
        <>
            <Grid item xs={12}>
                <Stack spacing={3} sx={{ mb: 3 }}>
                    <TextField
                        required
                        name="name"
                        label="Name"
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                    />

                    <Stack spacing={3} direction='row'>
                        <TextField
                            required
                            name="stock"
                            label="Stock"
                            value={stock}
                            onChange={(event) => {
                                setStock(event.target.value);
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

                    <Button type="submit" variant="contained" color="secondary" endIcon={<AddCircleOutlineRoundedIcon />}
                        disabled={name.length === 0 || stock === 0 || price === 0} onClick={addProduct}>
                        Agregar
                    </Button>
                </Stack>
            </Grid>
        </>
    )
}