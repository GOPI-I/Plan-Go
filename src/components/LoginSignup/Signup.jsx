import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./signup.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password } = formData;

    if (!name || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("email", email);
    formDataToSend.append("password", password);
    if (photo) {
      formDataToSend.append("photo", photo);
    }

    try {
      const response = await axios.post(
        "https://plangobackend.onrender.com/api/auth/register",
        formDataToSend
      );

      if (response.data.msg) {
        alert("Registered successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        setPhoto(null);

        if (response.data.token) {
          localStorage.setItem("jwtToken", response.data.token);
        }

        navigate("/login");
      } else {
        toast.error("Unexpected response from the server");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg || "An error occurred");
      } else {
        toast.error("Server is not responding");
      }
    }
  };

  return (
    <div className="signup-section-unique">
      <div className="signup-container-unique">
        <div className="signup-left-unique"></div>
        <div className="signup-right-unique">
          <div className="signup-form-container-unique">
            <div className="logo-text mb-3" onClick={() => navigate("/")}>
              Plan<span>go</span>
            </div>

            <h2 className="signup-form-title-unique">Sign Up</h2>

            {error && <p className="signup-error-unique">{error}</p>}

            <form className="signup-form-unique" onSubmit={handleSubmit}>
              <div className="signup-form-group-unique">
                <label htmlFor="name" className="signup-label-unique">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="signup-input-unique"
                />
              </div>

              <div className="signup-form-group-unique">
                <label htmlFor="email" className="signup-label-unique">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="signup-input-unique"
                />
              </div>

              <div className="signup-form-group-unique">
                <label htmlFor="password" className="signup-label-unique">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="signup-input-unique"
                />
              </div>

              <div className="signup-form-group-unique">
                <label htmlFor="photo" className="signup-label-unique">
                  Upload Photo (Optional)
                </label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  onChange={handleFileChange}
                  className="signup-input-unique"
                />
              </div>

              <button type="submit" className="signup-submit-button-unique">
                Sign Up
              </button>
            </form>

            <p className="signup-form-footer-unique">
              Already have an account?{" "}
              <NavLink to="/login">Log in Here</NavLink>
            </p>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default SignUp;
