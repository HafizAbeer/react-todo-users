import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icons for password visibility toggle
import { BsPerson } from "react-icons/bs"; // Importing person icon for default profile picture

const defaultPersonIconBase64 = "data:image/svg+xml;base64,..."; // Add your base64 encoded default person icon here

const Register = () => {
  // Retrieve existing users from localStorage
  const existingUsers =
    JSON.parse(localStorage.getItem("registeredUsers")) || [];
  const navigate = useNavigate(); // Hook for navigation

  // Function to generate a random user ID
  const randomId = () => Math.random().toString(36).slice(2);

  // State to manage form fields and profile picture
  const [state, setState] = useState({ fullName: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [profilePicture, setProfilePicture] = useState(null); // State for profile picture

  // Function to handle form input changes
  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  // Function to handle profile picture upload
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file); // Read file as data URL
    }
  };

  // Function to handle form submission
  const handleRegister = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let { fullName, email, password } = state;

    // Input validation
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

    // Function to check if the user is already registered
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

    // Create new user object
    const user = {
      fullName,
      email,
      password,
      user_id: randomId(),
      profilePicture: profilePicture || defaultPersonIconBase64,
    };

    // Update localStorage with new user data
    const updatedUsers = [...existingUsers, user];
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
    showNotification("User Registered", "success");
    navigate("/login"); // Redirect to login page

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
            {/* Registration form card */}
            <div className="card border-none p-3 p-md-4">
              <h2 className="text-center text-primary mb-4">Register</h2>
              {/* Profile picture upload section */}
              <div className="text-center mb-4">
                <label
                  htmlFor="profilePicture"
                  className="profile-picture-label d-flex justify-content-center align-items-center rounded-circle border border-secondary bg-light mx-auto"
                  style={{ width: "100px", height: "100px", cursor: "pointer" }}
                >
                  {profilePicture ? (
                    <img
                      src={profilePicture}
                      alt="Profile"
                      className="profile-picture-preview rounded-circle"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <BsPerson className="text-secondary" size={40} />
                  )}
                </label>
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  className="d-none"
                  onChange={handleProfilePictureChange}
                />
              </div>
              {/* Registration form */}
              <form onSubmit={handleRegister}>
                <div className="row">
                  {/* Full name input */}
                  <div className="col-12 mb-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type full name"
                      name="fullName"
                      onChange={handleChange}
                    />
                  </div>
                  {/* Email input */}
                  <div className="col-12 mb-4">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Type email"
                      name="email"
                      onChange={handleChange}
                    />
                  </div>
                  {/* Password input with visibility toggle */}
                  <div className="col-12 mb-4 position-relative">
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
                      className="btn btn-link position-absolute"
                      style={{
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {/* Submit button and link to login page */}
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
