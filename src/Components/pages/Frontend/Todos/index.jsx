import React, { useState } from "react";
import { Button, Modal, Input, Form } from "antd";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const { confirm } = Modal;

const Todo = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  const navigate = useNavigate();

  const handleEdit = (todo) => {
    setCurrentTodo(todo);
    setIsModalVisible(true);
  };

  const handleDelete = (todo_id) => {
    confirm({
      title: "Are you sure you want to delete this todo?",
      onOk() {
        const updatedTodos = todos.filter((todo) => todo.todo_id !== todo_id);
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
      },
    });
  };

  const handleModalOk = () => {
    const updatedTodos = todos.map((todo) =>
      todo.todo_id === currentTodo.todo_id ? currentTodo : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTodo((prevTodo) => ({ ...prevTodo, [name]: value }));
  };

  return (
    <>
      <main className="py-5">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <h4 className="text-white">Show Todos</h4>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="table-responsive">
                <div className="d-flex justify-content-end mb-3">
                  <Button onClick={() => navigate("/addTodo")} type="primary">
                    Add Todo
                  </Button>
                </div>
                <table className="table table-striped table-hover align-middle text-center">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Location</th>
                      <th>Description</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Todo Id</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todos.map((todo, index) => {
                      const {
                        title,
                        location,
                        description,
                        date,
                        status,
                        todo_id,
                      } = todo;
                      return (
                        <tr key={todo_id}>
                          <th>{index + 1}</th>
                          <td>{title}</td>
                          <td>{location}</td>
                          <td>{description}</td>
                          <td>{date}</td>
                          <td>{status}</td>
                          <td>{todo_id}</td>
                          <td>
                            <Button
                              type="primary"
                              onClick={() => handleEdit(todo)}
                              className="me-2"
                            >
                              <FiEdit />
                            </Button>
                            <Button
                              type="danger"
                              onClick={() => handleDelete(todo_id)}
                            >
                              <FiTrash2 />
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
        title="Edit todo"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input
              name="title"
              value={currentTodo.title}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Location">
            <Input
              name="location"
              value={currentTodo.location}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input
              name="description"
              value={currentTodo.description}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Date">
            <Input
              name="date"
              value={currentTodo.date}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Status">
            <Input
              name="status"
              value={currentTodo.status}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Todo ID">
            <Input
              name="todo_id"
              value={currentTodo.todo_id}
              onChange={handleInputChange}
              disabled
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Todo;
