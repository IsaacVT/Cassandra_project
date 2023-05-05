import { useState } from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
// @mui
import { Button, Grid, Stack, TextField, Box } from '@mui/material';
// Icons
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import ChangeCircleRoundedIcon from '@mui/icons-material/ChangeCircleRounded';
// Service
import { UploadImage } from '../../../services/cloudinary-service';
import { UpdateDataProd } from '../../../services/product-service';
// Mock
import DefaultImg from '../../../_mock/product'

const StyledProductImg = styled('img')({
    top: 0,
    width: '90%',
    height: '95%',
    objectFit: 'cover',
    position: 'absolute',
    borderRadius: '25px'
});

ProductGridEdit.propTypes = {
    product: PropTypes.object,
};

export default function ProductGridEdit({ product }) {

    // Product elements
    const [id] = useState(product.id);
    const [name, setName] = useState(product.name);
    const [stock, setStock] = useState(product.stock);
    const [price, setPrice] = useState(product.price);
    const [image, setImage] = useState(product.cover);
    const [preview, setPreview] = useState(product.cover);

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

        if (image !== product.cover) {
            changeList.push('cover');
        }

        if (changeList.length > 0) {
            changes.push({ mod: changeList });
        } else {
            changes.push({ mod: '' });
        }
    }

    const uploadImg = () => {
        try {
            Promise.resolve(
                UploadImage(image)
            ).then((res) => {
                prepareProduct(res.secure_url)
            })
        } catch (err) {
            console.log("🚀 ~ file: ProductGridNew.js:49 ~ uploadImg ~ err:", err)
        }
    }

    // Update Product
    const prepareProduct = (img) => {
        getChanges();

        if (changes[0].mod.length > 0) {
            const productSend = { id, name, amount: stock, price, cover: img }
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
            <Grid item xs={7}>
                <Box sx={{ pt: '100%', position: 'relative', m: 3 }}>
                    <StyledProductImg src={preview} alt='imagePreview' />
                </Box>
            </Grid>

            <Grid item xs={5}>
                <Stack spacing={5} sx={{ mt: 7 }}>
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

            <Grid item xs={6.5}>
                <Stack direction={'row'} justifyContent="space-between">
                    <Button variant="contained" component='label' color="secondary" startIcon={<UploadFileRoundedIcon />} onChange={(event) => {
                        setImage(event.target.files[0]);
                        setPreview(URL.createObjectURL(event.target.files[0]));
                    }
                    } disabled={image != null}>
                        Upload
                        <input hidden accept="image/*" type="file" />
                    </Button>

                    <Button variant="contained" color="error" endIcon={<ChangeCircleRoundedIcon />} onClick={() => {
                        setImage(null);
                        setPreview(DefaultImg);
                    }} disabled={image === null}>
                        Reset image
                    </Button>
                </Stack>
            </Grid>

            <Grid item xs={5.5} textAlign='right'>
                <Button type="submit" variant="contained" color="secondary" endIcon={<AddCircleOutlineRoundedIcon />} onClick={uploadImg} sx={{ width: 'auto' }} disabled={!isEnabled}>
                    Actualizar
                </Button>
            </Grid>
        </>
    )
}