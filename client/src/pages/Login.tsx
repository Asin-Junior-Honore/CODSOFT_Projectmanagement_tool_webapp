import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import clsx from 'clsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

// Constants
const BASE_URL = 'https://codsoft-projectmanagement-tool-webapp.onrender.com';

// Validation Schema
const loginSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required'),
});

// Helper Function: Create Axios Instance
const createAxiosInstance = () => {
  return axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });
};


const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const axiosInstance = createAxiosInstance();

  ///logic to submit login form
  const onSubmit: SubmitHandler<{ email: string; password: string }> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post('/v2/auth/login', data);
      toast.success(response.data.message || 'Login successful!', {
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate('/protected/dashboard');
      }, 2000);
    } catch (error) {
      let errorMessage = 'An error occurred during login. Please try again.';
      if (axios.isAxiosError(error) && error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          errorMessage = data.error || data.message || 'Bad request.';
        }
      }
      toast.error(errorMessage, {
        autoClose: 5000,
      });
    } finally {
      setIsSubmitting(false)
    }
  };





  return (
    <>
      <ToastContainer />
      <div className="max-w-[35rem] mx-auto mt-[7.5rem] p-5 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold text-center mb-5">
          Login to Your Account 🔑
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="text"
              id="email"
              {...register('email')}
              className={clsx(
                'w-full px-3 py-2 border rounded focus:outline-none',
                errors.email ? 'border-red-500' : 'border-gray-300'
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                {...register('password')}
                className={clsx(
                  'w-full px-3 py-2 border rounded focus:outline-none',
                  errors.password ? 'border-red-500' : 'border-gray-300'
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={clsx(
              'w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-150 ease-in-out',
              { 'opacity-50 cursor-not-allowed': isSubmitting }
            )}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <FaSpinner className="animate-spin" /> Logging In...
              </span>
            ) : (
              'Log In'
            )}
          </button>
        </form>

        {/* Signup Link */}
        <div className="text-center mt-5 text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up here!
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
