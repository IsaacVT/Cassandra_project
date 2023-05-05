import axios from 'axios';
// CLOUDINARY-API
import { cloudUrl, cloudPreset } from '../api/api-config';

export const UploadImage = async (img) => {

    const file = img
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudPreset);

    const result = await axios
        .post(cloudUrl, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })

    return result.data;
};
