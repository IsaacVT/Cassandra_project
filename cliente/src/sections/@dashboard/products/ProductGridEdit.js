import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { Button, Grid, Stack, TextField } from '@mui/material';
import { UpdateDataProd } from '../../../services/product-service';

ProductGridEdit.propTypes = {
    product: PropTypes.object,
};

export default function ProductGridEdit({ product }) {

    // Product elements
    const [id] = useState(product.id);
    const [name, setName] = useState(product.name);
    const [stock, setStock] = useState(product.stock);
    const [price, setPrice] = useState(product.price);
    // Changes in prod
    const [changeList, setChangeList] = useState([]);
    const [changes, setChanges] = useState([]);
    // Button Property
    const [isEnabled, setIsEnabled] = useState(true);

    function getChanges() {
        if (name !== product.name) {
            changeList.push('name');
        }

        if (stock !== product.stock) {
            changeList.push('stock');
        }

        if (price !== product.price) {
            changeList.push('price');
        }

        if (changeList.length > 0) {
            changes.push({ mod: changeList });
        } else {
            changes.push({ mod: '' });
        }
    }

    // Update Product
    const prepareProduct = () => {
        getChanges();
        console.log("🚀 ~ file: ProductGridEdit.js:81 ~ prepareProduct ~ changes:", changes[0])

        if (changes[0].mod.length > 0) {
            const productSend = { id, name, amount: stock, price }

            updateProduct(productSend);
        }

        setChangeList([]);
        setChanges([]);
    }

    const updateProduct = (product) => {
        setIsEnabled(false);
        const prodId = product.id;

        try {
            Promise.resolve(
                UpdateDataProd(prodId, product)
            ).then((response) => {
                console.log("🚀 ~ file: ProductGridEdit.js:98 ~ ).then ~ response:", response)
                window.location.reload(true)
            })
        } catch (err) {
            console.log("🚀 ~ file: ProductGridEdit.js:102 ~ updateProduct ~ err:", err.message)
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

                    <Button type="submit" variant="contained" color="secondary" endIcon={<AddCircleOutlineRoundedIcon />} onClick={prepareProduct} sx={{ width: 'auto' }} disabled={!isEnabled}>
                        Actualizar
                    </Button>
                </Stack>
            </Grid>
        </>
    )
}