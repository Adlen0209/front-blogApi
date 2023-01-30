import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:3000/api/v1';

export type ArticlesType = {
    id: number;
    category: string;
    slug: string;
    title: string;
    content: string;
}
export const fetchArticles = async (): Promise<ArticlesType[]> => {
    try {
        const {data} = await axios.get<ArticlesType[]>('/articles');
        return data;
    } catch (error) {
        throw error
    }
}