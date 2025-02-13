import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {register} from "../services/authService";

const Register = () => {
  const [form, setForm] = useState({ fname: "", lname: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      toast.success("Registration successful");
      navigate("/login");
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="fname" placeholder="First Name" onChange={handleChange} />
      <input type="text" name="lname" placeholder="Last Name" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
