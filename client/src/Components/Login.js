import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCookieData } from "../action";

const Login = () => {
  const cookieData = useSelector((state) => state.cookie);
  const dispatch = useDispatch();

  const [logData, setlogData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setlogData({ ...logData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", logData);
      dispatch(setCookieData(response.data.cookie));
      console.log(cookieData);
    } catch (error) {
      alert(error);
    }
  };

  if (cookieData) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="container register-form">
      <h2>Login Form</h2>
      <p style={{ fontSize: "15px" }}>Please register before login</p>
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
            type="email"
            name="email"
            value={logData.email}
            onChange={handleChange}
            placeholder="Email"
          />

          <input
            type="password"
            name="password"
            value={logData.password}
            onChange={handleChange}
            placeholder="Password"
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
            Login
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

export default Login;
