import React, { useState } from "react";
import axios from "axios";
import "./signup.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [photo, setPhoto] = useState(null);

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
    setMessage("");
    setError("");
  
    const { name, email, password } = formData;
  
    if (!name || !email || !password) {
      setError("All fields are required");
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
      const response = await axios.post("https://plangobackend.onrender.com/api/auth/register", formDataToSend);
      
      // Successfully created user, set success message
      if (response.data.msg) {
        setMessage(response.data.msg);
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        setPhoto(null);
      } else {
        // Handle unexpected response if needed
        setError("Unexpected response from the server");
      }
    } catch (error) {
      // Handle network or server issues
      if (error.response) {
        setError(error.response.data.msg || "An error occurred");
      } else {
        setError("Server is not responding");
      }
    }
  };
  return (
    <div className="signup-section-unique">
      <div className="signup-container-unique">
        <div className="signup-left-unique"></div>
        <div className="signup-right-unique">
          <div className="signup-form-container-unique">
            <h2 className="signup-form-title-unique">Sign Up</h2>
            {message && <p className="signup-success-unique">{message}</p>}
            {error && <p className="signup-error-unique">{error}</p>}

            <form className="signup-form-unique" onSubmit={handleSubmit}>
              {/* Name Input */}
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

              {/* Email Input */}
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

              {/* Password Input */}
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

              {/* Photo Upload */}
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

              {/* Submit Button */}
              <button type="submit" className="signup-submit-button-unique">
                Sign Up
              </button>
            </form>

            <p className="signup-form-footer-unique">
              Already have an account?{" "}
              <a href="/login" className="signup-link-unique">
                Log in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
