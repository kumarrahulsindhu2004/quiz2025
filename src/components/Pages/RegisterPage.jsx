import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/api";
import "./RegisterPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    gender: "",
    mobile: "",
    dateOfBirth: "",
    address: "",
    pinCode: "",
    schoolName: "",
    studentClass: "", // New field
    password: "",
    profilePhoto: null,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setFormData({ ...formData, [name]: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));

      const response = await registerUser(data);
      console.log("✅ Registration response:", response);

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-left">
          <h2>Create Your Account</h2>
          <p>Join the BBMK Quiz Platform and start your learning journey today!</p>
          {error && <div className="error-text">{error}</div>}

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-row">
              <input name="firstName" placeholder="First Name" required onChange={handleChange} />
              <input name="middleName" placeholder="Middle Name" onChange={handleChange} />
            </div>

            <input name="lastName" placeholder="Last Name" required onChange={handleChange} />
            <input name="email" type="email" placeholder="Email" required onChange={handleChange} />

            <div className="gender-group">
              {["Male", "Female", "Other"].map((g) => (
                <label key={g}>
                  <input type="radio" name="gender" value={g} required onChange={handleChange} /> {g}
                </label>
              ))}
            </div>

            <div className="form-row">
              <input name="mobile" type="tel" placeholder="Mobile (10 digits)" required onChange={handleChange} />
              <input name="dateOfBirth" type="date" required onChange={handleChange} />
            </div>

            <input name="address" placeholder="Address" required onChange={handleChange} />
            <input name="pinCode" placeholder="PIN Code" required onChange={handleChange} />
            <input name="schoolName" placeholder="School Name" required onChange={handleChange} />
            <select
  name="studentClass"
  value={formData.studentClass}
  required
  onChange={handleChange}
  className="register-select"
>
  <option value="" disabled>Select Class</option>
  {["6th", "7th", "8th", "9th", "10th", "11th", "12th"].map((cls) => (
    <option key={cls} value={cls}>{cls}</option>
  ))}
</select>

            <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
            <input name="profilePhoto" type="file" accept="image/*" onChange={handleChange} />

            <button type="submit" disabled={loading} className="register-btn">
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>

        <div className="register-right">
          <img
            src="https://img.freepik.com/free-vector/online-registration-concept-illustration_114360-7865.jpg"
            alt="Register Illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
