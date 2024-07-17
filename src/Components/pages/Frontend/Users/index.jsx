import React, { useState } from "react";
import { Button, Modal, Input, Form } from "antd";
import { FiEdit, FiTrash2, FiLock } from "react-icons/fi";

const { confirm } = Modal;

const Users = () => {
  const [showTable, setShowTable] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [passwordUpdate, setPasswordUpdate] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("registeredUsers")) || []
  );

  const toggleData = (e) => {
    e.preventDefault();
    setShowTable((prevShowTable) => !prevShowTable);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsModalVisible(true);
  };

  const handleDelete = (user_id) => {
    confirm({
      title: "Are you sure you want to delete this user?",
      onOk() {
        const updatedUsersData = users.filter(
          (user) => user.user_id !== user_id
        );
        setUsers(updatedUsersData);
        localStorage.setItem(
          "registeredUsers",
          JSON.stringify(updatedUsersData)
        );
      },
    });
  };

  const handleModalOk = () => {
    const updatedUsersData = users.map((user) =>
      user.user_id === currentUser.user_id ? currentUser : user
    );
    setUsers(updatedUsersData);
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsersData));
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handlePasswordUpdateChange = (e) => {
    const { name, value } = e.target;
    setPasswordUpdate((prev) => ({ ...prev, [name]: value }));
  };

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

    setUsers(updatedUsersData);
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsersData));
    setIsPasswordModalVisible(false);
    setPasswordUpdate({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handlePasswordModalCancel = () => {
    setIsPasswordModalVisible(false);
    setPasswordUpdate({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const showPasswordModal = (user) => {
    setCurrentUser(user);
    setIsPasswordModalVisible(true);
  };

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
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
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
              <h4 className="text-white mb-5">Show users</h4>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="table-responsive">
                <table className="table table-striped table-hover align-middle text-center">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>User Id</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, i) => {
                      const { fullName, email, password, user_id } = user;
                      return (
                        <tr key={i}>
                          <th>{i + 1}</th>
                          <td>{fullName}</td>
                          <td>{email}</td>
                          <td>{user_id}</td>
                          <td>
                            <Button
                              type="primary"
                              onClick={() => handleEdit(user)}
                              className="me-2"
                            >
                              <FiEdit />
                            </Button>
                            <Button
                              type="danger"
                              onClick={() => handleDelete(user_id)}
                              className="me-2"
                            >
                              <FiTrash2 />
                            </Button>
                            <Button
                              type="primary"
                              onClick={() => showPasswordModal(user)}
                              className="me-2"
                            >
                              <FiLock className="me-2" />
                              {/* Update Password */}
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
          {/* <Form.Item label="Password">
            <Input
              name="password"
              value={currentUser.password}
              onChange={handleInputChange}
            />
          </Form.Item> */}
          <Form.Item label="User ID">
            <Input
              name="user_id"
              value={currentUser.user_id}
              onChange={handleInputChange}
              disabled
            />
          </Form.Item>
        </Form>
      </Modal>

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
