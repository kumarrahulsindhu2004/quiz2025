import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/api";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    address: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    console.log("Submitting form data:", formData);

    // Optional frontend validation
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      const response = await registerUser(formData);
      console.log("API Response:", response);

      const { token, response: user } = response.data;

      if (!token || !user) {
        setError("Invalid response from server.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(user));

      console.log("Registration successful. Token & user saved.");
      setLoading(false);
      navigate("/login"); // Redirect to login
    } catch (err) {
      setLoading(false);
      console.error("Error during registration:", err);

      if (err.response && err.response.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "24px" }}>Register</h2>

      {error && <div style={errorStyle}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {["name","email","age","mobile","address","password"].map((field) => (
          <input
            key={field}
            type={field === "password" ? "password" : field === "age" ? "number" : "text"}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        ))}

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

// Styles
const containerStyle = {
  maxWidth: "500px",
  margin: "50px auto",
  padding: "24px",
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #cbd5e0",
  outline: "none",
  fontSize: "16px",
};

const buttonStyle = {
  padding: "12px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#2f855a",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "all 0.3s",
};

const errorStyle = {
  color: "red",
  textAlign: "center",
  marginBottom: "16px",
  fontWeight: "500",
};

export default RegisterPage;
