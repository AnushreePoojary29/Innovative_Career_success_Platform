// src/data.jsx
// Mock data with correct order: CURRENT_YEAR declared first

export const CURRENT_YEAR = 2025;

// ------------------- STUDENTS -------------------
export const students = [
  // CSE (5 students)
  { id: 1, name: "Riya Sharma", usn: "CS21CS001", semester: 8, department: "CSE", resume: "/resumes/riya_sharma.pdf", appliedCompanies: [
    { company: "Google", role: "SDE", status: "Shortlisted", appliedOn: "2025-02-12" },
    { company: "Infosys", role: "System Engineer", status: "Applied", appliedOn: "2025-01-28" },
    { company: "Microsoft", role: "Software Engineer", status: "Placed", appliedOn: "2025-03-05" },
    { company: "Amazon", role: "SDE Intern", status: "Applied", appliedOn: "2025-04-01" },
    { company: "Facebook", role: "Frontend Developer", status: "Applied", appliedOn: "2025-04-15" }
  ]},
  { id: 2, name: "Aarav Kumar", usn: "CS21CS002", semester: 8, department: "CSE", resume: "/resumes/aarav_kumar.pdf", appliedCompanies: [
    { company: "Amazon", role: "SDE Intern", status: "Placed", appliedOn: "2025-03-10" },
    { company: "Google", role: "SDE", status: "Applied", appliedOn: "2025-02-18" },
    { company: "Infosys", role: "System Engineer", status: "Shortlisted", appliedOn: "2025-02-25" },
    { company: "Tesla", role: "Software Engineer", status: "Applied", appliedOn: "2025-04-05" },
    { company: "Nvidia", role: "AI Engineer", status: "Applied", appliedOn: "2025-04-20" }
  ]},
  { id: 3, name: "Nikhil Singh", usn: "CS21CS003", semester: 8, department: "CSE", resume: "/resumes/nikhil_singh.pdf", appliedCompanies: [
    { company: "Microsoft", role: "Software Engineer", status: "Applied", appliedOn: "2025-03-01" },
    { company: "Google", role: "SDE", status: "Placed", appliedOn: "2025-03-10" },
    { company: "Amazon", role: "SDE Intern", status: "Shortlisted", appliedOn: "2025-04-02" },
    { company: "Adobe", role: "Frontend Engineer", status: "Applied", appliedOn: "2025-04-18" },
    { company: "IBM", role: "Software Developer", status: "Applied", appliedOn: "2025-05-01" }
  ]},
  { id: 4, name: "Priya Nair", usn: "CS21CS004", semester: 8, department: "CSE", resume: "/resumes/priya_nair.pdf", appliedCompanies: [
    { company: "Infosys", role: "System Engineer", status: "Applied", appliedOn: "2025-01-30" },
    { company: "Microsoft", role: "Software Engineer", status: "Shortlisted", appliedOn: "2025-03-05" },
    { company: "Google", role: "SDE", status: "Applied", appliedOn: "2025-02-20" },
    { company: "Facebook", role: "Backend Developer", status: "Applied", appliedOn: "2025-04-10" },
    { company: "Tesla", role: "Embedded Systems Engineer", status: "Applied", appliedOn: "2025-04-25" }
  ]},
  { id: 5, name: "Aditya Mehta", usn: "CS21CS005", semester: 8, department: "CSE", resume: "/resumes/aditya_mehta.pdf", appliedCompanies: [
    { company: "Amazon", role: "SDE Intern", status: "Placed", appliedOn: "2025-03-12" },
    { company: "Google", role: "SDE", status: "Applied", appliedOn: "2025-02-22" },
    { company: "Microsoft", role: "Software Engineer", status: "Shortlisted", appliedOn: "2025-03-08" },
    { company: "Nvidia", role: "AI Engineer", status: "Applied", appliedOn: "2025-04-18" },
    { company: "IBM", role: "Software Developer", status: "Applied", appliedOn: "2025-05-01" }
  ]},

  // ECE (5 students)
  { id: 6, name: "Arjun Patel", usn: "EC21EC001", semester: 8, department: "ECE", resume: "/resumes/arjun_pat.pdf", appliedCompanies: [
    { company: "Qualcomm", role: "Embedded Engineer", status: "Placed", appliedOn: "2025-02-05" },
    { company: "Intel", role: "Hardware Design Engineer", status: "Applied", appliedOn: "2025-03-02" },
    { company: "Google", role: "SDE", status: "Applied", appliedOn: "2025-03-10" },
    { company: "Facebook", role: "Frontend Developer", status: "Applied", appliedOn: "2025-04-01" },
    { company: "Adobe", role: "Frontend Engineer", status: "Applied", appliedOn: "2025-04-15" }
  ]},
  { id: 7, name: "Sneha Reddy", usn: "EC21EC002", semester: 8, department: "ECE", resume: "/resumes/sneha_reddy.pdf", appliedCompanies: [
    { company: "Intel", role: "Hardware Engineer", status: "Shortlisted", appliedOn: "2025-02-10" },
    { company: "Qualcomm", role: "Embedded Engineer", status: "Applied", appliedOn: "2025-02-20" },
    { company: "Amazon", role: "SDE Intern", status: "Placed", appliedOn: "2025-03-05" },
    { company: "Tesla", role: "Software Engineer", status: "Applied", appliedOn: "2025-04-02" },
    { company: "IBM", role: "Software Developer", status: "Applied", appliedOn: "2025-04-18" }
  ]},

  // ISE (5 students)
  { id: 11, name: "Sneha Kapoor", usn: "IS21IS001", semester: 8, department: "ISE", resume: "/resumes/sneha_kapoor.pdf", appliedCompanies: [
    { company: "Infosys", role: "System Engineer", status: "Shortlisted", appliedOn: "2025-01-20" },
    { company: "Qualcomm", role: "Embedded Engineer", status: "Applied", appliedOn: "2025-02-15" },
    { company: "Amazon", role: "SDE Intern", status: "Placed", appliedOn: "2025-03-02" },
    { company: "Facebook", role: "Backend Developer", status: "Applied", appliedOn: "2025-04-05" },
    { company: "Tesla", role: "Embedded Systems Engineer", status: "Applied", appliedOn: "2025-04-18" }
  ]},

  // AI & ML (5 students)
  { id: 16, name: "Meera Joshi", usn: "AI21ML001", semester: 8, department: "AI & ML", resume: "/resumes/meera_joshi.pdf", appliedCompanies: [
    { company: "Amazon", role: "ML Engineer", status: "Placed", appliedOn: "2025-02-22" },
    { company: "Google", role: "AI Researcher", status: "Applied", appliedOn: "2025-03-05" },
    { company: "Nvidia", role: "AI Engineer", status: "Applied", appliedOn: "2025-03-15" },
    { company: "Facebook", role: "Backend Developer", status: "Applied", appliedOn: "2025-04-01" },
    { company: "Tesla", role: "Software Engineer", status: "Applied", appliedOn: "2025-04-12" }
  ]},
];

