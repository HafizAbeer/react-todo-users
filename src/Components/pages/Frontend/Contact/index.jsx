import React, { useState } from "react";

const Contact = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    queryType: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve existing data from localStorage or initialize an empty array
    const existingData =
      JSON.parse(localStorage.getItem("contactFormData")) || [];

    // Append new form data
    existingData.push(formData);

    // Save updated data to localStorage
    localStorage.setItem("contactFormData", JSON.stringify(existingData));

    // Reset form state
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      queryType: "",
      message: "",
    });

    // Show success notification
    showNotification("Contact request delivered", "success");
  };

  // Function to show notification messages
  function showNotification(message, type) {
    let bgColor;

    // Set background color based on notification type
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

    // Show the toast notification
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
    <main className="py-5">
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="text-center text-white">Contact Us</h1>
          </div>
        </div>

        <div className="row">
          <div className="col mt-4">
            <div
              className="card bg-white border border-2 rounded-5 mx-auto p-3 p-md-4"
              style={{ maxWidth: 600 }}
            >
              <form id="form" className="text-black" onSubmit={handleSubmit}>
                <div className="row">
                  {/* First Name Input */}
                  <div className="col-md-6 mb-4">
                    <label htmlFor="firstName" className="mb-1">
                      First Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      onChange={handleChange}
                      name="firstName"
                      id="firstName"
                      value={formData.firstName}
                      required
                    />
                  </div>
                  {/* Last Name Input */}
                  <div className="col-md-6 mb-4">
                    <label htmlFor="lastName" className="mb-1">
                      Last Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      onChange={handleChange}
                      name="lastName"
                      id="lastName"
                      value={formData.lastName}
                      required
                    />
                  </div>
                  {/* Email Input */}
                  <div className="col-12 mb-4">
                    <label htmlFor="email">
                      Email <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      onChange={handleChange}
                      name="email"
                      id="email"
                      value={formData.email}
                      required
                    />
                  </div>
                  {/* Query Type Radio Buttons */}
                  <div className="form-group mb-4">
                    <label htmlFor="queryType" className="d-block">
                      Query Type <span style={{ color: "red" }}>*</span>
                    </label>
                    <div
                      className="btn-group btn-group-toggle d-flex"
                      data-toggle="buttons"
                    >
                      <label className="btn border rounded-2 border-1 flex-fill m-2">
                        <input
                          type="radio"
                          name="queryType"
                          value="generalEnquiry"
                          autoComplete="off"
                          onChange={handleChange}
                          checked={formData.queryType === "generalEnquiry"}
                          required
                        />
                        {" General Enquiry"}
                      </label>
                      <label className="btn border rounded-2 border-1 flex-fill m-2">
                        <input
                          type="radio"
                          name="queryType"
                          value="supportRequest"
                          autoComplete="off"
                          onChange={handleChange}
                          checked={formData.queryType === "supportRequest"}
                          required
                        />
                        &nbsp;
                        {"Support Request "}
                      </label>
                    </div>
                  </div>
                  {/* Message Textarea */}
                  <div className="col-12 mb-4">
                    <label htmlFor="message" className="mb-1">
                      Message <span style={{ color: "red" }}>*</span>
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      className="form-control"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                {/* Consent Checkbox */}
                <div className="form-group form-check mt-2 mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="agreeCheck"
                    required
                  />
                  <label className="form-check-label" htmlFor="agreeCheck">
                    I consent to being contacted by the team{" "}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                </div>
                {/* Submit Button */}
                <div className="col-12">
                  <button className="btn btn-primary w-100 mt-2" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
