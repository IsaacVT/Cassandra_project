import { useState } from 'react';
import { styled } from '@mui/material/styles';
// @mui
import { Button, Grid, Stack, TextField, Box } from '@mui/material';
// Icon
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import ChangeCircleRoundedIcon from '@mui/icons-material/ChangeCircleRounded';
// Service
import { UploadImage } from '../../../services/cloudinary-service';
import { AddNewProd } from '../../../services/product-service';
import DefaultImg from '../../../_mock/product'

const StyledProductImg = styled('img')({
    top: 0,
    width: '90%',
    height: '95%',
    objectFit: 'cover',
    position: 'absolute',
    borderRadius: '25px'
});

export default function ProductGridNew() {

    // Product elements
    const [name, setName] = useState('');
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0.0);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(DefaultImg);

    function resetInfo() {
        setName('');
        setStock(0);
        setPrice(0.0);
        setImage(null);
        setPreview(DefaultImg)
    }

    const uploadImg = () => {
        try {
            Promise.resolve(
                UploadImage(image)
            ).then((res) => {
                addProduct(res.secure_url)
            })
        } catch (err) {
            console.log("🚀 ~ file: ProductGridNew.js:49 ~ uploadImg ~ err:", err)
        }
    }

    // Add Product
    const addProduct = (img) => {
        const newProduct = { name, amount: stock, price, cover: img }
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
            <Grid item xs={7}>
                <Box sx={{ pt: '100%', position: 'relative', m: 3 }}>
                    <StyledProductImg src={preview} alt='imagePreview' />
                </Box>
            </Grid>

            <Grid item xs={5}>
                <Stack spacing={5} sx={{ mt: 7, pr: 3 }}>
                    <TextField
                        required
                        name="name"
                        label="Name"
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                    />

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
                        Change Image
                    </Button>
                </Stack>
            </Grid>

            <Grid item xs={5.5} textAlign='right'>
                <Button type="submit" variant="contained" color="secondary" endIcon={<AddCircleOutlineRoundedIcon />}
                    disabled={name.length === 0 || stock === 0 || price === 0 || image === null} onClick={uploadImg}>
                    Agregar
                </Button>
            </Grid>

        </>
    )
}