// ------------------- DEPARTMENTS -------------------
export const departments = [
  {
    name: "CSE",
    currentYear: {
      year: CURRENT_YEAR,
      totalStudents: 135,
      placed: 110,
      highestPackageLPA: 22,
      lowestPackageLPA: 3.8,
      averagePackageLPA: 8.2,
      placementPercentage: 81.48,
      topperPackageLPA: 22,
      companiesVisited: 28
    },
    previousYears: [
      { year: 2024, total: 130, placed: 105, avgPackageLPA: 7.6 },
      { year: 2023, total: 120, placed: 100, avgPackageLPA: 7.2 }
    ]
  },
  {
    name: "ISE",
    currentYear: {
      year: CURRENT_YEAR,
      totalStudents: 90,
      placed: 70,
      highestPackageLPA: 16,
      lowestPackageLPA: 3,
      averagePackageLPA: 6.1,
      placementPercentage: 77.78,
      topperPackageLPA: 16,
      companiesVisited: 18
    },
    previousYears: [
      { year: 2024, total: 85, placed: 65, avgPackageLPA: 5.8 },
      { year: 2023, total: 80, placed: 60, avgPackageLPA: 5.5 }
    ]
  },
  {
    name: "ECE",
    currentYear: {
      year: CURRENT_YEAR,
      totalStudents: 110,
      placed: 82,
      highestPackageLPA: 18,
      lowestPackageLPA: 3.2,
      averagePackageLPA: 6.5,
      placementPercentage: 74.55,
      topperPackageLPA: 18,
      companiesVisited: 22
    },
    previousYears: [
      { year: 2024, total: 108, placed: 80, avgPackageLPA: 6.3 },
      { year: 2023, total: 100, placed: 78, avgPackageLPA: 5.9 }
    ]
  },
  {
    name: "AI & ML",
    currentYear: {
      year: CURRENT_YEAR,
      totalStudents: 50,
      placed: 40,
      highestPackageLPA: 20,
      lowestPackageLPA: 4,
      averagePackageLPA: 10,
      placementPercentage: 80,
      topperPackageLPA: 20,
      companiesVisited: 10
    },
    previousYears: [
      { year: 2024, total: 45, placed: 35, avgPackageLPA: 9 },
      { year: 2023, total: 40, placed: 30, avgPackageLPA: 8.5 }
    ]
  }
];

