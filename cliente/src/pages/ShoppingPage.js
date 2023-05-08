import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Paper, IconButton, Typography, Container, Table, TableContainer, TableBody, TableRow, TableCell, TableHead, Card, Divider, Popover } from '@mui/material';
// Icons
import Iconify from '../components/iconify';
// Seccion
import { ShoppingModalDelete, ShoppingModalNew } from '../sections/@dashboard/shopping';
// Utils
import { fCurrency } from '../utils/formatNumber';
// Service
import { GetAllShoppings } from '../services/shopping-service';

// ----------------------------------------------------------------------

export default function ShoppingPage() {

    const [shoppings, setShoppings] = useState([])
    const [shoppingSelected, setShoppingSelected] = useState(null)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        Promise.resolve(
            GetAllShoppings()
        ).then((response) => {
            setShoppings(response.map((shopping) => ({
                id: shopping.purchase_id,
                name: shopping.provider_name,
                products: transformList(shopping.products),
                total: shopping.total
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

    const data = shoppings

    const handleCloseMenu = () => {
        setOpen(null);
    };

    return (
        <>
            <Helmet>
                <title> Supplier | TFlores </title>
            </Helmet>

            <Container>
                <Card>
                    <TableContainer sx={{ minWidth: 800 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='right' colSpan={9} sx={{ fontSize: '15px' }}>Purchase supply orders</TableCell>
                                    <TableCell align='right' colSpan={1}>
                                        <ShoppingModalNew />
                                    </TableCell>
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
                                                    Not shoppings found
                                                </Typography>

                                                <Typography variant="body1">
                                                    Please return to the store <br />
                                                    to choose one of our products <br />
                                                    and create a new shopping
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
                                                <Divider>Purchase supply : {id}</Divider>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell colSpan={9} align='left'>Supplier name : {name}</TableCell>
                                            <TableCell colSpan={1} align='right'>
                                                <IconButton size="large" color="inherit" onClick={(event) => {
                                                    setOpen(event.currentTarget)
                                                    setShoppingSelected({ row })
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
                                            <TableRow key={product.id}>
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

                <ShoppingModalDelete row={shoppingSelected} />
            </Popover>
        </>
    )
}
