import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

  const navigate = useNavigate();

  const homeStyle = {
    backgroundColor: "#000",
    backgroundImage: "linear-gradient(62deg, #3a3d40 0%, #181719 100%)",
    height: "100vh",
  };

  const h1Style = {
    fontFamily: "'Raleway', sans-serif",
  };

  const pStyle = {
    fontSize: "3rem",
    fontWeight: 200,
    fontStyle: "italic",
    color: "#c21807",
  };

  const cardStyle = {
    width: "18rem",
    backgroundColor: "#c21807",
  };

  return (
    <div
      id="home-page"
      style={homeStyle}
      className="d-flex flex-column justify-content-center align-items-center text-center"
    >
      <h1 style={h1Style} className="display-1 text-white">
        Hey! I am Hafiz Abeer
      </h1>
      <p style={pStyle} className="mt-3">
        a web developer
      </p>

      {/* Cards Container */}
      <div className="d-flex flex-wrap justify-content-center mt-4">
        <div className="card text-white m-2" style={cardStyle}>
          <div className="card-body">
            <h5 className="card-title">
              Todos: <span>{todos.length}</span>
            </h5>
            <button
              className="btn btn-dark w-100"
              onClick={() => navigate("/todos")}
            >
              See Details
            </button>
          </div>
        </div>

        <div className="card text-white m-2" style={cardStyle}>
          <div className="card-body">
            <h5 className="card-title">
              Users: <span>{users.length}</span>
            </h5>
            <button
              className="btn btn-dark w-100"
              onClick={() => navigate("/users")}
            >
              See Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
