import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/AuthStyles.css";
import { useAuth } from "../context/auth";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`/api/v1/users/login`, {
        email,
        password,
      });

      if (data.status === "success") {
        setAuth({
          ...auth,
          user: data.user,
          token: data.token,
        });
        localStorage.setItem("auth", JSON.stringify(data));
        navigate(location.state || "/");
        toast.success("Login successfully.");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response received from the server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <Layout title={"Login"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">Login Form</h4>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputName"
              placeholder="Enter Your Email address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mb-3">
            Login
          </button>
          <div>
            <button
              type="submit"
              className="btn btn-primary forgot-btn"
              onClick={() => {
                navigate("/forgotPassword");
              }}
            >
              Forgot Password
            </button>
          </div>
        </form>
        <div className="mb-3 float-right">
          <Link to="/signup" className="m-3 mx-1 btn btn-secondary forgot-btn">
            New User
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
