import express from "express";
import {
  createVolunteerApplication,
  getVolunteerApplications,
  getVolunteerApplication,
  updateVolunteerStatus,
  deleteVolunteerApplication,
} from "../controllers/volunteerController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * ============================================
 * Public Routes
 * ============================================
 */

// Submit volunteer application
router.post("/", createVolunteerApplication);

/**
 * ============================================
 * Admin Routes
 * ============================================
 */

// Get all volunteer applications
router.get(
  "/",
  protect,
  authorize("admin"),
  getVolunteerApplications
);

// Get volunteer application by ID
router.get(
  "/:id",
  protect,
  authorize("admin"),
  getVolunteerApplication
);

// Approve / Reject volunteer application
router.put(
  "/:id/status",
  protect,
  authorize("admin"),
  updateVolunteerStatus
);

// Delete volunteer application
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteVolunteerApplication
);

export default router;