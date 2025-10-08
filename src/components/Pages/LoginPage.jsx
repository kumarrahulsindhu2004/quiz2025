import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext); // ✅ Add this
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);(false);

  // Handle input changes
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle login submit
   const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    console.log("Logging in with:", formData); // DEBUG

   try {
      const response = await loginUser(formData);
      console.log("Login API response:", response);

      const { token, user } = response.data;
      if (!token || !user) throw new Error("Invalid response");

      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user); // ✅ update global state

      navigate("/"); // ✅ redirect to home
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.error || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "24px" }}>Login</h2>

      {error && <div style={errorStyle}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

// Styles
const containerStyle = {
  maxWidth: "400px",
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
  backgroundColor: "#3182ce",
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

export default LoginPage;
