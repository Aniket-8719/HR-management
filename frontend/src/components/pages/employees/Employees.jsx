import React, { useState, useRef, useEffect } from "react";
import "./Employees.css";
import { FiMoreVertical, FiChevronDown, FiSearch, FiCalendar, FiX } from "react-icons/fi";
import CommonHeader from "../../common/CommonHeader";

const employees = [
  {
    name: "Jane Copper",
    email: "jane.copper@example.com",
    phone: "(704) 555-0127",
    position: "Intern",
    department: "Designer",
    doj: "10/06/13",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "Arlene McCoy",
    email: "arlene.mccoy@example.com",
    phone: "(302) 555-0107",
    position: "Full Time",
    department: "Designer",
    doj: "11/07/16",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "Cody Fisher",
    email: "deanna.curtis@example.com",
    phone: "(252) 555-0126",
    position: "Senior",
    department: "Backend Development",
    doj: "08/15/17",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    name: "Janney Wilson",
    email: "janney.wilson@example.com",
    phone: "(252) 555-0126",
    position: "Junior",
    department: "Backend Development",
    doj: "12/04/17",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    name: "Leslie Alexander",
    email: "willie.jennings@example.com",
    phone: "(207) 555-0119",
    position: "Team Lead",
    department: "Human Resource",
    doj: "05/30/14",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];

// Position options for dropdown
const positionOptions = ["All Positions", "Intern", "Junior", "Full Time", "Senior", "Team Lead"];

const Employees = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState("Position");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionMenuIndex, setActionMenuIndex] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    dateOfJoining: "",
  });
  
  const dropdownRef = useRef(null);
  const actionMenuRef = useRef(null);
  const calendarRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
        setActionMenuIndex(null);
      }
      
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  const handlePositionSelect = (position) => {
    setSelectedPosition(position);
    setIsDropdownOpen(false);
  };
  
  const toggleActionMenu = (index) => {
    setActionMenuIndex(actionMenuIndex === index ? null : index);
  };
  
  const handleEdit = (employee) => {
    setFormData({
      fullName: employee.name,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      position: employee.position,
      dateOfJoining: employee.doj,
    });
    setIsEditModalOpen(true);
    setActionMenuIndex(null);
  };
  
  const handleDelete = () => {
    // Handle delete functionality
    setActionMenuIndex(null);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    setIsEditModalOpen(false);
  };
  
  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${String(date.getFullYear()).slice(2)}`;
    setFormData({
      ...formData,
      dateOfJoining: formattedDate,
    });
    setIsCalendarOpen(false);
  };
  
  const renderCalendar = () => {
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(monthStart);
    const endDate = new Date(monthEnd);
    
    // Adjust start date to begin from the first day of the week (Sunday)
    startDate.setDate(startDate.getDate() - startDate.getDay());
    
    // Ensure we have a complete last week
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
    
    const weeks = [];
    let days = [];
    let day = new Date(startDate);
    
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = new Date(day);
        days.push({
          date: cloneDay,
          currentMonth: day.getMonth() === currentDate.getMonth(),
          isToday: day.toDateString() === new Date().toDateString(),
          isSelected: selectedDate && day.toDateString() === selectedDate.toDateString(),
        });
        day.setDate(day.getDate() + 1);
      }
      weeks.push(days);
      days = [];
    }
    
    return (
      <div className="calendar-container" ref={calendarRef}>
        <div className="calendar-header">
          <span className="calendar-title">
            {`${currentDate.toLocaleString('default', { month: 'long' })}, ${currentDate.getFullYear()}`}
          </span>
          <div className="calendar-nav">
            <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}>
              &lt;
            </button>
            <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}>
              &gt;
            </button>
          </div>
        </div>
        <div className="calendar-grid">
          {weekdays.map((day) => (
            <div key={day} className="calendar-weekday">{day}</div>
          ))}
          {weeks.flat().map((day, index) => (
            <div
              key={index}
              className={`calendar-day ${day.currentMonth ? 'current-month' : 'other-month'} ${day.isToday ? 'current' : ''} ${day.isSelected ? 'selected' : ''}`}
              onClick={() => day.currentMonth && handleDateSelect(day.date)}
            >
              {day.date.getDate()}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="employees-container">
      <CommonHeader screenName={"Employees"} />
      
      {/* Filter Section */}
      <div className="filters-container">
        {/* Position Dropdown */}
        <div className="position-dropdown" ref={dropdownRef}>
          <button className="position-button" onClick={toggleDropdown}>
            <span>{selectedPosition}</span>
            <FiChevronDown className="dropdown-icon" />
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              {positionOptions.map((position, index) => (
                <div 
                  key={index} 
                  className="dropdown-item"
                  onClick={() => handlePositionSelect(position)}
                >
                  {position}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Table */}
      <div className="employees-table-container">
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={index}>
                <td>
                  <img src={emp.image} alt={emp.name} className="avatar" />
                </td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.position}</td>
                <td>{emp.department}</td>
                <td>{emp.doj}</td>
                <td className="action-cell">
                  <FiMoreVertical 
                    className="action-icon" 
                    onClick={() => toggleActionMenu(index)}
                  />
                  {actionMenuIndex === index && (
                    <div className="action-menu" ref={actionMenuRef}>
                      <div className="action-item" onClick={() => handleEdit(emp)}>Edit</div>
                      <div className="action-item" onClick={handleDelete}>Delete</div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3 className="modal-title">Edit Employee Details</h3>
              <button className="modal-close" onClick={() => setIsEditModalOpen(false)}>
                <FiX />
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      className="form-control"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Department</label>
                    <input
                      type="text"
                      name="department"
                      className="form-control"
                      value={formData.department}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Position</label>
                    <select
                      name="position"
                      className="form-select"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Position</option>
                      {positionOptions.slice(1).map((position, index) => (
                        <option key={index} value={position}>
                          {position}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date of Joining</label>
                    <div className="date-input">
                      <input
                        type="text"
                        name="dateOfJoining"
                        value={formData.dateOfJoining}
                        onChange={handleInputChange}
                        onClick={toggleCalendar}
                        readOnly
                        required
                      />
                      <FiCalendar className="calendar-icon" />
                      {isCalendarOpen && renderCalendar()}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn-save">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;







