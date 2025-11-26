// server/scripts/import_companies_2024.js
// Run with: node server/scripts/import_companies_2024.js
// Requires: set MONGO_URI in env or have server/.env with MONGO_URI

const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.resolve(process.cwd(), 'server', '.env') });

const MONGO_URI = process.env.MONGO_URI || process.env.MONGO || process.env.DATABASE_URL;
if (!MONGO_URI) {
  console.error('MONGO_URI not set in environment. Set it or add server/.env');
  process.exit(1);
}

const Company = require('../models/company');

async function run() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const filePath = path.resolve(__dirname, '..', 'data', 'companies_2024.json');
    if (!fs.existsSync(filePath)) {
      console.error('Data file not found:', filePath);
      process.exit(1);
    }

    const raw = fs.readFileSync(filePath, 'utf8');
    const docs = JSON.parse(raw);

    // Normalize each doc: ensure visitDate is Date and questions are in expected shape
    const toInsert = docs.map(d => {
      const copy = Object.assign({}, d);
      if (copy.visitDate) copy.visitDate = new Date(copy.visitDate);
      if (!Array.isArray(copy.questions)) copy.questions = [];
      copy.questions = copy.questions.map(q => ({ round: Number(q.round) || 1, question: String(q.question || '') }));
      return copy;
    });

    // Insert many, ignore duplicates (no unique key by default)
    const res = await Company.insertMany(toInsert, { ordered: false });
    console.log('Inserted', res.length, 'companies');
  } catch (err) {
    console.error('Import error', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();
