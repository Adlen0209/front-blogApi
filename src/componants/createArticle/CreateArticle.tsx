import React from 'react'
import { useForm } from 'react-hook-form';
import { createArticle, newArticleType } from '../../service/articles';
import { CategoryType } from 'src/service/categories';
import { extractCategoryIdAndLabel, slugify } from '../../utils/dataTools';


type CreateArticleProps = {
    categories: CategoryType[],
}
type CreateArticleInputs = {
    title: string,
    content: string,
    category: string,
    slug: string,
    category_id: string | number,
    user_id: string | number,
}
const CreateArticle: React.FC<CreateArticleProps> = ({ categories }) => {
    const { register, handleSubmit, trigger, formState: {errors} } = useForm<CreateArticleInputs>({mode: 'onBlur'});
const onSubmit = async (data: CreateArticleInputs) => {
    console.log(data);
    // console.log(data.category[0]);
    // console.log(data.category.slice(1, data.category.length));
    const { categoryId, categoryName } = extractCategoryIdAndLabel(data.category);
    console.log('cat id' + " " +categoryId);
    console.log('cat name' + " " +categoryName);

    const slug = slugify(data.title);
    console.log('slug' + " " + slug);
    const dataArticle = {
        title: data.title,
        content: data.content,
        categoryName,
        slug: slug,
        categoryId,
    }
    const response = await createArticle(dataArticle as newArticleType);
    console.log(response);


}

const filteredCategories = categories.filter((category) => {
    if(category.label !== 'Accueil') {
        return category.label
    }
})


  return (
    <form className='createArticle-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='createArticle-form--field'>
            <label className='createArticle-form--label'>
                Catergory
            </label>
            <select className='createArticle-form--select' id='category'
                    {...register('category' , {required: true})}>

            {filteredCategories.map(({ id, label }) => (
            <option key={id} value={id + label} >{label}</option>    
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
        <label className='createArticle-form--label'>Content</label>
        <textarea
          className='createArticle-form--input'
          id='content'
          required={true}
          rows={5}
          cols={33}
          {...register('content', {
            required: 'Password is required',
          })}
          onKeyUp={() => trigger('content')}
        />
        {errors.content && <p className='login-form--error'>{errors.content.message}</p>}
      </div>
        <button className='createArticle-form--submit' type='submit'>
        Create article
      </button>

    </form>
  )
}

export default CreateArticle;