import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Home = () => {
  return (
    <div className="bg1 container-fuild">
      <h1 style={{ marginBottom: "19%" }}>Welcome to Home page!</h1>
      <div>
        <Link to="/login">
          <button className="btn btn-primary btn1">Login</button>
        </Link>
        <Link to="/register">
          <button className="btn btn-primary btn1">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
