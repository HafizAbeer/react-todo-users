import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icons

const Register = () => {
  const existingUsers =
    JSON.parse(localStorage.getItem("registeredUsers")) || [];
  const navigate = useNavigate();

  const randomId = () => Math.random().toString(36).slice(2);

  const [state, setState] = useState({ fullName: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleRegister = (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let { fullName, email, password } = state;

    if (!fullName) {
      showNotification("Enter name", "error");
      return;
    }
    if (!email) {
      showNotification("Enter email", "error");
      return;
    }
    if (!emailRegex.test(email)) {
      showNotification("Enter correct email", "error");
      return;
    }

    function isUserRegistered(email, users) {
      return users.some((user) => user.email === email);
    }

    if (isUserRegistered(email, existingUsers)) {
      showNotification("User already registered", "error");
      return;
    }

    if (!password) {
      showNotification("Enter password", "error");
      return;
    }
    if (password.length < 6) {
      showNotification("Length of password must be at least 6", "error");
      return;
    }

    const user = {
      fullName,
      email,
      password,
      user_id: randomId(),
    };

    const updatedUsers = [...existingUsers, user];

    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
    showNotification("User Registered", "success");
    navigate("/login");

    function showNotification(message, type) {
      let bgColor;

      switch (type) {
        case "success":
          bgColor = "linear-gradient(to right, #1D976C, #93F9B9)";
          break;
        case "error":
          bgColor = "linear-gradient(to right, #93291e, #ed213a)";
          break;
        default:
          bgColor = "#000";
      }

      Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: bgColor,
        },
      }).showToast();
    }
  };

  return (
    <main className="auth py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card border-none p-3 p-md-4">
              <h2 className="text-center text-primary mb-4">Register</h2>
              <form onSubmit={handleRegister}>
                <div className="row">
                  <div className="col-12 mb-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type full name"
                      name="fullName"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 mb-4">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Type email"
                      name="email"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 mb-4" style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Type password"
                      name="password"
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                      }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary w-100">Register</button>
                    <p className="mb-0 mt-2 text-center">
                      Already have an account?{" "}
                      <Link to={"/login"}>Login Now</Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
