const express = require("express");
const PlacedStudent = require("../models/student.js");

const router = express.Router();

// 1. GET: Students by department
router.get("/department/:dept", async (req, res) => {
  try {
    const dept = req.params.dept.toUpperCase();
    const year = req.query.year ? Number(req.query.year) : undefined;
    const query = { department: dept };
    if (year) query.year = year;
    const results = await PlacedStudent.find(query).sort({ name: 1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 2. POST: Add single student
router.post("/", async (req, res) => {
  try {
    const student = new PlacedStudent(req.body);
    await student.save();
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3. BULK UPLOAD (send an array)
router.post("/bulk", async (req, res) => {
  try {
    const students = req.body;   // array
    await PlacedStudent.insertMany(students);
    res.json({ inserted: students.length });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
