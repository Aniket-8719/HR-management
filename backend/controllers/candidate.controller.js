const Candidate = require("../models/candidate.model");
const Employee = require("../models/employee.model");
const cloudinary = require("../utils/cloudinary");

const allCandidateController = async (req, res) => {
  try {
    const candidates = await Candidate.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      status: "ok",
      message: "All candidates fetched successfully",
      data: candidates,
    });
  } catch (error) {
    console.error(
      `Error in allCandidateController : ${error.stack || error.message}`
    );
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const newCandidateController = async (req, res) => {
  try {
    const { name, email, phone, position, experience } = req.body;

    const resumeFile = req.file;
    if (!resumeFile) {
      return res.status(400).json({
        status: "error",
        message: "Resume file is required and must be a PDF.",
      });
    }

    const isEmailExist = await Candidate.findOne({ email });
    if (isEmailExist) {
      return res.status(400).json({
        status: "error",
        message: "Email already exists",
      });
    }
    const isPhoneExist = await Candidate.findOne({ phone });
    if (isPhoneExist) {
      return res.status(400).json({
        status: "error",
        message: "Phone number already exists",
      });
    }

    const uploadedResume = await cloudinary.uploader.upload(resumeFile.path, {
      resource_type: "raw",
      folder: "resumes", // organized under "resumes" folder
      public_id: `${Date.now()}-${resumeFile.originalname}`,
    });

    const resumeUrl = uploadedResume.secure_url;

    const candidate = await Candidate.create({
      name,
      email,
      phone,
      position,
      experience,
      resume: resumeUrl,
    });

    return res.status(201).json({
      status: "success",
      message: "Candidate created successfully",
      data: candidate,
    });
  } catch (error) {
    console.error(
      `Error in newCandidateController : ${error.stack || error.message}`
    );
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const removeCandidateController = async (req, res) => {
  try {
    const { id } = req.params;
    const candidate = await Candidate.findByIdAndDelete(id).select(
      "-__v -createdAt -updatedAt -status"
    );
    if (!candidate) {
      return res.status(404).json({
        status: "error",
        message: "Candidate not found",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Candidate deleted successfully",
      data: candidate,
    });
  } catch (error) {
    console.error(
      `Error in removeCandidateController : ${error.stack || error.message}`
    );
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const updateCandidateStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log("status: ", status);

    const isSelectedCandidate = await Candidate.findById(id);
      if (isSelectedCandidate.status === "Selected") {
        return res.status(404).json({
          status: "error",
          message: "Candidate is Already Selected",
        });
      }

    const allowedStatus = [
      "New",
      "Scheduled",
      "Ongoing",
      "Selected",
      "Rejected",
    ];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid status value",
      });
    }

    if (status === "Selected") {
      const candidate = await Candidate.findById(id);
      if (!candidate) {
        return res.status(404).json({
          status: "error",
          message: "Candidate not found",
        });
      }

      const employeeExist = await Employee.findOne({ email: candidate.email });
      if (employeeExist) {
        return res.status(400).json({
          status: "error",
          message: "Candidate email already exists in Employee",
        });
      }

      const addToEmployee = await Employee.create({
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        department: "",
        position: candidate.position,
        joiningDate: new Date(),
      });

      return res.status(200).json({
        status: "success",
        message: "Candidate added as Employee",
        data: addToEmployee,
      });
    }

    const candidate = await Candidate.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!candidate) {
      return res.status(404).json({
        status: "error",
        message: "Candidate not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Candidate Status updated",
      data: candidate,
    });
  } catch (error) {
    console.error(
      `Error in updateCandidateController : ${error.stack || error.message}`
    );
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  allCandidateController,
  newCandidateController,
  removeCandidateController,
  updateCandidateStatusController,
};
