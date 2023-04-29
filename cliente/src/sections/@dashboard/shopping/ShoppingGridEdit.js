import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { Grid, Button, Stack, Select, MenuItem, InputLabel, FormControl, Typography } from '@mui/material';
// Icon
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { UpdateShopping } from '../../../services/shopping-service';
// Services

ShoppingGridEdit.propTypes = {
    shopping: PropTypes.object,
};

export default function ShoppingGridEdit({ shopping }) {

    const [statusUpdate, setStatusUpdate] = useState(shopping.status);
    const [paymentUpdate, setPaymentUpdate] = useState(shopping.payment);
    const [shipmentUpdate, setShipmentUpdate] = useState(shopping.shipment);

    const handleUpdate = () => {
        const { id, name, direction, products, total } = shopping
        const newShopping = { id, name, direction, products, total, statusUpdate, paymentUpdate, shipmentUpdate }

        Promise.resolve(
            UpdateShopping(newShopping)
        ).then((res) => {
            console.log("🚀 ~ file: ShoppingGridEdit.js:27 ~ ).then ~ res:", res)
            window.location.reload(true);
        }).catch((error) => {
            console.log("🚀 ~ file: ShoppingGridEdit.js:29 ~ ).then ~ error:", error)
        })
    }

    const getUpdate = () => {
        if (shopping.status !== statusUpdate || shopping.payment !== paymentUpdate || shopping.shipment !== shipmentUpdate) {
            return false
        }

        return true
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12} sx={{ mt: 3, mb: 3 }}>
                    <Stack alignItems='center' justifyContent='center' sx={{ mb: 5 }}>
                        <Typography variant="h6">
                            Updating shopping: {shopping.id}
                        </Typography>
                    </Stack>

                    <Stack direction='row' spacing={5} alignItems='center' justifyContent='center'>
                        <FormControl required sx={{ width: '20%' }}>
                            <InputLabel id="status-label">Status shopping</InputLabel>
                            <Select
                                labelid="status-label"
                                label="Status shopping"
                                name="status"
                                value={statusUpdate}
                                onChange={(event) => setStatusUpdate(event.target.value)}
                            >
                                <MenuItem value="shopping_placed">Placed</MenuItem>
                                <MenuItem value="shopping_shipped">Shipped</MenuItem>
                                <MenuItem value="shopping_canceled">Cancelled</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl required sx={{ width: '20%' }}>
                            <InputLabel id="payment-label">Status shipment</InputLabel>
                            <Select
                                labelid="payment-label"
                                label="Status payment"
                                name="payment"
                                value={paymentUpdate}
                                onChange={(event) => setPaymentUpdate(event.target.value)}
                            >
                                <MenuItem value="PENDING">Pending</MenuItem>
                                <MenuItem value="SUCCESS">Completed</MenuItem>
                                <MenuItem value="REFUNDED">Refunded</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl required sx={{ width: '20%' }}>
                            <InputLabel id="shipment-label">Status shipment</InputLabel>
                            <Select
                                labelid="shipment-label"
                                label="Status shipment"
                                name="shipment"
                                value={shipmentUpdate}
                                onChange={(event) => setShipmentUpdate(event.target.value)}
                            >
                                <MenuItem value="PENDING">Pending</MenuItem>
                                <MenuItem value="IN TRANSIT">In transit</MenuItem>
                                <MenuItem value="DELIVERED">Delivered</MenuItem>
                            </Select>
                        </FormControl>

                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            endIcon={<AddCircleOutlineRoundedIcon />}
                            onClick={handleUpdate}
                            sx={{ width: 'auto' }}
                            disabled={getUpdate()}
                        >
                            Actualizar
                        </Button>
                    </Stack>
                </Grid>
            </Grid >
        </>
    );
}
