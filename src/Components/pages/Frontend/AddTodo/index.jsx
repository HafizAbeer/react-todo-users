import React, { useState, useRef } from "react";

const AddTodo = () => {
  const [state, setState] = useState({
    title: "",
    location: "",
    description: "",
    date: "",
  });

  const formRef = useRef(null);

  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const randomId = () => Math.random().toString(36).slice(2);

  const addUser = (e) => {
    e.preventDefault();

    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    const { title, location, description, date } = state;

    if (!title) {
      showNotification("Enter the title", "error");
      return;
    }
    if (!location) {
      showNotification("Enter the location", "error");
      return;
    }
    if (!description) {
      showNotification("Enter the description", "error");
      return;
    }
    if (!date) {
      showNotification("Enter the date", "error");
      return;
    }

    const newTodo = {
      title,
      location,
      description,
      date,
      status: "incomplete",
      dateCreated: new Date(),
      todo_id: randomId(),
    };

    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));

    showNotification("Todo added successfully", "success");
    formRef.current.reset();
    setState({
      title: "",
      location: "",
      description: "",
      date: "",
    });
  };

  const showNotification = (message, type) => {
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
  };

  return (
    <main className="py-5">
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="text-center text-white">Add Todo</h1>
          </div>
        </div>

        <div className="row">
          <div className="col mt-4">
            <div className="h-100">
              <div
                className="card border border-2 rounded-5 mx-auto p-3 p-md-4"
                style={{ maxWidth: 400 }}
              >
                <h4 className="text-center text-white mb-4">Input Data</h4>
                <form id="form" ref={formRef} onSubmit={addUser}>
                  <div className="row">
                    <div className="col-12 mb-4">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter title"
                        onChange={handleChange}
                        name="title"
                      />
                    </div>
                    <div className="col-12 mb-4">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter location"
                        onChange={handleChange}
                        name="location"
                      />
                    </div>
                    <div className="col-12 mb-4">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter description"
                        onChange={handleChange}
                        name="description"
                      />
                    </div>
                    <div className="col-12 mb-4">
                      <input
                        className="w-100 form-control"
                        type="date"
                        onChange={handleChange}
                        name="date"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="addUser btn btn-primary w-100">
                      Add Todo
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddTodo;
