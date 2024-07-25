import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import "./App.scss";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Components/pages/Auth/Login";
import Register from "./Components/pages/Auth/Register";
import ForgotPassword from "./Components/pages/Auth/ForgotPassword";
import Home from "./Components/pages/Frontend/Home";
import About from "./Components/pages/Frontend/About";
import Contact from "./Components/pages/Frontend/Contact";
import Todos from "./Components/pages/Frontend/Todos";
import AddTodo from "./Components/pages/Frontend/AddTodo";
import Users from "./Components/pages/Frontend/Users";
import NotFound from "./Components/pages/Frontend/NotFound";
import AuthContextProvider from "./contexts/AuthContext";

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <Main />
      </AuthContextProvider>
    </Router>
  );
};

const Main = () => {
  const location = useLocation();
  const isAuthRoute =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgotpassword";

  return (
    <>
      {!isAuthRoute && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/addTodo" element={<AddTodo />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<NotFound />} />{" "}
      </Routes>
      {!isAuthRoute && <Footer />}
    </>
  );
};

export default App;
