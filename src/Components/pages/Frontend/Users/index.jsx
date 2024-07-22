import React, { useState } from "react";
import { Button, Modal, Input, Form, Image } from "antd";
import { FiEdit, FiTrash2, FiLock } from "react-icons/fi";
import { BsPerson } from "react-icons/bs";

const { confirm } = Modal;

const Users = () => {
  // State to control the visibility of modals
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);

  // State to store the currently selected user for editing or password update
  const [currentUser, setCurrentUser] = useState({});

  // State to manage password update form values
  const [passwordUpdate, setPasswordUpdate] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // State to store the list of users
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("registeredUsers")) || []
  );

  // Function to handle the edit button click
  const handleEdit = (user) => {
    setCurrentUser(user); // Set the current user to be edited
    setIsModalVisible(true); // Show the edit user modal
  };

  // Function to handle user deletion
  const handleDelete = (user_id) => {
    confirm({
      title: "Are you sure you want to delete this user?",
      onOk() {
        const updatedUsersData = users.filter(
          (user) => user.user_id !== user_id
        );
        setUsers(updatedUsersData); // Update users state
        localStorage.setItem(
          "registeredUsers",
          JSON.stringify(updatedUsersData) // Save updated users to localStorage
        );
      },
    });
  };

  // Function to handle the 'OK' button click in the edit user modal
  const handleModalOk = () => {
    const updatedUsersData = users.map((user) =>
      user.user_id === currentUser.user_id ? currentUser : user
    );
    setUsers(updatedUsersData); // Update users state
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsersData)); // Save updated users to localStorage
    setIsModalVisible(false); // Hide the edit user modal
  };

  // Function to handle the 'Cancel' button click in the edit user modal
  const handleModalCancel = () => {
    setIsModalVisible(false); // Hide the edit user modal
  };

  // Function to handle input changes in the edit user modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // Function to handle changes in the password update form
  const handlePasswordUpdateChange = (e) => {
    const { name, value } = e.target;
    setPasswordUpdate((prev) => ({ ...prev, [name]: value }));
  };

  // Function to handle the 'OK' button click in the update password modal
  const handlePasswordModalOk = () => {
    if (
      !currentUser.password ||
      passwordUpdate.oldPassword !== currentUser.password
    ) {
      showNotification("Old password does not match!", "error");
      return;
    }

    if (passwordUpdate.newPassword.length < 6) {
      showNotification("Length of password must be at least 6", "error");
      return;
    }

    if (passwordUpdate.newPassword !== passwordUpdate.confirmPassword) {
      showNotification(
        "New password and confirm password do not match!",
        "error"
      );
      return;
    }

    const updatedUsersData = users.map((user) =>
      user.user_id === currentUser.user_id
        ? { ...user, password: passwordUpdate.newPassword }
        : user
    );

    setUsers(updatedUsersData); // Update users state
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsersData)); // Save updated users to localStorage
    setIsPasswordModalVisible(false); // Hide the update password modal
    setPasswordUpdate({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  // Function to handle the 'Cancel' button click in the update password modal
  const handlePasswordModalCancel = () => {
    setIsPasswordModalVisible(false); // Hide the update password modal
    setPasswordUpdate({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  // Function to show the password update modal
  const showPasswordModal = (user) => {
    setCurrentUser(user); // Set the current user to update password
    setIsPasswordModalVisible(true); // Show the update password modal
  };

  // Function to handle profile picture change
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentUser((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
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
      close: true,
      gravity: "top",
      position: "left",
      stopOnFocus: true,
      style: {
        background: bgColor,
      },
    }).showToast();
  }

  return (
    <>
      <main className="py-5">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <h4 className="text-white mb-5">Show users</h4>{" "}
              {/* Page heading */}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="table-responsive">
                {/* Table to display user data */}
                <table className="table table-striped table-hover align-middle text-center">
                  <thead>
                    <tr>
                      <th>#</th> {/* Column header for serial number */}
                      <th>Image</th> {/* Column header for profile image */}
                      <th>Full Name</th> {/* Column header for full name */}
                      <th>Email</th> {/* Column header for email */}
                      <th>User Id</th> {/* Column header for user ID */}
                      <th>Action</th> {/* Column header for action buttons */}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, i) => {
                      const { profilePicture, fullName, email, user_id } = user;
                      return (
                        <tr key={i}>
                          <th>{i + 1}</th> {/* Serial number */}
                          <td>
                            {profilePicture ? (
                              <Image
                                src={profilePicture}
                                alt="Profile"
                                style={{ width: 48, height: 48 }} // Style for profile image
                              />
                            ) : (
                              <BsPerson style={{ width: 48, height: 48 }} /> // Placeholder if no profile picture
                            )}
                          </td>
                          <td>{fullName}</td> {/* User's full name */}
                          <td>{email}</td> {/* User's email */}
                          <td>{user_id}</td> {/* User's ID */}
                          <td>
                            {/* Action buttons for editing, deleting, and updating password */}
                            <Button
                              type="primary"
                              onClick={() => handleEdit(user)}
                              className="me-2 mb-2"
                            >
                              <FiEdit /> {/* Edit icon */}
                            </Button>
                            <Button
                              type="danger"
                              onClick={() => handleDelete(user_id)}
                              className="me-2 mb-2"
                            >
                              <FiTrash2 /> {/* Delete icon */}
                            </Button>
                            <Button
                              type="primary"
                              onClick={() => showPasswordModal(user)}
                              className="me-2 mb-2"
                            >
                              <FiLock className="me-2" />{" "}
                              {/* Password update icon */}
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal for editing user details */}
      <Modal
        title="Edit User"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Full Name">
            <Input
              name="fullName"
              value={currentUser.fullName}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              name="email"
              value={currentUser.email}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="User ID">
            <Input
              name="user_id"
              value={currentUser.user_id}
              onChange={handleInputChange}
              disabled
            />
          </Form.Item>
          <Form.Item label="Profile Picture">
            <label
              htmlFor="profilePicture"
              className="d-flex justify-content-center align-items-center"
              style={{ cursor: "pointer" }}
            >
              {currentUser.profilePicture ? (
                <img
                  src={currentUser.profilePicture}
                  alt="Profile"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <BsPerson
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "48px",
                  }}
                />
              )}
            </label>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              className="d-none"
              onChange={handleProfilePictureChange}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal for updating user password */}
      <Modal
        title="Update Password"
        visible={isPasswordModalVisible}
        onOk={handlePasswordModalOk}
        onCancel={handlePasswordModalCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Old Password">
            <Input.Password
              name="oldPassword"
              value={passwordUpdate.oldPassword}
              onChange={handlePasswordUpdateChange}
            />
          </Form.Item>
          <Form.Item label="New Password">
            <Input.Password
              name="newPassword"
              value={passwordUpdate.newPassword}
              onChange={handlePasswordUpdateChange}
            />
          </Form.Item>
          <Form.Item label="Confirm New Password">
            <Input.Password
              name="confirmPassword"
              value={passwordUpdate.confirmPassword}
              onChange={handlePasswordUpdateChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Users;