// ------------------- COMPANIES -------------------
export const companies = {
  currentYear: [
    { id: "g01", name: "Google", role: "SDE", date: "2025-03-21", packageLPA: 24, recruited: 5, requiredSkills: ["DSA", "System Design", "React"], rounds: 3 },
    { id: "i01", name: "Infosys", role: "System Engineer", date: "2025-02-12", packageLPA: 5, recruited: 15, requiredSkills: ["Java", "DBMS"], rounds: 2 },
    { id: "q01", name: "Qualcomm", role: "Embedded Engineer", date: "2025-02-05", packageLPA: 12, recruited: 8, requiredSkills: ["C/C++", "Embedded Systems"], rounds: 3 },
    { id: "m01", name: "Microsoft", role: "Software Engineer", date: "2025-03-05", packageLPA: 20, recruited: 4, requiredSkills: ["C#", "Azure", "React"], rounds: 3 },
    { id: "a01", name: "Amazon", role: "SDE Intern", date: "2025-04-10", packageLPA: 20, recruited: 6, requiredSkills: ["DSA", "Problem Solving", "Operating Systems"], rounds: 4 },
  ],
  upcoming: [
    { id: "fb01", name: "Facebook", roles: ["Frontend Developer", "Backend Developer"], packageLPA: 22, visitDate: "2025-05-01", requiredSkills: ["React", "Node.js", "GraphQL"], rounds: 3 },
    { id: "t01", name: "Tesla", roles: ["Software Engineer", "Embedded Systems Engineer"], packageLPA: 25, visitDate: "2025-05-15", requiredSkills: ["Python", "C++", "Embedded Systems"], rounds: 4 },
    { id: "n01", name: "Nvidia", roles: ["AI Engineer"], packageLPA: 28, visitDate: "2025-05-20", requiredSkills: ["Python", "ML", "CUDA"], rounds: 3 },
    { id: "ad01", name: "Adobe", roles: ["Frontend Engineer"], packageLPA: 21, visitDate: "2025-05-25", requiredSkills: ["React", "JS", "CSS"], rounds: 2 },
    { id: "ibm01", name: "IBM", roles: ["Software Developer"], packageLPA: 19, visitDate: "2025-06-01", requiredSkills: ["Java", "Cloud"], rounds: 3 },
  ],
  alumniStats: [
    { year: 2024, totalPlaced: 320, avgPackageLPA: 7.1, highestLPA: 20 },
    { year: 2023, totalPlaced: 290, avgPackageLPA: 6.8, highestLPA: 18 },
    { year: 2022, totalPlaced: 270, avgPackageLPA: 6.5, highestLPA: 17 },
  ]
};