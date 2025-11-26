// server/scripts/seed_upcoming.js
// Inserts the mock upcoming companies from the frontend `src/data.jsx` into MongoDB
// Usage: node server/scripts/seed_upcoming.js

const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.resolve(process.cwd(), 'server', '.env') });
const Company = require('../models/company');

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('MONGO_URI not set in server/.env');
  process.exit(1);
}

const upcoming = [
  { id: "fb01", name: "Facebook", roles: ["Frontend Developer", "Backend Developer"], packageLPA: 22, visitDate: "2025-05-01T00:00:00Z", requiredSkills: ["React", "Node.js", "GraphQL"], rounds: 3, jobDescription: "" },
  { id: "t01", name: "Tesla", roles: ["Software Engineer", "Embedded Systems Engineer"], packageLPA: 25, visitDate: "2025-05-15T00:00:00Z", requiredSkills: ["Python", "C++", "Embedded Systems"], rounds: 4, jobDescription: "" },
  { id: "n01", name: "Nvidia", roles: ["AI Engineer"], packageLPA: 28, visitDate: "2025-05-20T00:00:00Z", requiredSkills: ["Python", "ML", "CUDA"], rounds: 3, jobDescription: "" },
  { id: "ad01", name: "Adobe", roles: ["Frontend Engineer"], packageLPA: 21, visitDate: "2025-05-25T00:00:00Z", requiredSkills: ["React", "JS", "CSS"], rounds: 2, jobDescription: "" },
  { id: "ibm01", name: "IBM", roles: ["Software Developer"], packageLPA: 19, visitDate: "2025-06-01T00:00:00Z", requiredSkills: ["Java", "Cloud"], rounds: 3, jobDescription: "" }
];

async function run() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    for (const c of upcoming) {
      const visitDate = c.visitDate ? new Date(c.visitDate) : null;
      const exists = await Company.exists({ name: c.name, visitDate: visitDate });
      if (exists) {
        console.log('Skipping existing upcoming:', c.name);
        continue;
      }
      const doc = new Company({
        name: c.name,
        roles: Array.isArray(c.roles) ? c.roles : (String(c.roles || '').split(',').map(s=>s.trim()).filter(Boolean)),
        packageLPA: c.packageLPA || 0,
        jobDescription: c.jobDescription || '',
        visitDate: visitDate,
        requiredSkills: Array.isArray(c.requiredSkills) ? c.requiredSkills : (String(c.requiredSkills || '').split(',').map(s=>s.trim()).filter(Boolean)),
        rounds: c.rounds || 1,
        type: 'upcoming'
      });
      await doc.save();
      console.log('Inserted upcoming:', c.name);
    }

  } catch (err) {
    console.error('Seed error', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected');
  }
}

run();
