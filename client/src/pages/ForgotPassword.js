import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AuthStyles.css";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `/api/v1/users/forgot-password`,
        {
          email,
          newPassword,
          answer,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (data.status === "success") {
        navigate("/login");
        toast.success("Password reset successfully.");
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
    <Layout title={"reset password"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">RESET PASSWORD</h4>
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
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputAnswer"
              placeholder="Enter Your Answer"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Create New Password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Reset
          </button>
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

export default ForgotPassword;
