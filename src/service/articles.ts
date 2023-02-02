
import jwtDecode from 'jwt-decode';
import { axiosInstance } from './auth';



export type ArticlesType = {
  id: number;
  category: string;
  slug: string;
  title: string;
  content: string;
};

export type newArticleType = { 
  categoryName: string;
  categoryId: number | string;
  slug: string;
  title: string;
  content: string;
  user_id: number | string;
}
// const delay = () => {
//     return new Promise(resolve => setTimeout(resolve, 2000));
// }

export const fetchArticles = async (): Promise<ArticlesType[]> => {
  try {
    const { data } = await axiosInstance.get<ArticlesType[]>('/articles');

    return data;
  } catch (error) {
    throw error;
  }
};

export const createArticle = async (data: newArticleType) => {
  try {
    const token = localStorage.getItem('token');
    const decodedToken: any = jwtDecode(token as string);
    const userId = decodedToken.userId;
    const { categoryName, categoryId, slug, title, content } = data;
    const response = await axiosInstance.post('/articles', {
      category: categoryName,
      category_id: categoryId,
      slug,
      title,
      content,
      user_id: userId,
    });
    console.log(response);
    return response.data;

  } catch (error) {
    throw error;
  }
}