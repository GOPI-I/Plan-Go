import React, { useState } from "react";
import Cube from "./Cube";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        "https://plangobackend.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      const user = response.data.user;
      const token = response.data.token;

      dispatch(
        setUser({
          userId: user.id,
          name: user.name,
          email: email,
        })
      );

      // Store the token for future requests
      localStorage.setItem("authToken", token);

      setSuccessMessage(response.data.msg);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.msg);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <div className="login-section">
      <div className="login-container">
        <div className="login-left">
          <Canvas camera={{ fov: 15, position: [3, 3, 3] }}>
            <OrbitControls enableZoom={false} autoRotate={true} />
            <ambientLight intensity={1.5} />
            <directionalLight position={[3, 2, 1]} />
            <Cube />
          </Canvas>
        </div>
        <div className="login-right">
          <div className="logo mb-3" onClick={() => navigate("/")}>
            Plan<span>go</span>
          </div>

          <div className="login-form-container">
            <h2 className="login-form-title">Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
              <div className="login-form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleInputChange(setEmail)}
                  required
                />
              </div>
              <div className="login-form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handleInputChange(setPassword)}
                  required
                />
              </div>
              {errorMessage && <p className="login-error">{errorMessage}</p>}
              {successMessage && (
                <p className="login-success">{successMessage}</p>
              )}
              <button type="submit" className="login-submit-button">
                Login
              </button>
            </form>
            <p className="login-form-footer">
              Don't have an account?{" "}
              <NavLink to="/register">Register Here</NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
