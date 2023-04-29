import axios from 'axios';
import { apiUrl } from '../api/api-config';

// Create

export const AddNewProd = (prod) => {
    const addProd = apiUrl('/inventory')
    return axios.post(addProd, prod).then(response => response.data)
}

// Read

export const GetProducts = () => {
    const getAll = apiUrl('/inventory')
    return axios.get(getAll).then(response => {
        console.log("🚀 ~ file: product-service.js:22 ~ GetProducts ~ response:", response)
        return response.data
    })
}

export const GetSpecificProducts = (prods) => {
    if (prods !== undefined || prods.length >= 0) {
        const getSome = apiUrl('getConcretProducts')
        return axios.post(getSome, prods).then(response => response.data)
    }

    return null
}

// Update

export const UpdateDataProd = (id, prod) => {
    const update = apiUrl(`/inventory/${id}`)
    return axios.put(update, prod).then(response => response.data)
};

// Delete

export const RemoveProd = (idProd) => {
    const deleteProd = apiUrl(`/inventory/${idProd}`)
    return axios.delete(deleteProd).then(response => response.data);
}