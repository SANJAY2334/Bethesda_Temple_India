import VolunteerApplication from "../models/VolunteerApplication.js";

//
// Create Volunteer Application
//
export const createVolunteerApplication = async (req, res) => {
  try {
    const application = await VolunteerApplication.create(req.body);

    res.status(201).json({
      success: true,
      message: "Volunteer application submitted successfully.",
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// Get All Applications (Admin)
//
export const getVolunteerApplications = async (req, res) => {
  try {
    const applications = await VolunteerApplication.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// Get Single Application
//
export const getVolunteerApplication = async (req, res) => {
  try {
    const application = await VolunteerApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// Update Status (Approve / Reject)
//
export const updateVolunteerStatus = async (req, res) => {
  try {
    const application = await VolunteerApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    application.status = req.body.status;
    application.reviewedAt = new Date();

    await application.save();

    res.status(200).json({
      success: true,
      message: "Application updated successfully.",
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
// Delete Application
//
export const deleteVolunteerApplication = async (req, res) => {
  try {
    const application = await VolunteerApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    await application.deleteOne();

    res.status(200).json({
      success: true,
      message: "Application deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};