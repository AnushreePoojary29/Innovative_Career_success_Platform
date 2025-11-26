const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  usn: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  dob: { type: String },
  address: { type: String },

  // Academic & Resume
  university: { type: String },
  degree: { type: String },
  major: { type: String },
  graduationYear: { type: String },
  resumeName: { type: String },
  resumeData: { type: String }, // Base64 string

  // Applications
  applications: [{
    companyId: String,
    companyName: String,
    appliedAt: { type: Date, default: Date.now }
  }],

  // Legacy / Placement fields
  company: { type: String, default: null },
  department: { type: String }, // Made optional
  year: { type: Number }, // Made optional

  // Auth
  eth_address: { type: String, index: true, sparse: true },
  opted_in: { type: Boolean, default: false },
  last_login: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model("PlacedStudent", studentSchema);
