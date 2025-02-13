import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";

const Add = () => {
  const users = {
    fname: "",
    lname: "",
    email: "",
    password: "",
  };
  

  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  // Input Handler
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Submit Form
  const submitForm = async (e) => {
    e.preventDefault();

    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    // Check if token exists
    if (!token) {
      toast.error("You must log in first!", { position: "top-right" });
      return;
    }

    try {
      // Send POST request with Authorization header
      const response = await axios.post(
        "http://localhost:8000/api/create",
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
          },
        }
      );

      // Success message and navigation
      toast.success(response.data.msg, { position: "top-right" });
      navigate("/"); // Redirect to home
    } catch (error) {
      console.error("Error:", error);

      // Handle specific errors
      if (error.response?.status === 401) {
        toast.error("Unauthorized. Please log in again.", {
          position: "top-right",
        });
        navigate("/login"); // Redirect to login
      } else {
        toast.error(
          error.response?.data?.msg || "An unexpected error occurred.",
          { position: "top-right" }
        );
      }
    }
  };

  return (
    

    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4 w-100" style={{ maxWidth: "400px" }}>
        <Link to="/" className="mb-3 text-decoration-none">
          &larr; Back
        </Link>
        <h3 className="text-center mb-4">Add New User</h3>
        <form onSubmit={submitForm}>
          <div className="mb-3">
            <label htmlFor="fname" className="form-label fw-semibold">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              onChange={inputHandler}
              id="fname"
              name="fname"
              autoComplete="off"
              placeholder="Enter first name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lname" className="form-label fw-semibold">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              onChange={inputHandler}
              id="lname"
              name="lname"
              autoComplete="off"
              placeholder="Enter last name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              onChange={inputHandler}
              id="email"
              name="email"
              autoComplete="off"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              onChange={inputHandler}
              id="password"
              name="password"
              autoComplete="off"
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-bold">
            ADD USER
          </button>
        </form>
        <div>
    </div>
      </div>
    </div>
  );
};

export default Add;
