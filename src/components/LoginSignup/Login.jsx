import React from 'react';
import Cube from './Cube';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { NavLink } from 'react-bootstrap';
import './login.css';

const Login = () => {
  return (
    <div className="login-section">
      <div className="login-container">
        <div className="login-left">
          <Canvas camera={{ fov: 15, position: [3, 3, 3] }}>
            <OrbitControls enableZoom={false} autoRotate={false} />
            <ambientLight intensity={1.5} />
            <directionalLight position={[3, 2, 1]} />
            <Cube />
          </Canvas>
        </div>
        <div className="login-right">
          <div className="login-form-container">
            <h2 className="login-form-title">Login</h2>
            <form className="login-form">
              <div className="login-form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="login-form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button type="submit" className="login-submit-button">
                Login
              </button>
            </form>
            <p className="login-form-footer">
              Don't have an account? <a href='/Register'>Register Here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
