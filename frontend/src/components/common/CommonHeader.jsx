// import React from "react";
// import { CgProfile } from "react-icons/cg";
// import { FiBell, FiMail } from "react-icons/fi";
// import { MdExpandMore } from "react-icons/md";

// import "./CommonHeader.css";

// // Accept `screenName` as a prop
// const CommonHeader = ({ screenName }) => {
//   return (
//     <div className="header-container">
//       <h1 className="title">{screenName}</h1>
//       <div className="actions">
//         <FiMail className="icon" />
//         <FiBell className="icon" />
//         <CgProfile className="icon" />
//         <MdExpandMore className="icon" />
//       </div>
//     </div>
//   );
// };

// export default CommonHeader;


import React from "react";
import { FiBell, FiMail } from "react-icons/fi";
import { MdExpandMore } from "react-icons/md";
import "./CommonHeader.css";

const CommonHeader = ({ screenName }) => {
  return (
    <div className="header-container">
      <h1 className="title">{screenName}</h1>
      <div className="actions">
        <FiMail className="icon" />
        <FiBell className="icon" />
        <div className="profile-icon">
          <img 
            src="https://randomuser.me/api/portraits/women/1.jpg" 
            alt="Profile" 
            className="avatar" 
          />
          <MdExpandMore className="icon expand-icon" />
        </div>
      </div>
    </div>
  );
};

export default CommonHeader;
