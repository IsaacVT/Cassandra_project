import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { noCase } from 'change-case';
import { Helmet } from 'react-helmet-async';
// @mui
import { Paper, Button, IconButton, Typography, Container, Table, TableContainer, TableBody, TableRow, TableCell, TableHead, Card, Divider, Stack, Popover, TableFooter } from '@mui/material';
// Icons
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import Iconify from '../components/iconify';
// Seccion
import { OrderModalDelete, OrderModalEdit } from '../sections/@dashboard/order';
// Utils
import { fCurrency } from '../utils/formatNumber';
// Service
import { GetAllOrders } from '../services/order-service';

// ----------------------------------------------------------------------

export default function OrderPage() {
    const navigate = useNavigate();

    const [orders, setOrders] = useState([])
    const [orderSelected, setOrderSelected] = useState(null)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        Promise.resolve(
            GetAllOrders()
        ).then((response) => {
            setOrders(response.map((order) => ({
                id: order.sale_id,
                name: order.client_name,
                products: transformList(order.products),
                total: order.total
            })))
        })
    }, [])

    function transformList(list) {
        return list.map((p) => JSON.parse(p))
    }

    function getTotal(price, amount) {
        const p1 = Number(price)
        const p2 = Number(amount)
        const p3 = p1 * p2;
        return (p3.toFixed(2))
    }

    const data = orders

    const handleCloseMenu = () => {
        setOpen(null);
    };

    return (
        <>
            <Helmet>
                <title> Sales | TFlores </title>
            </Helmet>

            <Container>
                <Card>
                    <TableContainer sx={{ minWidth: 800 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center' colSpan={10} sx={{ fontSize: '15px' }}>Orders</TableCell>
                                </TableRow>
                            </TableHead>

                            {data.length === 0 ? (
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" colSpan={10} sx={{ py: 3 }}>
                                            <Paper
                                                sx={{
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <Typography variant="h3" paragraph>
                                                    Not orders found
                                                </Typography>

                                                <Typography variant="body1">
                                                    Please return to the store <br />
                                                    to choose one of our products <br />
                                                    and create a new order
                                                </Typography>
                                            </Paper>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            ) : (data.map((row) => {
                                const { id, name, products, total } = row;

                                return (
                                    <TableBody key={id}>

                                        <TableRow>
                                            <TableCell colSpan={10}>
                                                <Divider>ORDER: {id}</Divider>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell colSpan={9} align='left'>Client : {name}</TableCell>
                                            <TableCell colSpan={1} align='right'>
                                                <IconButton size="large" color="inherit" onClick={(event) => {
                                                    setOpen(event.currentTarget)
                                                    setOrderSelected({ row })
                                                }}>
                                                    <Iconify icon={'eva:more-vertical-fill'} />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell colSpan={10}>
                                                <Divider>PRODUCT DETAILS</Divider>
                                            </TableCell>
                                        </TableRow>

                                        {Object.values(products).map((product) => (
                                            <TableRow key={product.name}>
                                                <TableCell colSpan={4} align='left'>{product.name}</TableCell>
                                                <TableCell colSpan={2} align='center'>{product.amount}</TableCell>
                                                <TableCell colSpan={2} align='center'>{fCurrency(product.price)}</TableCell>
                                                <TableCell colSpan={2} align='center'>{fCurrency(getTotal(product.amount, product.price))}</TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell colSpan={8} />
                                            <TableCell colSpan={2} align='center' sx={{ fontWeight: 'bold' }}>
                                                Total to pay: {fCurrency(total)}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                );
                            }))}
                        </Table>
                    </TableContainer>
                </Card>
            </Container>

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 140,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >

                <OrderModalDelete row={orderSelected} />
            </Popover>
        </>
    )
}
