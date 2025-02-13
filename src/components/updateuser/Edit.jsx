import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";

const baseurl="https://crud-server-gyze.onrender.com";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ fname: "", lname: "", email: "" });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You must log in first!", { position: "top-right" });
        return;
      }

      try {
        const response = await axios.get(
          `${baseurl}/api/getone/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error(
          error.response?.data?.msg || "Failed to load user data.",
          { position: "top-right" }
        );
      }
    };

    fetchData();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You must log in first!", { position: "top-right" });
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/api/update/${id}`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.msg, { position: "top-right" });
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(
        error.response?.data?.msg || "Failed to update user.",
        { position: "top-right" }
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Update User</h5>
              <Link to="/" className="btn btn-light btn-sm">
                <i className="fa fa-arrow-left me-1"></i> Back
              </Link>
            </div>
            <div className="card-body">
              <form onSubmit={submitForm}>
                <div className="mb-3">
                  <label htmlFor="fname" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={user.fname}
                    onChange={inputChangeHandler}
                    id="fname"
                    name="fname"
                    className="form-control"
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lname" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={user.lname}
                    onChange={inputChangeHandler}
                    id="lname"
                    name="lname"
                    className="form-control"
                    placeholder="Enter last name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    onChange={inputChangeHandler}
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter email"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  <i className="fa fa-save me-1"></i> Update User
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
