import React, { useState } from "react";
import "./Candidates.css"; // Make sure to include your CSS file
import CommonHeader from "../../common/CommonHeader";

const Candidates = () => {
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: "Jane Copper",
      email: "jane.copper@example.com",
      phone: "(704) 555-0127",
      position: "Designer Intern",
      status: "New",
      experience: 0,
    },
    {
      id: 2,
      name: "Jacob William",
      email: "jacob.william@example.com",
      phone: "(252) 555-0111",
      position: "Senior Developer",
      status: "New",
      experience: "1+",
    },
    {
      id: 3,
      name: "Guy Hawkins",
      email: "kenzi.lawson@example.com",
      phone: "(907) 555-0101",
      position: "Human Resource Lead",
      status: "New",
      experience: "3+",
    },
    {
      id: 4,
      name: "Arlene McCoy",
      email: "arlene.mccoy@example.com",
      phone: "(302) 555-0107",
      position: "Full Time Designer",
      status: "Selected",
      experience: "2+",
    },
    {
      id: 5,
      name: "Leslie Alexander",
      email: "willie.jennings@example.com",
      phone: "(207) 555-0119",
      position: "Full Time Developer",
      status: "Rejected",
      experience: 0,
    },
  ]);

  const [statusOpen, setStatusOpen] = useState(false);
  const [positionOpen, setPositionOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  
  // Add new candidate modal state
  const [showModal, setShowModal] = useState(false);
  const [newCandidate, setNewCandidate] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    resume: null,
    agree: false
  });

  const toggleStatus = () => {
    setStatusOpen(!statusOpen);
    if (positionOpen) setPositionOpen(false);
  };

  const togglePosition = () => {
    setPositionOpen(!positionOpen);
    if (statusOpen) setStatusOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCandidate(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    setNewCandidate(prev => ({
      ...prev,
      resume: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create new candidate object
    const candidate = {
      id: candidates.length + 1,
      name: newCandidate.fullName,
      email: newCandidate.email,
      phone: newCandidate.phone,
      position: newCandidate.position,
      status: "New",
      experience: newCandidate.experience
    };
    
    // Add to candidates array
    setCandidates([...candidates, candidate]);
    
    // Reset form and close modal
    setNewCandidate({
      fullName: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      resume: null,
      agree: false
    });
    setShowModal(false);
  };

  // For menu dropdown
  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  
  const toggleActionMenu = (id) => {
    if (actionMenuOpen === id) {
      setActionMenuOpen(null);
    } else {
      setActionMenuOpen(id);
    }
  };

  // Custom chevron icon component
  const ChevronDown = () => (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="chevron-icon"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );

  // Custom search icon component
  const SearchIcon = () => (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="search-icon"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );

  // Custom upload icon component
  const UploadIcon = () => (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="upload-icon"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="17 8 12 3 7 8"></polyline>
      <line x1="12" y1="3" x2="12" y2="15"></line>
    </svg>
  );

  // Custom close icon component
  const CloseIcon = () => (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="close-icon"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

  // Custom more icon component
  const MoreIcon = () => (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="more-icon"
    >
      <circle cx="12" cy="12" r="1"></circle>
      <circle cx="12" cy="5" r="1"></circle>
      <circle cx="12" cy="19" r="1"></circle>
    </svg>
  );

  return (
    <div className="container">
      <main className="main">
        <CommonHeader screenName={"Candidates"} />
        
        {/* Candidate Filter Section */}
        <div className="candidate-filter">
          {/* Status Dropdown */}
          <div className="filter-dropdown">
            <button onClick={toggleStatus} className="filter-button">
              <span>Status</span>
              <ChevronDown />
            </button>
            {statusOpen && (
              <div className="dropdown-menu">
                <ul>
                  <li>All Status</li>
                  <li>New</li>
                  <li>Selected</li>
                  <li>Rejected</li>
                </ul>
              </div>
            )}
          </div>

          {/* Position Dropdown */}
          <div className="filter-dropdown">
            <button onClick={togglePosition} className="filter-button">
              <span>Position</span>
              <ChevronDown />
            </button>
            {positionOpen && (
              <div className="dropdown-menu">
                <ul>
                  <li>All Positions</li>
                  <li>Designer</li>
                  <li>Developer</li>
                  <li>Human Resource</li>
                </ul>
              </div>
            )}
          </div>

          {/* Search Box with improved spacing */}
          <div className="search-container" style={{ marginLeft: '20px', marginRight: '20px' }}>
            <div className="search-box">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>

          {/* Add Candidate Button */}
          <button className="add-button" onClick={() => setShowModal(true)}>
            Add Candidate
          </button>
        </div>

        {/* Candidates Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Sr no.</th>
                <th>Candidates Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Position</th>
                <th>Status</th>
                <th>Experience</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((c, i) => (
                <tr key={c.id}>
                  <td>{String(i + 1).padStart(2, "0")}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.position}</td>
                  <td>
                    <div className={`status-pill ${c.status.toLowerCase()}`}>
                      <select defaultValue={c.status}>
                        <option value="New">New</option>
                        <option value="Selected">Selected</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </td>
                  <td>{c.experience}</td>
                  <td className="action-cell">
                    <div className="action-menu-container">
                      <button 
                        className="action-button"
                        onClick={() => toggleActionMenu(c.id)}
                      >
                        <MoreIcon />
                      </button>
                      {actionMenuOpen === c.id && (
                        <div className="action-menu">
                          <ul>
                            <li>Download Resume</li>
                            <li>Delete Candidate</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add New Candidate Modal with dynamic save button */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Add New Candidate</h2>
                <button className="close-button" onClick={() => setShowModal(false)}>
                  <CloseIcon />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name*</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={newCandidate.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address*</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={newCandidate.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number*</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={newCandidate.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="position">Position*</label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      value={newCandidate.position}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="experience">Experience*</label>
                    <input
                      type="text"
                      id="experience"
                      name="experience"
                      value={newCandidate.experience}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="resume">Resume*</label>
                    <div className="file-input">
                      <input
                        type="file"
                        id="resume"
                        name="resume"
                        onChange={handleFileChange}
                        required
                        className="hidden-file-input"
                      />
                      <div className="file-input-label">
                        <span>{newCandidate.resume ? newCandidate.resume.name : "Upload Resume"}</span>
                        <UploadIcon />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="agree"
                    name="agree"
                    checked={newCandidate.agree}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="agree">I hereby declare that the above information is true to the best of my knowledge and belief</label>
                </div>
                <div className="form-actions">
                  <button 
                    type="submit" 
                    className={newCandidate.agree ? "save-button active" : "save-button disabled"}
                    disabled={!newCandidate.agree}
                    style={{
                      backgroundColor: newCandidate.agree ? "#3f0071" : "#ccc",
                      cursor: newCandidate.agree ? "pointer" : "not-allowed"
                    }}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Candidates;
