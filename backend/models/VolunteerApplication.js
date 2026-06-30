import mongoose from "mongoose";

const volunteerApplicationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    dob: Date,

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    address: String,

    baptized: {
      type: Boolean,
      default: false,
    },

    churchMember: {
      type: Boolean,
      default: false,
    },

    attendingSince: String,

    ministries: [
      {
        type: String,
      },
    ],

    availability: {
      type: String,
      enum: ["Weekdays", "Weekends", "Both"],
    },

    preferredService: {
      type: String,
      enum: ["Morning", "Evening", "Both"],
    },

    experience: String,

    skills: String,

    testimony: String,

    emergencyContact: {
      name: String,
      relation: String,
      phone: String,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    reviewedBy: String,

    reviewedAt: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "VolunteerApplication",
  volunteerApplicationSchema
);