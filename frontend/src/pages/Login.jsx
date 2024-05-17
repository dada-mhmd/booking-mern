import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import * as apiClient from '../api-client';
import Spinner from '../components/Spinner';

const Login = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: apiClient.login,
    onSuccess: () => {
      toast.success('Login successful!');
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
      navigate('/');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (isPending) {
    return <Spinner size='large' className='mx-auto border-blue-600' />;
  }

  const onSubmit = handleSubmit((data) => {
    loginUser(data);
  });

  return (
    <form
      onSubmit={onSubmit}
      className='flex flex-col gap-5 w-96 mx-auto shadow-2xl p-10'
    >
      <h2 className='text-3xl font-bold'>Login</h2>

      <label className='text-gray-700 text-sm font-bold flex-1'>
        Email
        <input
          type='email'
          className='border rounded w-full py-1 px-2 font-normal'
          {...register('email', { required: 'Email Name is required' })}
        />
        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
      </label>

      <label className='text-gray-700 text-sm font-bold flex-1'>
        Password
        <input
          type='password'
          className='border rounded w-full py-1 px-2 font-normal'
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'password must be at least 6 characters',
            },
          })}
        />
        {errors.password && (
          <p className='text-red-500'>{errors.password.message}</p>
        )}
      </label>

      <span className='text-sm'>
        Don't have an account?
        <Link to='/register' className='text-blue-600 font-bold ml-1'>
          Register
        </Link>
      </span>
      <button
        type='submit'
        className='bg-blue-600 hover:bg-opacity-85 text-white rounded-md px-2 py-1 text-sm font-bold'
      >
        Login
      </button>
    </form>
  );
};

export default Login;
