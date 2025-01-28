import React, { useContext } from 'react';
import './CommonStyling.css';
import { Email, Lock } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useLoginMutation } from '../services/AuthApi';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginMutation, { isLoading, error }] = useLoginMutation();

  const goToForgotPage = () => {
    navigate('/forgotPassword');
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Invalid Email Address')
        .required('Email is required.'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required.'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await loginMutation(values).unwrap();
        // Assuming the response contains an auth token
        login(response.token);
        navigate('/sidebar'); // Redirect to the dashboard or another page
      } catch (err) {
        console.error('Login failed:', err);
        // Handle error (e.g., display error message to the user)
      }
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center loginContainer">
      <form
        onSubmit={formik.handleSubmit}
        className="d-flex justify-content-center align-items-center flex-column loginForm rounded"
      >
        {/* Email Field */}
        <div>
          <div className="iconContainer position-relative d-flex justify-content-center align-items-center">
            <Email />
          </div>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Email"
            className="loginInput border-0"
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-danger">{formik.errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <div className="iconContainer position-relative d-flex justify-content-center align-items-center">
            <Lock />
          </div>
          <input
            type="password"
            name="password"
            placeholder="*******"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="loginInput border-0"
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-danger">{formik.errors.password}</p>
          )}
        </div>

        {/* Forgot Password */}
        <div>
          <p
            className="text-white fs-5"
            style={{ cursor: 'pointer' }}
            onClick={goToForgotPage}
          >
            Forgot Password?
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="loginButton border-0 rounded-5"
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'SIGN IN'}
        </button>

        {/* Error Message */}
        {error && (
          <p className="text-danger mt-3">
            {error.data?.message || 'Login failed. Please try again.'}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
