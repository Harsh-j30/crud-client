import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
const baseurl="https://crud-server-gyze.onrender.com";
const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Retrieve token from localStorage
      const token = localStorage.getItem("token");

      // Check if token exists
      if (!token) {
        toast.error("You must log in first!", { position: "top-right" });
        return;
      }

      try {
        // Fetch user data with Authorization header
        const response = await axios.get(`${baseurl}/api/getall`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response?.status === 401) {
          toast.error("Unauthorized. Please log in again.", {
            position: "top-right",
          });
        } else {
          toast.error(
            error.response?.data?.msg || "Failed to fetch user data.",
            { position: "top-right" }
          );
        }
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    const token = localStorage.getItem("token");

    // Check if token exists
    if (!token) {
      toast.error("You must log in first!", { position: "top-right" });
      return;
    }

    try {
      await axios.delete(`${baseurl}/api/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      );
      toast.success("User deleted successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(
        error.response?.data?.msg || "Failed to delete user.",
        { position: "top-right" }
      );
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="card-title mb-0">User List</h3>
            <Link to={"/add"} className="btn btn-primary">
              <i className="fa fa-plus me-1"></i> Add User
            </Link>
          </div>
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle">
              <thead className="table-dark">
                <tr>
                  <th scope="col">S.No.</th>
                  <th scope="col">User Name</th>
                  <th scope="col">User Email</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>
                      {user.fname} {user.lname}
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <div className="d-flex justify-content-center">
                        <button
                          className="btn btn-danger btn-sm me-2"
                          onClick={() => deleteUser(user._id)}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                        <Link
                          to={`/edit/${user._id}`}
                          className="btn btn-success btn-sm"
                        >
                          <i className="fa fa-pen"></i>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center text-muted">
                      No Users Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
