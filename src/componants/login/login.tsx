import jwtDecode from 'jwt-decode';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { login, saveAuthorization } from '../../service/auth';
import './login.scss';

export type Inputs = {
  email: string;
  password: string;
};
const Login: React.FC = () => {
  const { setUserId } = useContext(UserContext);
  const { toggleLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onBlur' });

  const onSubmit = async (data: Inputs) => {
    const response = await login(data);

    if (response.errorMessage == 'erreur credentials' || 'User not found') {
      setError('password', { message: 'invalid credentials' });
    }

    if (response.token) {
      const decodedToken: any = jwtDecode(response.token as string);
      const userId = decodedToken.userId;
      setUserId(userId);
      toggleLoggedIn(true);
      saveAuthorization(response.token);

      navigate('/');
    }
  };

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  return (
    <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
      <div className='login-form--field'>
        <label className='login-form--label'>Email</label>
        <input
          className='login-form--input'
          id='email'
          type='email'
          required={true}
          {...register('email', {
            required: 'email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Invalid email',
            },
          })}
          onKeyUp={() => trigger('email')}
        ></input>
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

      <button className='login-form--submit' type='submit'>
        Login
      </button>
      <p className='login--form-message'>
        Pas de compte ? <Link to='/signup'>Inscrivez-vous</Link>
      </p>
    </form>
  );
};

export default Login;
