import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import PlacementGraph from '../charts/PlacementGraph';
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5005";
const googleFormLink = "https://docs.google.com/forms/d/e/1FAIpQLSdmbnH6csjqTAleEu29GTRiFeGQQlXKbPcaZU1k2-mXglGn_A/viewform?usp=publish-editor";

export default function CompanyDashboard() {
  const [upcoming, setUpcoming] = useState([]);
  const [showAddUpcoming, setShowAddUpcoming] = useState(false);
  const [newUpcoming, setNewUpcoming] = useState({ name: "", roles: "", packageLPA: "", visitDate: "", requiredSkills: "", rounds: 1, jobDescription: "", registrationLink: "" });
  const [previous, setPrevious] = useState([]);
  const [questionsMap, setQuestionsMap] = useState({});
  const [questionForm, setQuestionForm] = useState({ companyId: null, round: 1, question: "" });
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch upcoming and visited companies from backend on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [uRes, vRes] = await Promise.all([
          fetch(`${API_BASE}/api/companies/upcoming`),
          fetch(`${API_BASE}/api/companies/visited`)
        ]);
        if (!mounted) return;
        if (uRes.ok) {
          const ups = await uRes.json();
          if (Array.isArray(ups) && ups.length > 0) setUpcoming(ups);
        }
        if (vRes.ok) {
          const vis = await vRes.json();
          if (Array.isArray(vis)) setPrevious(vis);
        }
      } catch (err) {
        console.info('Company API not available, using local data', err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Helper to re-fetch visited companies
  async function refreshVisited() {
    try {
      const r = await fetch(`${API_BASE}/api/companies/visited`);
      if (!r.ok) throw new Error('Failed to fetch visited');
      const vis = await r.json();
      if (Array.isArray(vis)) setPrevious(vis);
    } catch (err) {
      console.error('Refresh failed', err);
      alert('Failed to refresh visited companies. Check server.');
    }
  }

  // Add upcoming company
  async function addUpcoming() {
    try {
      const payload = {
        name: newUpcoming.name,
        roles: newUpcoming.roles,
        packageLPA: Number(newUpcoming.packageLPA) || 0,
        jobDescription: newUpcoming.jobDescription || '',
        visitDate: newUpcoming.visitDate,
        requiredSkills: newUpcoming.requiredSkills,
        rounds: Number(newUpcoming.rounds) || 1,
        registrationLink: newUpcoming.registrationLink || '',
      };
      const res = await fetch(`${API_BASE}/api/companies/upcoming`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to save upcoming company');
      const saved = await res.json();
      setUpcoming(u => [saved, ...u]);
      setNewUpcoming({ name: "", roles: "", packageLPA: "", visitDate: "", requiredSkills: "", rounds: 1, jobDescription: "", registrationLink: "" });
      setShowAddUpcoming(false);
    } catch (err) {
      console.error(err);
      alert('Failed to add upcoming company');
    }
  }

  async function handleApply(company) {
    const link = company.registrationLink || company.formLink || googleFormLink;

    // Track application
    try {
      await fetch(`${API_BASE}/api/students/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ companyId: company._id || company.id, companyName: company.name })
      });
    } catch (err) {
      console.error("Failed to track application", err);
    }

    // Open link
    window.open(link, '_blank');
  }

  // Add interview question
  async function addQuestion() {
    if (!questionForm.companyId || !questionForm.question) return;
    const id = questionForm.companyId;
    const looksLikeObjectId = /^[0-9a-fA-F]{24}$/.test(String(id));
    if (looksLikeObjectId) {
      try {
        const res = await fetch(`${API_BASE}/api/companies/${id}/questions`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ round: questionForm.round, question: questionForm.question })
        });
        if (!res.ok) throw new Error('Failed to add question');
        const saved = await res.json();
        setQuestionsMap(m => ({ ...m, [id]: saved }));
      } catch (err) {
        console.error(err);
        alert('Failed to add question to server; saved locally instead');
        setQuestionsMap(m => ({ ...m, [id]: [...(m[id] || []), { round: questionForm.round, question: questionForm.question }] }));
      }
    } else {
      setQuestionsMap(m => ({ ...m, [id]: [...(m[id] || []), { round: questionForm.round, question: questionForm.question }] }));
    }
    setQuestionForm({ companyId: null, round: 1, question: "" });
  }

  // Open details modal for a company and fetch questions
  async function openDetails(company) {
    setSelectedCompany(company);
    const id = company._id || company.id;
    if (!id) return setModalOpen(true);
    try {
      const r = await fetch(`${API_BASE}/api/companies/${id}/questions`);
      if (r.ok) {
        const qs = await r.json();
        setQuestionsMap(m => ({ ...m, [id]: qs }));
      }
    } catch (e) {
      // ignore
    }
    setModalOpen(true);
  }

  // Group visited companies by year
  const visitedByYear = useMemo(() => {
    const map = {};
    (previous || []).forEach(c => {
      const y = c.year || (c.visitDate ? new Date(c.visitDate).getFullYear() : null);
      if (!y) return;
      map[y] = map[y] || [];
      map[y].push(c);
    });
    return map;
  }, [previous]);

  // Years available for selection
  const yearsAvailable = useMemo(() => {
    const set = new Set([2021, 2022, 2023, 2024]);
    Object.keys(visitedByYear).forEach(y => {
      const year = Number(y);
      // Exclude 2019 and 2020
      if (year >= 2021) {
        set.add(year);
      }
    });
    return Array.from(set).sort((a, b) => b - a);
  }, [visitedByYear]);

  // Selected questions for modal
  const selectedCompanyId = selectedCompany ? (selectedCompany._id || selectedCompany.id) : null;
  const selectedQuestions = selectedCompanyId ? (questionsMap[selectedCompanyId] || []) : [];

  return (
    <div className="container-fluid">
      {/* Modern Header with Gradient */}
      <div className="mb-5">
        <div className="card border-0 shadow-lg" style={{
          background: 'white',
          borderRadius: '20px',
          overflow: 'hidden'
        }}>
          <div className="card-body p-5">
            <div className="d-flex align-items-center mb-2">
              <i className="bi bi-building me-3" style={{ fontSize: '2.5rem', opacity: 0.9 }}></i>
              <h2 className="mb-0 fw-bold" style={{ fontSize: '2.2rem', letterSpacing: '-0.5px' }}>Company Dashboard</h2>
            </div>
            <p className="mb-0" style={{ fontSize: '1.1rem', opacity: 0.95 }}>
              Explore upcoming campus drives, discover exciting roles, and review our comprehensive placement history.
            </p>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="mb-1 fw-bold" style={{ color: '#2d3748', fontSize: '1.5rem' }}>
            <i className="bi bi-calendar-check me-2 text-primary"></i>
            Upcoming Companies
          </h4>
          <p className="text-muted mb-0 small">Register for upcoming campus recruitment drives</p>
        </div>
        <div>
          <button
            className="btn btn-primary shadow-sm"
            onClick={() => setShowAddUpcoming(s => !s)}
            style={{ borderRadius: '10px', padding: '0.6rem 1.5rem', fontWeight: '600' }}>
            <i className={`bi bi-${showAddUpcoming ? 'x-lg' : 'plus-lg'} me-2`}></i>
            {showAddUpcoming ? 'Cancel' : 'Add Company'}
          </button>
        </div>
      </div>
      {/* Add upcoming inline form (top-right) */}
      {
        showAddUpcoming && (
          <div className="card mb-3 p-3">
            <div className="row g-2 align-items-end">
              <div className="col-md-3">
                <label className="form-label">Name</label>
                <input className="form-control" value={newUpcoming.name} onChange={e => setNewUpcoming({ ...newUpcoming, name: e.target.value })} />
              </div>
              <div className="col-md-3">
                <label className="form-label">Roles (comma)</label>
                <input className="form-control" value={newUpcoming.roles} onChange={e => setNewUpcoming({ ...newUpcoming, roles: e.target.value })} />
              </div>
              <div className="col-md-2">
                <label className="form-label">Package (LPA)</label>
                <input className="form-control" value={newUpcoming.packageLPA} onChange={e => setNewUpcoming({ ...newUpcoming, packageLPA: e.target.value })} />
              </div>
              <div className="col-md-2">
                <label className="form-label">Visit Date</label>
                <input type="date" className="form-control" value={newUpcoming.visitDate} onChange={e => setNewUpcoming({ ...newUpcoming, visitDate: e.target.value })} />
              </div>
              <div className="col-md-1">
                <label className="form-label">Rounds</label>
                <input type="number" min={1} className="form-control" value={newUpcoming.rounds} onChange={e => setNewUpcoming({ ...newUpcoming, rounds: e.target.value })} />
              </div>
              <div className="col-md-1">
                <button className="btn btn-primary w-100" onClick={addUpcoming}>Add</button>
              </div>
              <div className="col-md-6 mt-3">
                <label className="form-label">Registration Link (Google Form)</label>
                <input className="form-control" placeholder="https://forms.google.com/..." value={newUpcoming.registrationLink} onChange={e => setNewUpcoming({ ...newUpcoming, registrationLink: e.target.value })} />
              </div>
              <div className="col-md-6 mt-3">
                <label className="form-label">Job Description (optional)</label>
                <textarea className="form-control" rows={1} value={newUpcoming.jobDescription} onChange={e => setNewUpcoming({ ...newUpcoming, jobDescription: e.target.value })} />
              </div>
            </div>
          </div>
        )
      }

      <div className="row">
        <div className="col-12">
          <div className="row">
            {upcoming.map(u => (
              <div key={u._id || u.id} className="col-md-4 mb-4">
                <div
                  className="card h-100 border-0 shadow-sm"
                  style={{
                    borderRadius: '16px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(102, 126, 234, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                  }}>
                  <div className="card-body d-flex flex-column p-4">
                    {/* Header with gradient accent */}
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-1 fw-bold" style={{ color: '#2d3748', fontSize: '1.25rem' }}>{u.name}</h5>
                        <div className="d-flex align-items-center text-muted small">
                          <i className="bi bi-calendar3 me-1"></i>
                          {u.visitDate ? (new Date(u.visitDate)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD'}
                        </div>
                      </div>
                      <span className="badge" style={{
                        background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>New</span>
                    </div>

                    {/* Role */}
                    <div className="mb-3">
                      <div className="small text-uppercase fw-semibold text-muted mb-1" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>Role</div>
                      <div className="fw-semibold" style={{ color: "black" }}>{Array.isArray(u.roles) ? u.roles.join(", ") : String(u.roles)}</div>
                    </div>

                    {/* Package & Rounds */}
                    <div className="d-flex gap-3 mb-3">
                      <div className="flex-fill">
                        <div className="d-flex align-items-center p-2 rounded" style={{ backgroundColor: '#f7fafc' }}>
                          <i className="bi bi-currency-rupee text-success me-2"></i>
                          <div>
                            <div className="small text-muted" style={{ fontSize: '0.7rem' }}>Package</div>
                            <div className="fw-bold text-success">{u.packageLPA} LPA</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-fill">
                        <div className="d-flex align-items-center p-2 rounded" style={{ backgroundColor: '#f7fafc' }}>
                          <i className="bi bi-list-ol text-primary me-2"></i>
                          <div>
                            <div className="small text-muted" style={{ fontSize: '0.7rem' }}>Rounds</div>
                            <div className="fw-bold text-primary">{u.rounds}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-3">
                      <div className="small text-uppercase fw-semibold text-muted mb-2" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>Required Skills</div>
                      <div className="d-flex flex-wrap gap-1">
                        {(Array.isArray(u.requiredSkills) ? u.requiredSkills : String(u.requiredSkills).split(',')).slice(0, 4).map((skill, idx) => (
                          <span key={idx} className="badge bg-light text-dark" style={{
                            padding: '0.35rem 0.7rem',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            border: '1px solid #e2e8f0'
                          }}>{skill.trim()}</span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-auto d-flex gap-2">
                      <button
                        className="btn btn-outline-primary flex-fill"
                        onClick={() => handleApply(u)}
                        style={{ borderRadius: '10px', fontWeight: '600', padding: '0.6rem' }}>
                        <i className="bi bi-box-arrow-up-right me-1"></i>
                        Register
                      </button>
                      <button
                        className="btn btn-primary flex-fill"
                        onClick={() => openDetails(u)}
                        style={{
                          borderRadius: '10px',
                          fontWeight: '600',
                          padding: '0.6rem',
                          background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                          border: 'none'
                        }}>
                        <i className="bi bi-info-circle me-1"></i>
                        Details
                      </button>
                    </div>
                  </div>
                </div>

                {/* Details modal (Bootstrap-style) */}
                {modalOpen && selectedCompany && (
                  <div>
                    <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                      <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                          <div className="modal-header bg-primary text-white p-4 border-0">
                            <div>
                              <h4 className="modal-title fw-bold mb-1">{selectedCompany.name}</h4>
                              <div className="opacity-75 small">
                                <i className="bi bi-calendar-event me-2"></i>
                                Visiting on {selectedCompany.visitDate ? (new Date(selectedCompany.visitDate)).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Date TBD'}
                              </div>
                            </div>
                            <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={() => { setModalOpen(false); setSelectedCompany(null); }}></button>
                          </div>
                          <div className="modal-body p-0">
                            <div className="row g-0">
                              {/* Left Sidebar: Key Info */}
                              <div className="col-md-4 bg-light p-4 border-end">
                                <div className="mb-4">
                                  <label className="text-uppercase text-muted small fw-bold mb-2">Package</label>
                                  <div className="h4 text-primary fw-bold mb-0">
                                    {selectedCompany.packageLPA ? `${selectedCompany.packageLPA} LPA` : 'TBD'}
                                  </div>
                                </div>

                                <div className="mb-4">
                                  <label className="text-uppercase text-muted small fw-bold mb-2">Roles Offered</label>
                                  <div>
                                    {selectedCompany.roles && (Array.isArray(selectedCompany.roles) ? selectedCompany.roles : [selectedCompany.role]).map((r, i) => (
                                      <span key={i} className="badge bg-white text-dark border me-1 mb-1">{r}</span>
                                    ))}
                                  </div>
                                </div>

                                <div className="mb-4">
                                  <label className="text-uppercase text-muted small fw-bold mb-2">Selection Process</label>
                                  <div className="d-flex align-items-center">
                                    <div className="bg-white rounded-circle p-2 shadow-sm me-2 text-primary">
                                      <i className="bi bi-layers-fill"></i>
                                    </div>
                                    <span className="fw-bold">{selectedCompany.rounds || 1} Rounds</span>
                                  </div>
                                </div>

                                <div>
                                  <label className="text-uppercase text-muted small fw-bold mb-2">Required Skills</label>
                                  <div className="d-flex flex-wrap gap-1">
                                    {selectedCompany.requiredSkills && (Array.isArray(selectedCompany.requiredSkills) ? selectedCompany.requiredSkills : [selectedCompany.requiredSkills]).map((s, i) => (
                                      <span key={i} className="badge bg-secondary bg-opacity-10 text-secondary border-0">{s}</span>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Right Content: Description & Questions */}
                              <div className="col-md-8 p-4">
                                <h6 className="fw-bold text-dark mb-3 border-bottom pb-2">Job Description</h6>
                                <div className="text-muted mb-4" style={{ lineHeight: '1.6', whiteSpace: 'pre-line' }}>
                                  {selectedCompany.jobDescription || selectedCompany.description || "No detailed description provided."}
                                </div>

                                {selectedQuestions && selectedQuestions.length > 0 && (
                                  <div className="mt-4">
                                    <h6 className="fw-bold text-dark mb-3 border-bottom pb-2">Interview Questions</h6>
                                    <div className="accordion" id="questionsAccordion">
                                      {Object.entries(selectedQuestions.reduce((acc, q) => {
                                        const r = q.round || 1;
                                        acc[r] = acc[r] || [];
                                        acc[r].push(q.question);
                                        return acc;
                                      }, {})).sort((a, b) => Number(a[0]) - Number(b[0])).map(([round, qs]) => (
                                        <div key={round} className="mb-2">
                                          <div className="fw-bold small text-primary mb-1">Round {round}</div>
                                          <ul className="list-group list-group-flush small">
                                            {qs.map((qq, i) => <li key={i} className="list-group-item px-0 py-1 border-0"><i className="bi bi-caret-right-fill text-muted me-1" style={{ fontSize: '10px' }}></i> {qq}</li>)}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer bg-light border-top-0 p-3">
                            <button type="button" className="btn btn-light text-muted" onClick={() => { setModalOpen(false); setSelectedCompany(null); }}>Close</button>
                            <button type="button" className="btn btn-primary px-4 fw-bold shadow-sm" onClick={() => handleApply(selectedCompany)}>
                              Register Now <i className="bi bi-arrow-right ms-1"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Previously Visited Companies */}
          <div className="mt-5">
            <div className="mb-4">
              <div className="card border-0 shadow-sm" style={{
                background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                borderRadius: '16px',
                padding: '2rem'
              }}>
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                  <div>
                    <h4 className="fw-bold mb-1 text-white" style={{ fontSize: '1.75rem' }}>
                      <i className="bi bi-archive me-2"></i>
                      Placement Archives
                    </h4>
                    <p className="text-white mb-0" style={{ opacity: 0.95 }}>
                      Explore past placement records, interview experiences, and company visits by year.
                    </p>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <div className="d-flex align-items-center bg-white bg-opacity-25 rounded-pill px-3 py-2">
                      <span className="text-white small fw-semibold me-2" style={{ letterSpacing: '0.5px' }}>YEAR:</span>
                      <select
                        className="form-select form-select-sm border-0 bg-white shadow-sm"
                        style={{ width: '100px', fontWeight: '600', borderRadius: '8px' }}
                        value={selectedYear || ''}
                        onChange={e => { setSelectedYear(e.target.value ? Number(e.target.value) : null); setSelectedCompany(null); }}
                      >
                        <option value="">Select</option>
                        {yearsAvailable.map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                    <button
                      className="btn btn-light shadow-sm"
                      onClick={refreshVisited}
                      title="Refresh Data"
                      style={{ borderRadius: '10px', padding: '0.5rem 1rem' }}>
                      <i className="bi bi-arrow-clockwise"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {selectedYear ? (
              (visitedByYear[selectedYear] && visitedByYear[selectedYear].length > 0) ? (
                <div className="row g-4">
                  {visitedByYear[selectedYear].map((company, idx) => (
                    <div className="col-md-4 col-lg-3" key={idx}>
                      <div
                        className="card h-100 border-0 shadow-sm"
                        style={{
                          borderRadius: '16px',
                          backgroundColor: "white",
                          transition: "transform 0.3s ease, box-shadow 0.3s ease",
                          cursor: 'pointer',
                          overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-8px)';
                          e.currentTarget.style.boxShadow = '0 12px 28px rgba(6, 182, 212, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                        }}
                      >
                        {/* Gradient Top Border */}
                        <div style={{
                          height: '4px',
                          background: 'white',
                        }}></div>

                        <div className="card-body p-4">
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <h5 className="card-title fw-bold mb-0" style={{ color: '#2d3748', fontSize: '1.1rem' }}>
                              {company.name}
                            </h5>
                            <span className="badge" style={{
                              background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                              padding: '0.35rem 0.7rem',
                              borderRadius: '6px',
                              fontSize: '0.7rem',
                              fontWeight: '600'
                            }}>
                              {selectedYear}
                            </span>
                          </div>

                          {/* Package Display */}
                          {company.packageLPA && (
                            <div className="mb-3 p-2 rounded" style={{ backgroundColor: "white" }}>
                              <div className="d-flex align-items-center">
                                <i className="bi bi-currency-rupee text-success me-2" style={{ fontSize: '1.2rem' }}></i>
                                <div>
                                  <div className="small text-muted" style={{ fontSize: '0.65rem' }}>PACKAGE</div>
                                  <div className="fw-bold text-success" style={{ fontSize: '1.1rem' }}>
                                    {company.packageLPA} LPA
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="mb-3">
                            <div className="small text-uppercase fw-semibold text-muted mb-1" style={{ fontSize: '0.65rem', letterSpacing: '0.5px' }}>
                              Role Hired
                            </div>
                            <div className="fw-semibold" style={{ color: '#4a5568', fontSize: '0.9rem' }}>
                              {company.role || (company.roles && company.roles[0]) || 'N/A'}
                            </div>
                          </div>

                          <div className="mb-3">
                            <div className="small text-uppercase fw-semibold text-muted mb-1" style={{ fontSize: '0.65rem', letterSpacing: '0.5px' }}>
                              Selection Rounds
                            </div>
                            <div className="d-flex align-items-center">
                              <i className="bi bi-list-check text-primary me-2"></i>
                              <span className="fw-bold text-primary">{company.rounds || '-'} Rounds</span>
                            </div>
                          </div>

                          {/* Questions Preview */}
                          <div className="mb-3 p-3 rounded" style={{ backgroundColor: '#fef3c7' }}>
                            <div className="d-flex align-items-center mb-2">
                              <i className="bi bi-chat-left-quote text-warning me-2"></i>
                              <div className="small fw-bold text-dark" style={{ fontSize: '0.7rem' }}>
                                INTERVIEW QUESTIONS
                              </div>
                            </div>
                            {(company.questions || []).length > 0 ? (
                              <div className="small text-dark" style={{ fontSize: '0.75rem' }}>
                                {(company.questions || []).slice(0, 1).map((q, i) => (
                                  <div key={i} className="text-truncate mb-1" title={q.question}>
                                    <i className="bi bi-dot"></i> {q.question}
                                  </div>
                                ))}
                                {(company.questions || []).length > 1 && (
                                  <div className="text-muted fst-italic">
                                    +{(company.questions || []).length - 1} more questions
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="small text-muted fst-italic">No questions yet</div>
                            )}
                          </div>
                        </div>

                        <div className="card-footer bg-white border-top p-3 d-flex gap-2">
                          <button
                            className="btn btn-outline-primary btn-sm flex-grow-1"
                            onClick={() => setQuestionForm({ ...questionForm, companyId: company._id || company.id })}
                            style={{ borderRadius: '10px', fontWeight: '600', fontSize: '0.8rem' }}
                          >
                            <i className="bi bi-plus-circle me-1"></i>
                            Add Q
                          </button>
                          <button
                            className="btn btn-sm flex-grow-1"
                            onClick={() => navigate(`/company/${company._id || company.id}`)}
                            style={{
                              borderRadius: '10px',
                              fontWeight: '600',
                              fontSize: '0.8rem',
                              background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                              border: 'none',
                              color: 'white'
                            }}
                          >
                            <i className="bi bi-eye me-1"></i>
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-5 text-muted bg-light rounded-3">
                  <i className="bi bi-folder2-open fs-1 mb-3 d-block opacity-50"></i>
                  No records found for {selectedYear}.
                </div>
              )
            ) : (
              <div className="text-center py-5 text-muted bg-light rounded-3">
                <i className="bi bi-calendar-range fs-1 mb-3 d-block opacity-50"></i>
                Please select a year to view archives.
              </div>
            )}
          </div>

          {/* Add Question Modal */}
          {
            questionForm.companyId && (
              <div>
                <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content shadow-lg border-0" style={{ borderRadius: '16px' }}>
                      <div className="modal-header border-0 pb-0">
                        <h5 className="modal-title fw-bold">Add Interview Question</h5>
                        <button type="button" className="btn-close" onClick={() => setQuestionForm({ companyId: null, round: 1, question: "" })}></button>
                      </div>
                      <div className="modal-body">
                        <div className="mb-3">
                          <label className="form-label small fw-bold text-uppercase text-muted">Round Number</label>
                          <input
                            type="number"
                            min="1"
                            className="form-control"
                            value={questionForm.round}
                            onChange={e => setQuestionForm({ ...questionForm, round: Number(e.target.value) })}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label small fw-bold text-uppercase text-muted">Question</label>
                          <textarea
                            className="form-control"
                            rows="4"
                            placeholder="e.g., Explain the difference between..."
                            value={questionForm.question}
                            onChange={e => setQuestionForm({ ...questionForm, question: e.target.value })}
                          ></textarea>
                        </div>
                      </div>
                      <div className="modal-footer border-0 pt-0">
                        <button type="button" className="btn btn-light" onClick={() => setQuestionForm({ companyId: null, round: 1, question: "" })}>Cancel</button>
                        <button type="button" className="btn btn-primary px-4 rounded-pill" onClick={addQuestion}>Submit Question</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }

          {/* Placement Overview (2019-2024) */}
          <div className="card mt-5 shadow-sm border-0">
            <div className="card-body p-4">
              <h5 className="card-title fw-bold mb-4">Placement Overview (2019-2024)</h5>
              <PlacementGraph />
            </div>
          </div>
        </div >
      </div >
    </div >
  );
}
