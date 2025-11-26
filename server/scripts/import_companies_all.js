// server/scripts/import_companies_all.js
// Run: node server/scripts/import_companies_all.js
// Requires server/.env with MONGO_URI

const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.resolve(process.cwd(), 'server', '.env') });

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('MONGO_URI not set in server/.env');
  process.exit(1);
}

const Company = require('../models/company');

async function importAll() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const dataDir = path.resolve(__dirname, '..', 'data');
    const files = fs.readdirSync(dataDir).filter(f => /^companies_\d{4}\.json$/.test(f));
    if (files.length === 0) {
      console.error('No companies_YYYY.json files found in', dataDir);
      return;
    }

    for (const file of files) {
      const fp = path.join(dataDir, file);
      console.log('Importing', fp);
      const raw = fs.readFileSync(fp, 'utf8');
      let obj;
      try {
        obj = JSON.parse(raw);
      } catch (e) {
        console.warn('Skipping file (invalid JSON):', fp);
        continue;
      }
      const year = obj.year || (file.match(/companies_(\d{4})\.json/) || [])[1];
      const companies = Array.isArray(obj) ? obj : (obj.companies || []);

      const docs = companies.map(c => {
        // Flatten rounds -> questions with numeric round numbers
        let questions = [];
        if (Array.isArray(c.rounds)) {
          c.rounds.forEach((rObj, idx) => {
            const roundNum = idx + 1;
            (rObj.questions || []).forEach(q => questions.push({ round: roundNum, question: String(q) }));
          });
        }
        return {
          name: c.name || c.company || '',
          roles: c.roles ? (Array.isArray(c.roles) ? c.roles : [String(c.role || c.role)]) : (c.role ? [c.role] : []),
          role: c.role || (c.roles && c.roles[0]) || '',
          packageLPA: c.packageLPA || 0,
          jobDescription: c.overview || c.description || '',
          visitDate: year ? new Date(`${year}-01-01T00:00:00Z`) : (c.visitDate ? new Date(c.visitDate) : null),
          requiredSkills: c.requiredSkills || [],
          rounds: (Array.isArray(c.rounds) ? c.rounds.length : (c.rounds || 1)),
          questions,
          type: 'visited',
          createdAt: new Date()
        };
      });

      if (docs.length === 0) {
        console.log('No companies in', file);
        continue;
      }

      // Filter out docs that already exist (match by name + visitDate)
      const toInsert = [];
      for (const d of docs) {
        const exists = await Company.exists({ name: d.name, visitDate: d.visitDate });
        if (!exists) toInsert.push(d);
        else console.log('Skipping existing company', d.name, d.visitDate && d.visitDate.toISOString().slice(0,10));
      }
      if (toInsert.length === 0) {
        console.log('No new companies to insert from', file);
        continue;
      }

      const res = await Company.insertMany(toInsert, { ordered: false });
      console.log(`Inserted ${res.length} companies from ${file}`);
    }

  } catch (err) {
    console.error('Import error', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected');
  }
}

importAll();
