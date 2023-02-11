import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { createArticle, newArticleType } from '../../service/articles';
import { CategoryType } from 'src/service/categories';
import { extractCategoryIdAndLabel, slugify } from '../../utils/dataTools';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import './CreateArticle.scss';

type CreateArticleProps = {
  categories: CategoryType[];
};
type CreateArticleInputs = {
  title: string;
  content: string;
  category: string;
  slug: string;
  category_id: string | number;
  user_id: string | number;
};

const CreateArticle: React.FC<CreateArticleProps> = ({ categories }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    trigger,
    setError,
    formState: { errors },
  } = useForm<CreateArticleInputs>({ mode: 'onBlur' });
  const { userId } = useContext(UserContext);

  const onSubmit = async (data: CreateArticleInputs) => {
    const { categoryId, categoryName } = extractCategoryIdAndLabel(data.category);
    const slug = slugify(data.title);
    const dataArticle = {
      title: data.title,
      content: data.content,
      categoryName,
      slug: slug,
      categoryId,
      userId,
    };
    const response = await createArticle(dataArticle as newArticleType);
    if (response == 'title already exists') {
      setError('title', { message: 'title already exists' });
    }
    if (response == 'post has been successfully created') {
      console.log('redirection iciii');
    }
  };

  const filteredCategories = categories.filter((category) => {
    if (category.label !== 'Accueil') {
      return category.label;
    }
  });

  return (
    <form className='createArticle-form' onSubmit={handleSubmit(onSubmit)}>
      <div className='createArticle-form--field'>
        <label className='createArticle-form--label'>Catergory</label>
        <select
          className='createArticle-form--select'
          id='category'
          {...register('category', { required: true })}
        >
          {filteredCategories.map(({ id, label }) => (
            <option key={id} value={id + label}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className='createArticle-form'>
        <label className='createArticle-form--label'>Title</label>
        <input
          className='createArticle-form--input'
          id='title'
          type='text'
          required={true}
          {...register('title', {
            required: 'title is required',
          })}
          onKeyUp={() => trigger('title')}
        />
        {errors.title && <p className='createArticle-form--error'>{errors.title.message}</p>}
      </div>

      <div className='createArticle-form--input'>
        <label className='createArticle-form--label--content'>Content</label>
        <textarea
          className='createArticle-form--input--content'
          id='content'
          required={true}
          rows={5}
          cols={33}
          {...register('content', {
            required: 'Password is required',
          })}
          onKeyUp={() => trigger('content')}
        />
        {errors.content && <p className='login-form--error'></p>}
      </div>
      <button className='createArticle-form--submit' type='submit'>
        Create article
      </button>
    </form>
  );
};

export default CreateArticle;
