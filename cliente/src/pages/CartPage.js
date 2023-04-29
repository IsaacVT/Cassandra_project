import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// @mui
import { Button, Card, Container, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField, Typography } from '@mui/material';
// Icons
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import ShoppingCartCheckoutRoundedIcon from '@mui/icons-material/ShoppingCartCheckoutRounded';
// Service
import { AddNewOrder } from '../services/order-service';
// Utils
import { fCurrency } from '../utils/formatNumber';
import { CreateNotification } from '../utils/notification';
import { FormatData, GetProdsData, UpdateLocalProd } from '../utils/localData';

// ----------------------------------------------------------------------

export default function CartPage() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([])
    const [client, setClient] = useState("")

    let totalPrice = 0

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

    function getList() {
        const listProd = products;

        listProd.forEach(product => {
            totalPrice += Number(product.total)
        })

        return listProd;
    }

    let data = getList();

    const handleReturn = () => {
        returnStore()
    }

    const returnStore = () => {
        data = []
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


                                                <TableCell align='right' />

                                                <TableCell align='center'>
                                                    <Typography variant='h6'>
                                                        {amount < 10 ? `0${amount}` : amount}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell align='left' />

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
                                            Cancel
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