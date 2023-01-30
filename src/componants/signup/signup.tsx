import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { signup } from '../../service/auth';
import './signup.scss';


type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};


const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    trigger,
    setFocus,
    watch,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onBlur' });

const onSubmit = async (data: Inputs) => {
    signup(data.firstName, data.lastName, data.email, data.password);
}

useEffect(() => {
    setFocus('firstName');
}, [setFocus]);

  return (
    <form className='signup-form' onSubmit={handleSubmit(onSubmit)}>
      <div className='signup-form--input'>
        <label className='signup-form--label'>Firstname</label>
        <input
          className='signup-form--input'
          id='firstname'
          type='text'
          required={true}
          {...register('firstName', {
            required: 'Firstname is required',
          })}
          onKeyUp={() => trigger('firstName')}
        />
        {errors.firstName && <p className='signup-form--error'>{errors.firstName.message}</p>}
      </div>


      <div className='signup-form--input'>
        <label className='signup-form--label'>Lastname</label>
        <input
          className='signup-form--input'
          id='lastname'
          type='text'
          required={true}
          {...register('lastName', {
            required: 'Lastname is required',
          })}
          onKeyUp={() => trigger('lastName')}
        />
        {errors.lastName && <p className='signup-form--error'>{errors.lastName.message}</p>}
      </div>


      <div className='signup-form--input'>
        <label className='signup-form--label'>Email</label>
        <input
          className='signup-form--input'
          id='email'
          type='email'
          required={true}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Invalid email',
            },
          })}
          onKeyUp={() => trigger('email')}
        />
        {errors.email && <p className='signup-form--error'>{errors.email.message} </p>}
      </div>


      <div className='signup-form--input'>
        <label className='signup-form--label'>Password</label>
        <input
          className='signup-form--input'
          id='password'
          type='password'
          required={true}
          {...register('password', {
            required: 'Password is required',
            pattern: {
              // value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
              message:
                'Password should contain at least one lowercase letter, one uppercase letter, and one number',
            },
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters',
            },
          })}
          onKeyUp={() => trigger('password')}
        />
        {errors.password && <p className='signup-form--error'>{errors.password.message}</p>}
      </div>


      <div className='signup-form--input'>
        <label className='signup-form--label'>Confirm Password</label>
        <input
          className='signup-form--input'
          id='confirmPassword'
          type='password'
          required={true}
          {...register('confirmPassword', {
            required: 'Confirm Password is required',
          })}
        />
        {watch('confirmPassword') !== watch('password') && getValues('confirmPassword') ? (
          <p>password not match</p>
        ) : null}
      </div>

      <button className='signup-form--submit' type='submit'>Sign Up</button>

    </form>
  );
};


export default Signup;
