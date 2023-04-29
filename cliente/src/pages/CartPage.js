import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// @mui
import { Button, Card, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// Icons
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import ShoppingCartCheckoutRoundedIcon from '@mui/icons-material/ShoppingCartCheckoutRounded';
// Service
import { AddNewOrder } from '../services/order-service';
// Utils
import { fCurrency } from '../utils/formatNumber';
import { CreateNotification } from '../utils/notification';
import { FormatData, FormatOrderData, GetLocalUser, GetProdsData, UpdateLocalProd } from '../utils/localData';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
    top: 0,
    width: 'auto',
    height: 'auto',
    objectFit: 'cover',
    borderRadius: '25px'
});

const styleBtn = {
    borderRadius: '100%',
    p: 3,
    width: 'auto',
};

// ----------------------------------------------------------------------

export default function CartPage() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([])
    const [client, setClient] = useState("")

    let totalPrice = 0
    let totalSend = 0

    function getTotal(price, amount) {
        const p1 = Number(price)
        const p2 = Number(amount)
        const p3 = p1 * p2;
        return (p3.toFixed(2))
    }

    useEffect(() => {
        const prodsList = GetProdsData()

        if (prodsList.length > 0) {
            setProducts(prodsList.map((product) => ({
                id: product.product_id,
                name: product.name,
                amount: product.amount,
                price: product.price,
                total: getTotal(product.price, product.amount)
            })))
        }
    }, [])

    const handleRemove = (e) => {
        let finalUpdate = null;
        const index = products.findIndex(product => product.id === e.id)
        const prodUpdate = { ...products[index] }

        if (prodUpdate.amount > 1) {
            prodUpdate.amount -= 1;
            prodUpdate.total -= Number(prodUpdate.price)
            const newList = [...products]
            newList[index] = prodUpdate;
            finalUpdate = newList;
        } else {
            const updateList = products.filter(product => product.id !== prodUpdate.id)
            finalUpdate = updateList;
        }

        setProducts(finalUpdate)
    }

    const handleAdd = (e) => {
        const index = products.findIndex(product => product.id === e.id)
        const prodUpdate = { ...products[index] }

        if (prodUpdate.amount < prodUpdate.stock) {
            prodUpdate.amount += 1;
            prodUpdate.total = getTotal(prodUpdate.price, prodUpdate.amount)
            const newList = [...products]
            newList[index] = prodUpdate;
            setProducts(newList)
        }
    }

    function getList() {
        const listProd = products;

        listProd.forEach(product => {
            totalPrice += Number(product.total)
            totalSend += Number(product.send)
        })

        return listProd;
    }

    const getTotalFinal = () => totalPrice + totalSend;

    let data = getList();

    const handleReturn = () => {
        returnStore()
    }

    const returnStore = () => {
        const dataFormated = FormatData(data)

        UpdateLocalProd(dataFormated)
        navigate('/dashboard/products', { replace: true });
        window.location.reload();
    };

    const handleCreateOrder = () => {

        const prods = FormatData(data)

        const order = {
            "client_name": client,
            "products": prods
        }

        console.log("🚀 ~ file: CartPage.js:149 ~ handleCreateOrder ~ order:", order)

        Promise.resolve(
            AddNewOrder(order)
        ).then((res) => {
            CreateNotification({ status: "order_placed", order: res.sale_id })
            data = []
            returnStore()
        }).catch((err) => {
            console.log("🚀 ~ file: CartPage.js:154 ~ ).then ~ err:", err)
        })
    }

    return (
        <>
            <Helmet>
                <title> Dashboard: Cart | Minimal UI </title>
            </Helmet>

            <Container>
                <Card>
                    <TableContainer sx={{ minWidth: 800 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center' colSpan={2} sx={{ fontSize: 'h6.fontSize' }}>Product</TableCell>
                                    <TableCell align='center' sx={{ fontSize: 'h6.fontSize' }}>Price</TableCell>
                                    <TableCell align='center' colSpan={3} sx={{ fontSize: 'h6.fontSize' }}>Amount</TableCell>
                                    <TableCell align='center' sx={{ fontSize: 'h6.fontSize' }}>Total</TableCell>
                                </TableRow>
                            </TableHead>

                            {data.length === 0 ? (
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" colSpan={8} sx={{ py: 3 }}>
                                            <Paper
                                                sx={{
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <Typography variant="h3" paragraph>
                                                    Not products found
                                                </Typography>

                                                <Typography variant="body1">
                                                    Please return to the store <br />
                                                    to choose one of our products
                                                </Typography>
                                            </Paper>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            ) : (
                                <TableBody>
                                    {data.map((row) => {
                                        const { id, name, price, amount, total } = row

                                        return (
                                            <TableRow key={id}>
                                                <TableCell colSpan={2} align='center' sx={{ fontSize: 'h6.fontSize' }}>{name}</TableCell>
                                                <TableCell align='center' sx={{ fontSize: 'h6.fontSize' }}>{fCurrency(price)}</TableCell>


                                                <TableCell align='right'>
                                                    <IconButton sx={{ ...styleBtn }} color="error" onClick={() => {
                                                        handleRemove({ id });
                                                    }}>
                                                        <RemoveCircleRoundedIcon sx={{ fontSize: 'h2.fontSize' }} color="error" />
                                                    </IconButton>
                                                </TableCell>

                                                <TableCell align='center'>
                                                    <Typography variant='h6'>
                                                        {amount < 10 ? `0${amount}` : amount}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell align='left'>
                                                    <IconButton sx={{ ...styleBtn }} color='success' onClick={() => {
                                                        handleAdd({ id })
                                                    }}>
                                                        <AddCircleRoundedIcon sx={{ fontSize: 'h2.fontSize' }} color={row.amount < row.stock ? 'success' : 'disabled'} />
                                                    </IconButton>
                                                </TableCell>

                                                <TableCell align='center' sx={{ fontSize: 'h6.fontSize' }}>{fCurrency(total)}</TableCell>
                                            </TableRow>
                                        );
                                    })}

                                    <TableRow>
                                        <TableCell align='center' colSpan={4}>

                                            <TextField
                                                required
                                                name="clientName"
                                                label="Client name"
                                                value={client}
                                                onChange={(event) => {
                                                    setClient(event.target.value);
                                                }}
                                            />
                                        </TableCell>

                                        <TableCell align='center' colSpan={2}>
                                            <Typography variant='h6'>
                                                Total
                                            </Typography>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Typography variant='h6'>
                                                {fCurrency(totalPrice)}
                                            </Typography>
                                        </TableCell>

                                    </TableRow>
                                </TableBody>
                            )}

                            <TableFooter>
                                <TableRow>
                                    <TableCell align='center'>
                                        <Button variant='contained' color='warning' sx={{ width: '100%', fontSize: 'h6.fontSize' }} onClick={handleReturn} startIcon={<KeyboardReturnRoundedIcon sx={{ fontSize: 'h1.fontSize' }} />}>
                                            See products
                                        </Button>
                                    </TableCell>
                                    <TableCell colSpan={5} />
                                    <TableCell align='center' colSpan={2}>
                                        <Button variant='contained' color='success' sx={{ width: '100%', fontSize: 'h6.fontSize' }} onClick={handleCreateOrder} endIcon={<ShoppingCartCheckoutRoundedIcon sx={{ fontSize: 'h1.fontSize' }} />} disabled={data.length === 0 || client.length === 0}>
                                            Request order
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableFooter>

                        </Table>
                    </TableContainer>
                </Card>
            </Container>
        </>
    )
}