import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  // State to manage input values for email, new password, and confirm password
  const [state, setState] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Function to handle input changes and update state
  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  // Regular expression for validating email format
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Function to handle form submission for resetting password
  const handleForgotPassword = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const { email, newPassword, confirmPassword } = state;

    // Input validation
    if (!email) {
      showNotification("Please enter your email", "error");
      return;
    }
    if (!emailRegex.test(email)) {
      showNotification("Please enter a valid email", "error");
      return;
    }
    if (!newPassword) {
      showNotification("Please enter a new password", "error");
      return;
    }
    if (newPassword.length < 6) {
      showNotification("Password should be at least 6 characters", "error");
      return;
    }
    if (!confirmPassword) {
      showNotification("Please enter confirm password", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      showNotification("Passwords do not match", "error");
      return;
    }

    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    // Check if the email exists in user data
    const findEmail = userData.find((user) => user.email === email);

    if (!findEmail) {
      showNotification("Email not registered", "error");
      return;
    }

    // Update the user's password
    findEmail.password = newPassword;
    localStorage.setItem("registeredUsers", JSON.stringify(userData));

    showNotification("Password has been reset successfully", "success");
  };

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
      gravity: "top",
      position: "left",
      style: {
        background: bgColor,
      },
    }).showToast();
  }

  return (
    <main className="auth py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            {/* Card for password reset form */}
            <div className="card border-none p-3 p-md-4">
              <h2 className="text-center text-primary mb-4">Reset Password</h2>
              {/* Password reset form */}
              <form onSubmit={handleForgotPassword}>
                <div className="row">
                  {/* Email input field */}
                  <div className="col-12 mb-4">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Type email"
                      name="email"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  {/* New password input field */}
                  <div className="col-12 mb-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="New password"
                      name="newPassword"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  {/* Confirm new password input field */}
                  <div className="col-12 mb-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm new password"
                      name="confirmPassword"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  {/* Submit button and link to login page */}
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary w-100">
                      Reset Password
                    </button>
                    <p className="mb-0 mt-2 text-center">
                      Back to <Link to={"/login"}>Login</Link>
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

export default ForgotPassword;
