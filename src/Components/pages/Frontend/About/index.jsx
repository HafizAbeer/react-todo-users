import React from "react";

const About = () => {
  return (
    <main className="py-5">
      <div className="container text-white">
        <h2>About Our Todo Application</h2>
        <hr />
        <p>
          Welcome to our Todo Application! This platform is designed to help
          users manage their tasks efficiently while providing a seamless user
          experience. Below are the key features and functionalities that our
          application offers:
        </p>

        <section>
          <h5>User Registration</h5>
          <p>
            <strong>Register Users:</strong> New users can create an account by
            providing their full name, email, and password. All user data is
            securely stored in local storage.
          </p>
        </section>

        <section>
          <h5>User Login</h5>
          <p>
            <strong>Login:</strong> Registered users can log in using their
            email and password. This ensures that access to the application is
            restricted to authorized users only.
          </p>
        </section>

        <section>
          <h5>Password Management</h5>
          <p>
            <strong>Update Password:</strong> Once logged in, users have the
            ability to change their password. This requires entering the old
            password, new password, and confirming the new password to ensure
            security.
          </p>
          <p>
            <strong>Forgot Password:</strong> If users forget their password,
            they can reset it by entering their email address, along with a new
            password and confirming it. A reset link is sent to the registered
            email for verification.
          </p>
        </section>

        <section>
          <h5>Home Page Features</h5>
          <p>
            <strong>Dashboard Overview:</strong> After a successful login, users
            are directed to the home page, which displays two cards:
          </p>
          <ul>
            <li>
              <strong>Todos Count:</strong> Shows the total number of todos
              created by the user.
            </li>
            <li>
              <strong>Users Count:</strong> Displays the total number of
              registered users.
            </li>
          </ul>
          <p>
            <strong>Navigation:</strong> Clicking on the "Todos" card navigates
            users to the todos page, while clicking on the "Users" card directs
            them to the users page.
          </p>
        </section>

        <section>
          <h5>Todos Management</h5>
          <p>
            <strong>Todos Page:</strong> This page lists all todos in a
            structured table format, providing an overview of tasks.
          </p>
          <p>
            <strong>Add Todo:</strong> Users can click the "Add Todo" button at
            the top right of the table to navigate to a new page where they can
            create a new todo. The form includes fields for:
          </p>
          <ul>
            <li>Title</li>
            <li>Location</li>
            <li>Description</li>
            <li>Date</li>
            <li>Status</li>
            <li>Date Created</li>
            <li>User ID (automatically linked to the logged-in user)</li>
          </ul>
          <p>
            <strong>Edit and Delete Actions:</strong>
          </p>
          <ul>
            <li>
              <strong>Edit Todo:</strong> Each todo entry includes an "Edit"
              button that opens a modal pre-filled with the existing todo data.
              Users can update the details and either confirm or cancel the
              changes.
            </li>
            <li>
              <strong>Delete Todo:</strong> Users can delete a todo by clicking
              the "Delete" button, which prompts a confirmation modal asking,
              "Are you sure you want to delete this todo?" This ensures that
              todos are not removed accidentally.
            </li>
          </ul>
        </section>

        <p>
          This application is designed to enhance productivity and streamline
          task management for users, providing an intuitive interface for
          managing both personal tasks and user accounts. Thank you for using
          our Todo Application!
        </p>
      </div>
    </main>
  );
};

export default About;
