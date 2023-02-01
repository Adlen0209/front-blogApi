import React from 'react'
import { useForm } from 'react-hook-form';
import { CategoryType } from 'src/service/categories';


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
    const { register, handleSubmit, setFocus, trigger, formState: {errors} } = useForm<CreateArticleInputs>({mode: 'onBlur'});
const onSubmit = async (data: CreateArticleInputs) => {
    console.log(data);

}

const filteredCategories = categories.filter((category) => {
    if(category.label !== 'Accueil') {
        return category.label
    }
})


  return (
    <form className='createArticle-form' onSubmit={handleSubmit()}>
        <div className='createArticle-form--field'>
            <label className='createArticle-form--label'>
                Catergory
            </label>
            <select className='createArticle-form--select' id='category'
                    {...register('category' , {required: true})}>

            {filteredCategories.map(({ id, label }) => (
            <option key={id} value={label.toLowerCase()}>{label}</option>    
            ))}
            
            </select>
        </div>


    </form>
  )
}

export default CreateArticle;