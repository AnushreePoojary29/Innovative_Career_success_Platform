import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

import placed2025 from "../../data/placed_students_2025.json";
import placed2024 from "../../data/placed_students_2024.json";

// Department-wise placement stats (latest)
const DEPT_STATS = {
  "2025": {
    "CS": {
      "eligible": 148,
      "placed": 100,
      "placementRate": "67.57%",
      "highestPackage": "43 LPA",
      "avgPackage": "4.75 LPA"
    },
    "IS": {
      "eligible": 109,
      "placed": 60,
      "placementRate": "55.05%",
      "highestPackage": "43 LPA",
      "avgPackage": "4.75 LPA"
    },
    "AIML": {
      "eligible": 75,
      "placed": 40,
      "placementRate": "53.33%",
      "highestPackage": "43 LPA",
      "avgPackage": "4.75 LPA"
    },
    "EC": {
      "eligible": 47,
      "placed": 26,
      "placementRate": "55.31%",
      "highestPackage": "43 LPA",
      "avgPackage": "4.75 LPA"
    },
    "Cyber Security": {
      "eligible": 32,
      "placed": 18,
      "placementRate": "56.25%",
      "highestPackage": "43 LPA",
      "avgPackage": "4.75 LPA"
    },
    "ME": {
      "eligible": 30,
      "placed": 15,
      "placementRate": "50.00%",
      "highestPackage": "43 LPA",
      "avgPackage": "4.75 LPA"
    }
  },
  "2024": {
    "CS": {
      "eligible": 123,
      "placed": 120,
      "placementRate": "97.56%",
      "highestPackage": "24 LPA",
      "avgPackage": "3.7 LPA"
    },
    "IS": {
      "eligible": 134,
      "placed": 121,
      "placementRate": "90.29%",
      "highestPackage": "24 LPA",
      "avgPackage": "3.7 LPA"
    },
    "AIML": {
      "eligible": 33,
      "placed": 32,
      "placementRate": "96.96%",
      "highestPackage": "24 LPA",
      "avgPackage": "3.7 LPA"
    },
    "EC": {
      "eligible": 40,
      "placed": 30,
      "placementRate": "75.00%",
      "highestPackage": "24 LPA",
      "avgPackage": "3.7 LPA"
    },
    "ME": {
      "eligible": 11,
      "placed": 11,
      "placementRate": "100.00%",
      "highestPackage": "24 LPA",
      "avgPackage": "3.7 LPA"
    }
  }
};

const YEARS = [2025, 2024];
const DEPARTMENTS = ["CS", "IS", "EC", "ME", "Robotics", "AIML"];

