#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function usage(){
  console.log('Usage: node scripts/merge_placed_students.js </absolute/path/to/placed_students_2025_combined.json>');
  process.exit(1);
}

const srcArg = process.argv[2];
if(!srcArg) usage();

const sourcePath = path.resolve(srcArg);
const destPath = path.resolve(__dirname, '../src/data/placed_students_2025.json');

if(!fs.existsSync(sourcePath)){
  console.error('Source file not found:', sourcePath);
  process.exit(2);
}

function loadJson(p){
  try{
    return JSON.parse(fs.readFileSync(p,'utf8'));
  }catch(e){
    console.error('Failed to read/parse JSON file:', p, e.message);
    process.exit(3);
  }
}

const incoming = loadJson(sourcePath);
if(!Array.isArray(incoming)){
  console.error('Expected an array of student objects in the source file');
  process.exit(4);
}

let existing = [];
if(fs.existsSync(destPath)){
  existing = loadJson(destPath);
  if(!Array.isArray(existing)) existing = [];
}

// Normalization helpers
const DEPT_MAP = {
  'INFORMATION SCIENCE': 'IS',
  'INFORMATION_SCIENCE': 'IS',
  'IS': 'IS',
  'CS': 'CS',
  'COMPUTER SCIENCE': 'CS',
  'COMPUTER_SCIENCE': 'CS',
  'AIML': 'AIML',
  'AI/ML': 'AIML',
  'EC': 'EC',
  'ELECTRONICS': 'EC',
  'ME': 'ME',
  'MECHANICAL': 'ME',
  'CYBER SECURITY': 'Cyber Security',
  'ROBOTICS': 'Robotics'
};

function normalizeDept(d){
  if(!d && d!==0) return d;
  let s = String(d).trim();
  if(s.length===0) return s;
  const up = s.toUpperCase();
  if(DEPT_MAP[up]) return DEPT_MAP[up];
  // try to pick first letters of words (quick heuristic)
  if(/COMPUTER/.test(up)) return 'CS';
  if(/INFORMATION/.test(up)) return 'IS';
  if(/MECHANICAL|ME\b/.test(up)) return 'ME';
  if(/ROBOT/.test(up)) return 'Robotics';
  return s; // fallback
}

function normalizeYear(y){
  if(typeof y === 'number') return y;
  if(typeof y === 'string' && /^\d{4}$/.test(y.trim())) return Number(y.trim());
  return y;
}

function normalizeStudent(s){
  const out = Object.assign({}, s);
  if(out.name) out.name = String(out.name).trim();
  if(out.email) out.email = String(out.email).trim().toLowerCase();
  if(out.phone) out.phone = String(out.phone).replace(/[^0-9+]/g,'');
  if(out.department) out.department = normalizeDept(out.department);
  if(out.year) out.year = normalizeYear(out.year);
  return out;
}

// normalize both arrays
const normIncoming = incoming.map(normalizeStudent);
const normExisting = existing.map(normalizeStudent);

// merge by unique key: prefer email if present, otherwise name+phone
const map = new Map();

function keyFor(s){
  if(s.email) return 'email:' + s.email;
  if(s.name && s.phone) return 'namephone:' + (s.name+'|'+s.phone);
  return 'name:' + (s.name || JSON.stringify(s));
}

for(const s of normExisting) {
  map.set(keyFor(s), s);
}

for(const s of normIncoming){
  const k = keyFor(s);
  const prev = map.get(k) || {};
  // merge: incoming fields overwrite empties in prev
  const merged = Object.assign({}, prev, s);
  map.set(k, merged);
}

const mergedArray = Array.from(map.values());

// Optional: sort by department then name
mergedArray.sort((a,b)=>{
  if(a.department === b.department) return (a.name||'').localeCompare(b.name||'');
  return String(a.department||'').localeCompare(String(b.department||''));
});

// backup existing
if(fs.existsSync(destPath)){
  const bak = destPath + '.bak.' + Date.now();
  fs.copyFileSync(destPath, bak);
  console.log('Existing file backed up to', bak);
}

fs.writeFileSync(destPath, JSON.stringify(mergedArray, null, 2), 'utf8');
console.log('Merged', mergedArray.length, 'student records written to', destPath);
