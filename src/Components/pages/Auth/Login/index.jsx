import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  // State to manage email, password, and password visibility
  const [state, setState] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  // Function to handle input changes and update state
  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const navigate = useNavigate();

  // Function to handle form submission for login
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Retrieve registered users from localStorage
    const existingUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    let { email, password } = state;
    email = email.trim();

    // Input validation
    if (!email) {
      showNotification("Enter email", "error");
      return;
    }
    if (!emailRegex.test(email)) {
      showNotification("Enter correct email", "error");
      return;
    }
    if (!password) {
      showNotification("Enter password", "error");
      return;
    }
    if (password.length < 6) {
      showNotification("Invalid email or password", "error");
      return;
    }

    // Find user by email and validate password
    const user = existingUsers.find((user) => user.email === email);

    if (!user) {
      showNotification("Email is not registered", "error");
    } else if (user.password !== password) {
      showNotification("Invalid email or password", "error");
    } else {
      showNotification("Login successfully", "success");
      navigate("/home"); // Navigate to the home page on successful login
    }

    // Function to show notification messages
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
            {/* Card for login form */}
            <div className="card border-none p-3 p-md-4">
              <h2 className="text-center text-primary mb-4">Login</h2>
              {/* Login form */}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Email input field */}
                  <div className="col-12 mb-4">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Type email"
                      name="email"
                      onChange={handleChange}
                    />
                  </div>
                  {/* Password input field with toggle visibility */}
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
                  {/* Link to forgot password page */}
                  <div className="mb-3">
                    <Link to={"/forgotpassword"}>Forgot Password</Link>
                  </div>
                  {/* Submit button and link to registration page */}
                  <div className="col-12">
                    <button className="btn btn-primary w-100">Login</button>
                    <p className="mb-0 mt-2 text-center">
                      Don't have an account?{" "}
                      <Link to={"/register"}>Register Now</Link>
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

export default Login;
