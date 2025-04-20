// import React from 'react';
// import './register.css';
// import onboardingImage from '../assets/Frame 29'

// const UserRegistration = () => {
//   return (
//     <div className="user-registration">
//       <div className="frame-31">
//         {/* Onboarding Section */}
//         <div className="onboarding">
//           <div className="rectangle-50"></div>
//           <div className="frame-29">
//             <img 
//               className="rectangle-77" 
//             src= {onboardingImage} 
//               alt="Onboarding Illustration" 
//             />
//             <div className="text">
//               <div className="lorem-ipsum">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
//               </div>
//               <div className="tempor-incididunt">
//                 tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
//                 veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
//                 ea commodo consequat.
//               </div>
//             </div>
//             <div className="scroll">
//               <div className="ellipse-27"></div>
//               <div className="ellipse-28"></div>
//               <div className="ellipse-29"></div>
//             </div>
//           </div>
//         </div>

//         {/* Registration Form Section */}
//         <div className="user-registration-form">
//           <div className="rectangle-49"></div>
//           <div className="content">
//             <h1 className="welcome-to-dashboard">Welcome to Dashboard</h1>
            
//             <div className="frame-9">
//               {/* Full Name Field */}
//               <div className="form-field">
//                 <label className="field-label">
//                   <span>Full name</span>
//                   <span className="required">*</span>
//                 </label>
//                 <div className="input-field">
//                   <input type="text" placeholder="Full name" />
//                 </div>
//               </div>

//               {/* Email Field */}
//               <div className="form-field">
//                 <label className="field-label">
//                   <span>Email Address</span>
//                   <span className="required">*</span>
//                 </label>
//                 <div className="input-field">
//                   <input type="email" placeholder="Email Address" />
//                 </div>
//               </div>

//               {/* Password Field */}
//               <div className="form-field">
//                 <label className="field-label">
//                   <span>Password</span>
//                   <span className="required">*</span>
//                 </label>
//                 <div className="input-field password-field">
//                   <input type="password" placeholder="Password" />
//                   <button className="toggle-password">
//                     <img src="/assets/icon-eye.svg" alt="Toggle password visibility" />
//                   </button>
//                 </div>
//               </div>

//               {/* Confirm Password Field */}
//               <div className="form-field">
//                 <label className="field-label">
//                   <span>Confirm Password</span>
//                   <span className="required">*</span>
//                 </label>
//                 <div className="input-field password-field">
//                   <input type="password" placeholder="Confirm Password" />
//                   <button className="toggle-password">
//                     <img src="/assets/icon-eye.svg" alt="Toggle password visibility" />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <button className="register-button">
//               <span>Register</span>
//             </button>

//             <p className="login-link">
//               Already have an account? <a href="/login">Login</a>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Logo */}
//       <div className="logo">
//         <div className="rectangle-2"></div>
//         <div className="logo-text">LOGO</div>
//       </div>
//     </div>
//   );
// };

// export default UserRegistration;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import onboardingImage from "../../../assets/image1.png";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration data:', formData);
    // After successful registration
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <div className="auth-frame">
        {/* Onboarding Section */}
        <div className="auth-onboarding">
          <div className="onboarding-background"></div>
          <div className="onboarding-content">
            <img src={onboardingImage} alt="Onboarding" className="onboarding-image" />
            <div className="onboarding-text">
              <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
              <p>tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
            </div>
            <div className="scroll-indicator">
              <span className="active"></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="auth-form-section">
          <div className="form-container">
            <h2>Welcome to Dashboard</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name <span className="required">*</span></label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address <span className="required">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                />
              </div>

              <div className="form-group">
                <label>Password <span className="required">*</span></label>
                <div className="password-input">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                  />
                  <button type="button" className="toggle-password">
                    👁️
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Confirm Password <span className="required">*</span></label>
                <div className="password-input">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    required
                  />
                  <button type="button" className="toggle-password">
                    👁️
                  </button>
                </div>
              </div>

              <button type="submit" className="auth-button">
                Register
              </button>

              <p className="auth-switch">
                Already have an account? <button type="button" onClick={() => navigate('/login')}>Login</button>
              </p>
            </form>
          </div>
        </div>
      </div>

      <div className="auth-logo">
        <div className="logo-box"></div>
        <span>LOGO</span>
      </div>
    </div>
  );
};

export default Register;