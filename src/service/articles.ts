
import jwtDecode from 'jwt-decode';
import { axiosInstance } from './auth';



export type ArticlesType = {
  id: number;
  category: string;
  slug: string;
  title: string;
  content: string;
  user_id: number | string;
};

export type newArticleType = { 
  categoryName: string;
  categoryId: number | string;
  slug: string;
  title: string;
  content: string;
  userId: number | string;
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
 
    const { categoryName, categoryId, slug, title, content, userId } = data;
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

export const deleteArticle = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/articles/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}