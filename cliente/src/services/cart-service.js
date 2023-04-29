import axios from 'axios';
// API-URL
import { apiUrl } from '../api/api-config';

// Create
export const CreateCart = (data) => {
    const newSale = apiUrl('sales')
    return axios.post(newSale, data).then(response => response)
}

// Read

export const GetCartUser = (user) => {
    const getCart = apiUrl(`getCartUser/${user}`)
    return axios.get(getCart).then(response => response.data.cart[0])
}

// Update

export const UpdateDataCart = (id, data) => {
    const update = apiUrl(`sales/${id}`)
    return axios.put(update, data).then(response => response)
};

// Delete

export const DeleteUserCart = (id) => {
    const deleteUserCart = apiUrl(`deleteCart/${id}`)
    return axios.delete(deleteUserCart).then(response => response.data)
}