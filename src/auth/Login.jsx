import React, { useContext } from "react";
import "./CommonStyling.css";
import { Email, Lock } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const goToForgotPage = () => {
    navigate("/forgotPassword");
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email is required."),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required."),
    }),

    onSubmit: (values) => {
      login("dummy-auth-token");

      console.log(values); // Log form values instead of formik.values to avoid confusion
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
            style={{ cursor: "pointer" }}
            onClick={goToForgotPage}
          >
            Forgot Password?
          </p>
        </div>

        {/* Submit Button */}
        <button type="submit" className="loginButton border-0 rounded-5">
          SIGN IN
        </button>
      </form>
    </div>
  );
};

export default Login;
