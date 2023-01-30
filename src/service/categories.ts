import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:3000/api/v1';

export type CategoryType = {
    id: number;
    route: string;
    label: string;
}
export const fetchCategories = async (): Promise<CategoryType[]> => {
    try {
        const {data} = await axios.get<CategoryType[]>('/categories');
        return data;
    } catch (error) {
        throw error
    }
}