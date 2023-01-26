import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:3000/api/v1';

export type CategoryType = {
    id: number;
    route: string;
    label: string;
}
export const fetchCategories = async () => {
    try {
        const {data} = await axios.get('/categories');
        return data;
    } catch (error) {
        throw error
    }
}