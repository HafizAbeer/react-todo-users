import React from "react";
import { Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        background: "linear-gradient(62deg, #3a3d40 0%, #181719 100%)",
        color: "#fff",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: "600px", width: "100%" }}>
        <h1 style={{ fontSize: "10rem", fontWeight: "bold", margin: 0 }}>
          404
        </h1>
        <h2 style={{ fontSize: "2rem", margin: "20px 0" }}>
          Oops! Page Not Found
        </h2>
        <p style={{ fontSize: "1.2rem", margin: "20px 0" }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button
          type="primary"
          size="large"
          icon={<HomeOutlined />}
          style={{
            backgroundColor: "#c21807",
            // borderColor: "#1D976C",
            padding: "10px 20px",
            fontSize: "1rem",
          }}
          onClick={() => (window.location.href = "/home")}
        >
          Go to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
