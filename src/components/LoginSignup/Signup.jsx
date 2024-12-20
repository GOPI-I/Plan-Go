import React from 'react';
import './signup.css';

const SignUp = () => {
  return (
    <div className="signup-section-unique">
      <div className="signup-container-unique">
        <div className="signup-left-unique"></div>
        <div className="signup-right-unique">
          <div className="signup-form-container-unique">
            <h2 className="signup-form-title-unique">Sign Up</h2>
            <form className="signup-form-unique">
              {/* Profile Picture Upload */}
              <div className="signup-form-group-unique profile-picture-group-unique">
                <label htmlFor="profile-picture" className="profile-picture-label-unique">
                  <div className="signup-profile-picture-unique">
                    <span>Upload</span>
                  </div>
                </label>
                <input
                  type="file"
                  id="profile-picture"
                  accept="image/*"
                  className="profile-picture-input-unique"
                />
              </div>
              {/* Name */}
              <div className="signup-form-group-unique">
                <label htmlFor="name" className="signup-label-unique">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  required
                  className="signup-input-unique"
                />
              </div>
              {/* Email */}
              <div className="signup-form-group-unique">
                <label htmlFor="email" className="signup-label-unique">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                  className="signup-input-unique"
                />
              </div>
              {/* Password */}
              <div className="signup-form-group-unique">
                <label htmlFor="password" className="signup-label-unique">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Create a password"
                  required
                  className="signup-input-unique"
                />
              </div>
              {/* Confirm Password */}
              <div className="signup-form-group-unique">
                <label htmlFor="confirm-password" className="signup-label-unique">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm your password"
                  required
                  className="signup-input-unique"
                />
              </div>
              {/* Submit Button */}
              <button type="submit" className="signup-submit-button-unique">
                Sign Up
              </button>
            </form>
            <p className="signup-form-footer-unique">
              Already have an account? <a href="/login" className="signup-link-unique">Log in here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
