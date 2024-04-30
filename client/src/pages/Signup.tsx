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
const signupSchema = yup.object({
  fullName: yup.string().required('Full name is required'),
  username: yup.string().required('Username is required'),
  gender: yup.string().required('Gender is required'),
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

// Interface for Form Values
interface SignupFormValues {
  fullName: string;
  username: string;
  gender: string;
  email: string;
  password: string;
}

// Signup Component
const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: yupResolver(signupSchema),
  });

  const axiosInstance = createAxiosInstance();

  ///logic to submit signup form
  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post('/v2/auth/register', data);
      const successMessage = response.data?.message || 'Signup successful! Redirecting to login...';
      toast.success(successMessage, {
        autoClose: 5000,
      });
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      let errorMessage = 'Sorry, something went wrong. Please try again.';
      if (axios.isAxiosError(error) && error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          errorMessage = data.error || data.message || errorMessage;
        }
      }
      toast.error(errorMessage, {
        autoClose: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <>
      <ToastContainer />
      <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold text-center mb-5">
          Sign Up to Continue 🚀
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              {...register('fullName')}
              className={clsx(
                'w-full px-3 py-2 border rounded focus:outline-none',
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              )}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>

          {/* Username */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register('username')}
              className={clsx(
                'w-full px-3 py-2 border rounded focus:outline-none',
                errors.username ? 'border-red-500' : 'border-gray-300'
              )}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label htmlFor="gender" className="block text-sm font-medium">
              Gender
            </label>
            <select
              id="gender"
              {...register('gender')}
              className={clsx(
                'w-full px-3 py-2 border rounded focus:outline-none',
                errors.gender ? 'border-red-500' : 'border-gray-300'
              )}
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4 relative">
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

          {/* Password */}
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
                <FaSpinner className="animate-spin" /> Submitting...
              </span>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        {/* Link to Login */}
        <div className="text-center mt-5 text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in here!
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
