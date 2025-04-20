// AddLeaveModal.jsx
import React, { useState } from 'react';
import './leaves.css';

const AddLeaveModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    employeeName: '',
    designation: '',
    leaveDate: '',
    reason: '',
    documents: null
  });


  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'documents') {
      setFormData({
        ...formData,
        [name]: files[0] || null
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  console.log(formData)
    
    onSave(formData);
    setFormData({
      employeeName: '',
      designation: '',
      leaveDate: '',
      reason: '',
      documents: null
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Leave</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <div className="input-with-icon">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  name="employeeName"
                  placeholder="Search Employee Name"
                  value={formData.employeeName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="designation"
                placeholder="Designation*"
                value={formData.designation}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
                <div className="input-with-icon date-input">
                <input
                    type="date"
                    name="leaveDate"
                    placeholder="Leave Date*"
                    value={formData.leaveDate}
                    onChange={handleChange}
                    required
                />
                <span className="calendar-icon">📅</span>
                </div>
            </div>

            <div className="form-group">
                <div className="input-with-icon document-input">
                <input
                    type="file"
                    name="documents"
                    onChange={handleChange}
                />
                <span className="upload-icon">⬆️</span>
                </div>
            </div>
            </div>


          <div className="form-row">
            <div className="form-group full-width">
              <input
                type="text"
                name="reason"
                placeholder="Reason*"
                value={formData.reason}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row form-actions">
            <button type="submit" className="save-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeaveModal;