export default function DepartmentDashboard() {
  const [selectedYear, setSelectedYear] = useState(YEARS[0]);
  const [selectedDept, setSelectedDept] = useState(DEPARTMENTS[0]);

  // Prepare students list: flatten nested arrays and normalize department names
  const flattenIfNeeded = (arr) => {
    if (!Array.isArray(arr)) return [];
    // If any element is an array, flatten one level
    return arr.some((el) => Array.isArray(el)) ? arr.flat() : arr;
  };
  const normalizeDept = (d) => {
    if (!d) return "";
    const up = String(d).trim().toUpperCase();
    // map common variants to canonical department codes used in UI
    if (up === "CSE" || up.startsWith("COMPUTER")) return "CS";
    if (up === "IS") return "IS";
    // handle combined or variant forms like "CSE-AIML", "AI-ML", "AI & ML"
    if (up.includes("AIML") || up.includes("AI-ML") || up.includes("AI/ML") || up.includes("AI & ML") || up === "AI ML") return "AIML";
    if (up === "EC" || up === "ECE" || up.startsWith("EC")) return "EC";
    if (up === "ME" || up.startsWith("MECH") || up === "MECHANICAL") return "ME";
    return up;
  };

  // Build datasets keyed by year (flatten nested arrays if present)
  const datasetsByYear = {
    2025: flattenIfNeeded(placed2025),
    2024: flattenIfNeeded(placed2024)
  };

  const allStudents = datasetsByYear[selectedYear] || [];

  // Filter students by selected year and department
  // Be tolerant of string/number year formats and department casing/whitespace
  const students = allStudents.filter((s) => {
    const studentYear = Number(s?.year);
    const selectedYearNum = Number(selectedYear);

    const studentDept = normalizeDept(s?.department);
    const selectedDeptNorm = normalizeDept(selectedDept);

    return studentYear === selectedYearNum && studentDept === selectedDeptNorm;
  });


  // Get stats for selected year and department
  const stats =
    DEPT_STATS[selectedYear]?.[selectedDept] ||
    { eligible: "-", placed: "-", placementRate: "-", highestPackage: "-", avgPackage: "-" };

  return (
    <div className="container-fluid">
      {/* Modern Gradient Header */}
      <div className="mb-5">
        <div className="card border-0 shadow-lg" style={{
          background: 'white',
          borderRadius: '20px',
          overflow: 'hidden'
        }}>
          <div className="card-body p-5">
            <div className="d-flex align-items-center mb-2">
              <i className="bi bi-people-fill me-3" style={{ fontSize: '2.5rem', opacity: 0.9 }}></i>
              <h2 className="mb-0 fw-bold" style={{ fontSize: '2.2rem', letterSpacing: '-0.5px' }}>Department Dashboard</h2>
            </div>
            <p className="mb-0" style={{ fontSize: '1.1rem', opacity: 0.95 }}>
              Comprehensive department-wise placement analytics, alumni directory, and performance insights.
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="mb-4">
        <div className="card border-0 shadow-sm" style={{ borderRadius: "16px", padding: "1.5rem" }}>
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div>
              <h5 className="mb-1 fw-bold" style={{ color: "#2d3748" }}>
                <i className="bi bi-funnel me-2 text-primary"></i>
                Filter Analytics
              </h5>
              <p className="text-muted mb-0 small">Select year and department to view detailed insights</p>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <div className="d-flex align-items-center bg-light rounded-pill px-3 py-2">
                <i className="bi bi-calendar3 me-2 text-primary"></i>
                <select
                  className="form-select form-select-sm border-0 bg-transparent"
                  style={{ width: "100px", fontWeight: "600" }}
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                >
                  {YEARS.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <div className="d-flex align-items-center bg-light rounded-pill px-3 py-2">
                <i className="bi bi-building me-2 text-primary"></i>
                <select
                  className="form-select form-select-sm border-0 bg-transparent"
                  style={{ width: "150px", fontWeight: "600" }}
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                >
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="row g-4 mb-5">
        {/* Placement Rate Card */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100" style={{
            borderRadius: "16px",
            backgroundColor: "#e3f2fd",
            transition: "transform 0.3s ease, box-shadow 0.3s ease"
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(33, 150, 243, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
            }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle p-3" style={{ backgroundColor: "#06b6d4" }}>
                  <i className="bi bi-graph-up-arrow text-white" style={{ fontSize: "1.5rem" }}></i>
                </div>
              </div>
              <div className="small text-uppercase fw-semibold mb-1 text-muted" style={{ letterSpacing: "0.5px" }}>Placement Rate</div>
              <div className="h2 fw-bold mb-0" style={{ color: "#0891b2" }}>{stats.placementRate}</div>
            </div>
          </div>
        </div>

        {/* Highest Package Card */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100" style={{
            borderRadius: "16px",
            backgroundColor: "#e3f2fd",
            transition: "transform 0.3s ease, box-shadow 0.3s ease"
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(33, 150, 243, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
            }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle p-3" style={{ backgroundColor: "#06b6d4" }}>
                  <i className="bi bi-trophy-fill text-white" style={{ fontSize: "1.5rem" }}></i>
                </div>
              </div>
              <div className="small text-uppercase fw-semibold mb-1 text-muted" style={{ letterSpacing: "0.5px" }}>Highest Package</div>
              <div className="h2 fw-bold mb-0" style={{ color: "#0891b2" }}>{stats.highestPackage}</div>
            </div>
          </div>
        </div>

        {/* Average Package Card */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100" style={{
            borderRadius: "16px",
            backgroundColor: "#e3f2fd",
            transition: "transform 0.3s ease, box-shadow 0.3s ease"
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(33, 150, 243, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
            }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle p-3" style={{ backgroundColor: "#06b6d4" }}>
                  <i className="bi bi-currency-rupee text-white" style={{ fontSize: "1.5rem" }}></i>
                </div>
              </div>
              <div className="small text-uppercase fw-semibold mb-1 text-muted" style={{ letterSpacing: "0.5px" }}>Average Package</div>
              <div className="h2 fw-bold mb-0" style={{ color: "#0891b2" }}>{stats.avgPackage}</div>
            </div>
          </div>
        </div>

        {/* Students Placed Card */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100" style={{
            borderRadius: "16px",
            backgroundColor: "#e3f2fd",
            transition: "transform 0.3s ease, box-shadow 0.3s ease"
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(33, 150, 243, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
            }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle p-3" style={{ backgroundColor: "#06b6d4" }}>
                  <i className="bi bi-people-fill text-white" style={{ fontSize: "1.5rem" }}></i>
                </div>
              </div>
              <div className="small text-uppercase fw-semibold mb-1 text-muted" style={{ letterSpacing: "0.5px" }}>Students Placed</div>
              <div className="h2 fw-bold mb-0" style={{ color: "#0891b2" }}>{stats.placed}/{stats.eligible}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Placement Stats Chart */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm" style={{ borderRadius: "16px" }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                  <h5 className="mb-1 fw-bold" style={{ color: "#2d3748" }}>
                    <i className="bi bi-bar-chart-fill me-2 text-primary"></i>
                    Placement Statistics Overview
                  </h5>
                  <p className="text-muted mb-0 small">{selectedDept} Department - {selectedYear}</p>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-md-8">
                  <div style={{ height: 300 }}>
                    <Bar
                      data={{
                        labels: [selectedDept],
                        datasets: [
                          {
                            label: "Students Placed",
                            data: [stats.placed],
                            backgroundColor: "#06b6d4",
                            borderRadius: 8
                          },
                          {
                            label: "Total Eligible",
                            data: [stats.eligible],
                            backgroundColor: "#b2ebf2",
                            borderRadius: 8
                          }
                        ]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: "top",
                            labels: {
                              font: { weight: "600", size: 13 },
                              padding: 20
                            }
                          },
                          title: { display: false }
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            grid: {
                              color: "#f0f0f0"
                            },
                            ticks: {
                              font: { size: 12 }
                            }
                          },
                          x: {
                            grid: {
                              display: false
                            },
                            ticks: {
                              font: { size: 13, weight: "600" }
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 rounded" style={{ backgroundColor: "#f8f9fa" }}>
                    <h6 className="fw-bold mb-3" style={{ color: "#2d3748" }}>Quick Stats</h6>
                    <div className="mb-3">
                      <div className="small text-muted mb-1">Total Eligible</div>
                      <div className="h4 fw-bold mb-0" style={{ color: "#06b6d4" }}>{stats.eligible}</div>
                    </div>
                    <div className="mb-3">
                      <div className="small text-muted mb-1">Students Placed</div>
                      <div className="h4 fw-bold mb-0" style={{ color: "#06b6d4" }}>{stats.placed}</div>
                    </div>
                    <div>
                      <div className="small text-muted mb-1">Success Rate</div>
                      <div className="h4 fw-bold mb-0" style={{ color: "#06b6d4" }}>{stats.placementRate}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alumni Directory */}
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm" style={{ borderRadius: "16px" }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                  <h5 className="mb-1 fw-bold" style={{ color: "#2d3748" }}>
                    <i className="bi bi-person-lines-fill me-2 text-primary"></i>
                    Alumni Directory
                  </h5>
                  <p className="text-muted mb-0 small">{selectedDept} Department - {selectedYear}</p>
                </div>
                <div className="d-flex gap-2">
                  {YEARS.map((y) => (
                    <button
                      key={y}
                      className={`btn btn-sm ${selectedYear === y ? "btn-primary" : "btn-outline-primary"}`}
                      onClick={() => setSelectedYear(y)}
                      style={{ borderRadius: "8px", fontWeight: "600" }}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead style={{ backgroundColor: "#f7fafc" }}>
                    <tr>
                      <th className="fw-semibold" style={{ color: "#4a5568", fontSize: "0.85rem" }}>Name</th>
                      <th className="fw-semibold" style={{ color: "#4a5568", fontSize: "0.85rem" }}>Company</th>
                      <th className="fw-semibold" style={{ color: "#4a5568", fontSize: "0.85rem" }}>Email</th>
                      <th className="fw-semibold" style={{ color: "#4a5568", fontSize: "0.85rem" }}>Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.length > 0 ? students.map((s) => (
                      <tr key={s.email} style={{ transition: "background-color 0.2s ease" }}>
                        <td className="fw-semibold" style={{ color: "#2d3748" }}>{s.name}</td>
                        <td>
                          <span className="badge bg-light text-dark" style={{
                            padding: "0.4rem 0.8rem",
                            borderRadius: "8px",
                            fontWeight: "500",
                            border: "1px solid #e2e8f0"
                          }}>
                            {s.company || "-"}
                          </span>
                        </td>
                        <td className="text-muted small">{s.email}</td>
                        <td className="text-muted small">{s.phone}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="4" className="text-center text-muted py-4">
                          <i className="bi bi-inbox fs-1 d-block mb-2 opacity-50"></i>
                          No students found for this selection
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
