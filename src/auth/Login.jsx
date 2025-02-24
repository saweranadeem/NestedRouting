import React, { useContext, useState } from "react";
import "./CommonStyling.css";
import { Email, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import logoImage from "../assets/whiteLogo.png";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({}); // ✅ Correct error state
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const goToForgotPage = () => {
    navigate("/forgotPassword");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};

    if (!email) {
      errors.email = "Email is required";
    } else if (email.length < 7) {
      errors.email = "Email must be at least 7 characters long";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    setError(errors);

    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((errormsg) => {
        toast.error(errormsg);
      });
      return;
    }
    try {
      const response = await axios.post(
        "https://api.myswitchin.com/api/admin/login",
        {
          email,
          password,
        }
      );
      if (response.data?.token) {
        login(response.data.token);
        toast.success("Login Successfully");
        navigate("/home");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Invalid credentials or server issue";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center loginContainer">
      <form
        className="d-flex align-items-center flex-column loginForm rounded"
        onSubmit={handleSubmit} // ✅ Use onSubmit instead of button click
      >
        <div className="position-relative imageContainer">
          <img
            src={logoImage}
            height={150}
            width={150}
            className="position-absolute logoImage"
            alt="Logo"
          />
        </div>

        {/* Email Field */}
        <div>
          <div className="position-relative">
            <div className="position-absolute iconContainer">
              <Email className="icon position-absolute" />
            </div>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="loginInput border-0"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <div className="position-relative">
            <div className="position-absolute iconContainer">
              <Lock className="icon position-absolute" />
            </div>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*******"
              className="loginInput border-0"
            />
          </div>
        </div>

        {/* Forgot Password */}
        <div className="textContainer">
          <p
            className="text-white fs-5 text-end mt-2"
            style={{ cursor: "pointer" }}
            onClick={goToForgotPage}
          >
            Forgot Password?
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit" // ✅ Change type to "submit"
          className="loginButton border-0 rounded-5"
        >
          Sign In
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
