import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/register", formData)
      .then((res) => {
        alert(res.data);
        console.log(formData);
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          alert("User already exists.");
        } else if (err.response && err.response.status === 402) {
          return alert("Password and confirm password do not match.");
        } else {
          return alert(err);
        }
      });
  };

  return (
    <div className="container register-form">
      <h2>Register Form</h2>
      <div>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            gap: "5px",
          }}
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />

          <input
            type="password"
            name="confirmpassword"
            value={formData.confirmpassword}
            onChange={handleChange}
            placeholder="confirmPassword"
          />

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              marginLeft: "auto",
              marginRight: "10%",
              fontSize: "20px",
              fontWeight: "bold",
              border: "5px solid",
            }}
          >
            Submit
          </button>
        </form>
      </div>

      <Link to="/">
        <button className="btn btn-primary" style={{ marginTop: "150%" }}>
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default Register;
