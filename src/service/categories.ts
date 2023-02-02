import { ReactNode } from 'react';
import { axiosInstance } from './auth';


export type CategoryType = {
  name: ReactNode;
  id: number;
  route: string;
  label: string;
};
export const fetchCategories = async (): Promise<CategoryType[]> => {
  try {
    const { data } = await axiosInstance.get<CategoryType[]>('/categories');
    return data;
  } catch (error) {
    throw error;
  }
};
