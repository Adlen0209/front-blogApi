import axios from 'axios';
import { ReactNode } from 'react';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

export type CategoryType = {
  name: ReactNode;
  id: number;
  route: string;
  label: string;
};
export const fetchCategories = async (): Promise<CategoryType[]> => {
  try {
    const { data } = await axios.get<CategoryType[]>('/categories');
    return data;
  } catch (error) {
    throw error;
  }
};
