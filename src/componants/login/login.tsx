import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { login } from '../../service/auth';
import './login.scss';

export type Inputs = {
    email: string,
    password: string
}
const Login: React.FC = () => {
    const { register, handleSubmit, setFocus, trigger, formState: { errors } } 
    = useForm<Inputs>({ mode: 'onBlur' });

     const onSubmit = async (data: Inputs) => {
         login(data);
     }


useEffect(() => {
    setFocus('email');
}, [setFocus]);


  return (
    <form className='login-form' 
          onSubmit={handleSubmit(onSubmit)}
    >
        <div className='login-form--field'>
        <label className='login-form--label'>Email</label>
        <input className='login-form--input'
               id='email'
               type='email'
               required= {true}
               {...register('email', {
                required: 'email is required',
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Invalid email',
                }

            })}
            onKeyUp={() => trigger('email')}
            >
              
               </input>
        </div>

        <div className='login-form--input'>
        <label className='login-form--label'>Password</label>
        <input
          className='login-form--input'
          id='password'
          type='password'
          required={true}
          {...register('password', {
            required: 'Password is required',
           
          })}
          onKeyUp={() => trigger('password')}
        />
        {errors.password && <p className='login-form--error'>{errors.password.message}</p>}
      </div>

      <button className='login-form--submit' type='submit'>Login</button>



    </form>

  )
}

export default Login;