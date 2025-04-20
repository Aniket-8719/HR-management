import React, { useState } from "react";
import "./Attendance.css";
import { FiMoreVertical } from "react-icons/fi";
import CommonHeader from "../../common/CommonHeader";

const attendanceData = [
  {
    name: "Jane Copper",
    email: "jane.copper@example.com",
    phone: "(704) 555-0127",
    position: "Intern",
    department: "Designer",
    doj: "10/06/13",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    status: "Present"
  },
  {
    name: "Arlene McCoy",
    email: "arlene.mccoy@example.com",
    phone: "(302) 555-0107",
    position: "Full Time",
    department: "Designer",
    doj: "11/07/16",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    status: "Present"
  },
  {
    name: "Cody Fisher",
    email: "deanna.curtis@example.com",
    phone: "(252) 555-0126",
    position: "Senior",
    department: "Backend Development",
    doj: "08/15/17",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    status: "Present"
  },
  {
    name: "Janney Wilson",
    email: "janney.wilson@example.com",
    phone: "(252) 555-0126",
    position: "Junior",
    department: "Backend Development",
    doj: "12/04/17",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    status: "Present"
  },
  {
    name: "Leslie Alexander",
    email: "willie.jennings@example.com",
    phone: "(207) 555-0119",
    position: "Team Lead",
    department: "Human Resource",
    doj: "05/30/14",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    status: "Present"
  },
];

const Attendance = () => {
  const [attendanceList, setAttendanceList] = useState(attendanceData);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Toggle status between Present and Absent
  const toggleStatus = (index) => {
    const updatedAttendance = [...attendanceList];
    updatedAttendance[index].status = updatedAttendance[index].status === "Present" ? "Absent" : "Present";
    setAttendanceList(updatedAttendance);
  };

  // Filter attendees based on status and search query
  const filteredAttendance = attendanceList.filter(emp => {
    const matchesStatus = statusFilter === "All" || emp.status === statusFilter;
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          emp.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          emp.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="employees-container">
      <CommonHeader screenName={"Attendance"} />
      
      {/* Status and Search Component */}
      <div className="status-search-container">
        <div className="attendance-status">
          <div className="status-dropdown">
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="status-select"
            >
              <option value="All">All</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
        </div>
        
        <div className="search-box">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
          
        </div>
      </div>

      <table className="employees-table">
        <thead>
          <tr>
            <th>Profile</th>
            <th>Employee Name</th>
            <th>Email Address</th>
            <th>Phone Number</th>
            <th>Position</th>
            <th>Department</th>
            <th>Date of Joining</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredAttendance.map((emp, index) => (
            <tr key={index}>
              <td>
                <img src={emp.image} alt={emp.name} className="avatar" />
              </td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td 
                className="position-cell" 
                onClick={() => toggleStatus(attendanceList.findIndex(item => item.email === emp.email))}
              >
                {emp.position}
              </td>
              <td>{emp.department}</td>
              <td>{emp.doj}</td>
              <td className={`status-cell ${emp.status.toLowerCase()}`}>
                {emp.status}
              </td>
              <td>
                <FiMoreVertical />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
