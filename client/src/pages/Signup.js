import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../styles/AuthStyles.css";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`/api/v1/users/signup`, {
        name,
        email,
        password,
        passwordConfirm,
        answer,
      });

      if (data.status === "success") {
        navigate("/login");
        toast.success("Register successfully.");
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
    <Layout title={"Signup"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">Signup Form</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Name"
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
              placeholder="What is your favourite sport"
              required
            />
          </div>
          {/* <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Phone
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
            />
          </div> */}
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
          <div className="mb-3">
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="form-control"
              id="exampleInputPasswordConfirm"
              placeholder="Confirm Your Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Signup
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Signup;
