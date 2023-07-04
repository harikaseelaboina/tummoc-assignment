import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h1> Welcome to our Photography Collection</h1>
      <button>Logout</button>
      <div
        id="carouselExampleControls"
        className="carousel slide container"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://res.cloudinary.com/dyylqn8vb/image/upload/v1680948378/pexels-bess-hamiti-36487_qrhhs9.jpg"
              className="d-block w-100"
              style={{ height: "50%" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://res.cloudinary.com/dyylqn8vb/image/upload/v1680944026/pexels-thiago-japyassu-1069798_ns7yqt.jpg"
              className="d-block w-100"
              style={{ height: "50%" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://res.cloudinary.com/dyylqn8vb/image/upload/v1680943478/pexels-ylanite-koppens-1445416_dvovkd.jpg"
              className="d-block w-100"
              style={{ height: "50%" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://res.cloudinary.com/dyylqn8vb/image/upload/v1680944026/pexels-thiago-japyassu-1069798_ns7yqt.jpg"
              className="d-block w-100"
              style={{ height: "50%" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://res.cloudinary.com/dyylqn8vb/image/upload/v1680943478/pexels-ylanite-koppens-1445416_dvovkd.jpg"
              className="d-block w-100"
              style={{ height: "50%" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://res.cloudinary.com/dyylqn8vb/image/upload/v1680946610/pexels-rostislav-uzunov-5011647_vkmacc.jpg"
              className="d-block w-100"
              style={{ height: "50%" }}
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
