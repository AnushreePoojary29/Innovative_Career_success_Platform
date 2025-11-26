const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  round: { type: Number, default: 1 },
  question: String,
  createdAt: { type: Date, default: Date.now }
});

const CompanySchema = new mongoose.Schema({
  name: String,
  roles: [String],
  // optional singular role hired for visited companies
  role: String,
  packageLPA: Number,
  // optional free-text job description to show in the frontend modal
  jobDescription: String,
  registrationLink: String,
  visitDate: Date,
  requiredSkills: [String],
  rounds: Number,
  type: { type: String, enum: ['upcoming', 'visited'], default: 'upcoming' },
  questions: [QuestionSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Company', CompanySchema);
