// import React from 'react';
// import './logoutPopup.css';

// const LogoutPopup = ({ onCancel, onLogout }) => {
//   return (
//     <div className={styles.logOutPopUp}>
//       <div className={styles.rectangle55}>
//         <div className={styles.rectangle56}>
//           <div className={styles.logOut}>Log Out</div>
//         </div>
//         <div className={styles.confirmationText}>
//           Are you sure you want to log out?
//         </div>
//         <div className={styles.buttonContainer}>
//           <button 
//             className={styles.cancelButton} 
//             onClick={onCancel}
//           >
//             Cancel
//           </button>
//           <button 
//             className={styles.logoutButton} 
//             onClick={onLogout}
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LogoutPopup;

import React, { useEffect } from 'react';
import './logoutPopup.css';  // Regular import without 'styles'
import { clearError, logout } from '../../../actions/userAction';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const LogoutPopup = ({ onCancel, onLogout }) => {
  const { user, isAuthenticated, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(logout()); // Trigger logout action
    toast.success("Logged out successfully"); // Show success message
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [dispatch, error, isAuthenticated, navigate]);
  return (
    <div className="logOutPopUp">
      <div className="rectangle55">
        <div className="rectangle56">
          <div className="logOut">Log Out</div>
        </div>
        <div className="confirmationText">
          Are you sure you want to log out?
        </div>
        <div className="buttonContainer">
          <button 
            className="cancelButton" 
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            className="logoutButton" 
            onClick={logoutUser}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;