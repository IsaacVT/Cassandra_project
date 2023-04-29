import axios from 'axios';
import { apiUrl } from '../api/api-config'

// Create

export const AddNewShopping = (shopping) => {
    const addSh = apiUrl('shopping')
    return axios.post(addSh, shopping).then(response => response.data)
}

// Read

export const GetAllShoppings = () => {
    const getAll = apiUrl('shopping')
    return axios.get(getAll).then(response => response.data)
}

// Update

export const UpdateShopping = (id, shopping) => {
    const update = apiUrl(`shopping/${id}`)
    return axios.put(update, shopping).then(response => response.data)
}

// Delete

export const RemoveShopping = (id) => {
    const deleteOr = apiUrl(`shopping/${id}`)
    return axios.delete(deleteOr).then(response => response.data);
}

export const GetProductsNames = () => {
    const getAll = apiUrl('/inventory')
    return axios.get(getAll).then(response => response.data.map((prod) => (prod.name)))
}