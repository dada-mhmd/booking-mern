import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

import * as apiClient from '../api-client';
import Spinner from '../components/Spinner';

const Register = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: registerUser, isLoading } = useMutation({
    mutationFn: apiClient.register,
    onSuccess: () => {
      toast.success('Account created successfully!');
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
      navigate('/');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    registerUser(data);
  });

  if (isLoading) {
    return <Spinner size='large' className='mx-auto border-blue-600' />;
  }

  return (
    <form
      onSubmit={onSubmit}
      className='flex flex-col gap-5 shadow-2xl w-[600px] p-6 mx-auto'
    >
      <h2 className='text-3xl font-bold my-3'>Create an Account</h2>

      <div className='flex flex-col md:flex-row gap-5'>
        <label className='text-gray-700 text-sm font-bold flex-1'>
          First Name
          <input
            type='text'
            className='border rounded w-full py-1 px-2 font-normal'
            {...register('firstName', { required: 'First Name is required' })}
          />
          {errors.firstName && (
            <p className='text-red-500'>{errors.firstName.message}</p>
          )}
        </label>

        <label className='text-gray-700 text-sm font-bold flex-1'>
          Last Name
          <input
            type='text'
            className='border rounded w-full py-1 px-2 font-normal'
            {...register('lastName', { required: 'Last Name is required' })}
          />
          {errors.lastName && (
            <p className='text-red-500'>{errors.lastName.message}</p>
          )}
        </label>
      </div>

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

      <label className='text-gray-700 text-sm font-bold flex-1'>
        Confirm Password
        <input
          type='password'
          className='border rounded w-full py-1 px-2 font-normal'
          {...register('confirmPassword', {
            validate: (val) => {
              if (!val) {
                return 'Please confirm your password';
              } else if (watch('password') !== val) {
                return 'Passwords do not match';
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <p className='text-red-500'>{errors.confirmPassword.message}</p>
        )}
      </label>

      <span>
        Already have an account?
        <Link to='/login' className='text-blue-600 font-bold ml-1'>
          Login
        </Link>
      </span>

      <button
        type='submit'
        className='bg-blue-600 text-white p-2 hover:bg-blue-500 text-lg font-semibold'
      >
        Create Account
      </button>
    </form>
  );
};

export default Register;
