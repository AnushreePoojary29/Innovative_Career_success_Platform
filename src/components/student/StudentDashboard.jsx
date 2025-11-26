import React, { useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5005";

export default function StudentDashboard() {
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState(null);
  const [savedStudent, setSavedStudent] = useState(null);
  const [viewing, setViewing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    usn: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    resumeName: "",
    resumeData: null,
    university: "",
    degree: "",
    major: "",
    graduationYear: "",
  });

  useEffect(() => {
    fetch(`${API_BASE}/api/students/me`, { credentials: 'include' })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Not found');
      })
      .then(data => {
        setSavedStudent(data);
        setForm(f => ({
          ...f,
          name: data.name || "",
          usn: data.usn || "",
          email: data.email || "",
          phone: data.phone || "",
          dob: data.dob || "",
          address: data.address || "",
          university: data.university || "",
          degree: data.degree || "",
          major: data.major || "",
          graduationYear: data.graduationYear || "",
          resumeName: data.resumeName || "",
          resumeData: data.resumeData || null,
        }));
      })
      .catch(() => {
        // ignore if not found (new user)
      });
  }, []);

  function onChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleResumeUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onChange('resumeName', file.name);
      onChange('resumeData', reader.result);
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit() {
    setCreating(true);
    setMessage(null);
    try {
      const payload = {
        name: form.name,
        usn: form.usn,
        email: form.email,
        phone: form.phone,
        dob: form.dob,
        address: form.address,
        university: form.university,
        degree: form.degree,
        major: form.major,
        graduationYear: form.graduationYear,
        resumeName: form.resumeName,
        resumeData: form.resumeData,
      };

      const res = await fetch(`${API_BASE}/api/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Save failed (${res.status}) ${text}`);
      }

      const saved = await res.json();
      setSavedStudent(saved);

      setMessage({ type: 'success', text: 'Details saved successfully.' });
      setForm({
        name: "",
        usn: "",
        email: "",
        phone: "",
        dob: "",
        address: "",
        resumeName: "",
        resumeData: null,
        university: "",
        degree: "",
        major: "",
        graduationYear: "",
      });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to save' });
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="container-fluid">
      <div className="hero student-hero mb-4" style={{ borderRadius: 12 }}>
        <div className="overlay"></div>
        <div className="hero-content p-4">
          <h3 className="mb-0">Student Dashboard</h3>
          <div className="muted">Manage your profile, upload resumes and track application history.</div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card shadow-lg border-0" style={{ borderRadius: "16px", overflow: "hidden" }}>
            <div className="card-header bg-white border-bottom p-4">
              <h5 className="mb-0 fw-bold text-primary">Profile Management</h5>
            </div>
            <div className="card-body p-4">

              {/* Basic Details Section */}
              <h6 className="text-uppercase text-muted small fw-bold mb-3">Basic Information</h6>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Full Name</label>
                  <input className="form-control" placeholder="John Doe" value={form.name} onChange={(e) => onChange('name', e.target.value)} />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">USN</label>
                  <input className="form-control" placeholder="4XX..." value={form.usn} onChange={(e) => onChange('usn', e.target.value)} />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Email</label>
                  <input className="form-control" placeholder="student@example.com" value={form.email} onChange={(e) => onChange('email', e.target.value)} />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Phone</label>
                  <input className="form-control" placeholder="+91 98765..." value={form.phone} onChange={(e) => onChange('phone', e.target.value)} />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Date of Birth</label>
                  <input type="date" className="form-control" value={form.dob} onChange={(e) => onChange('dob', e.target.value)} />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Graduation Year</label>
                  <input className="form-control" placeholder="2025" value={form.graduationYear} onChange={(e) => onChange('graduationYear', e.target.value)} />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-bold">Address</label>
                  <textarea className="form-control" rows="2" placeholder="Your permanent address" value={form.address} onChange={(e) => onChange('address', e.target.value)}></textarea>
                </div>
              </div>

              <hr className="my-4" style={{ opacity: 0.1 }} />

              {/* Academic Details Section */}
              <h6 className="text-uppercase text-muted small fw-bold mb-3">Academic Details</h6>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold">University / College</label>
                  <input className="form-control" value={form.university} onChange={(e) => onChange('university', e.target.value)} />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-bold">Degree</label>
                  <select className="form-select" value={form.degree} onChange={(e) => onChange('degree', e.target.value)}>
                    <option value="">Select...</option>
                    <option value="BE">B.E</option>
                    <option value="BTech">B.Tech</option>
                    <option value="MTech">M.Tech</option>
                    <option value="MCA">MCA</option>
                    <option value="MBA">MBA</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-bold">Major / Branch</label>
                  <input className="form-control" placeholder="CS, IS, EC..." value={form.major} onChange={(e) => onChange('major', e.target.value)} />
                </div>
              </div>

              <hr className="my-4" style={{ opacity: 0.1 }} />

              {/* Resume Section */}
              <h6 className="text-uppercase text-muted small fw-bold mb-3">Resume</h6>
              <div className="p-3 bg-light rounded-3 border border-dashed text-center">
                <div className="mb-2 text-muted">
                  <i className="bi bi-cloud-upload fs-3"></i>
                </div>
                <input type="file" id="resume-upload" className="d-none" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} />
                <label htmlFor="resume-upload" className="btn btn-outline-primary btn-sm">
                  {form.resumeName ? 'Change Resume' : 'Upload Resume'}
                </label>
                {form.resumeName && <div className="small text-success mt-2 fw-bold"><i className="bi bi-check-circle me-1"></i> {form.resumeName}</div>}
                {!form.resumeName && <div className="small text-muted mt-2">Supported formats: PDF, DOCX</div>}
              </div>

              {/* Actions */}
              <div className="d-flex align-items-center justify-content-end mt-4 pt-2">
                <button className="btn btn-light text-muted me-2" onClick={() => setForm({ name: '', usn: '', email: '', phone: '', dob: '', address: '', resumeName: '', resumeData: null, university: '', degree: '', major: '', graduationYear: '' })}>Reset</button>
                <button className="btn btn-primary px-4 fw-bold" onClick={handleSubmit} disabled={creating} style={{ borderRadius: "8px" }}>
                  {creating ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Saving...
                    </>
                  ) : 'Save Profile'}
                </button>
              </div>

              {message && (
                <div className={`alert alert-${message.type === 'error' ? 'danger' : 'success'} mt-3 mb-0 py-2 small fw-bold`} role="alert">
                  {message.text}
                </div>
              )}
            </div>
          </div>

          {/* View Saved Details */}
          {savedStudent && (
            <div className="mt-4 text-center">
              <button className="btn btn-link text-decoration-none" onClick={() => setViewing(!viewing)}>
                {viewing ? 'Hide Saved Details' : 'View Saved Details'}
              </button>
            </div>
          )}

          {viewing && savedStudent && (
            <div className="card mt-3 shadow-sm border-0" style={{ borderRadius: "16px" }}>
              <div className="card-body p-4">
                <h5 className="mb-4 fw-bold text-dark">Saved Profile</h5>

                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="p-3 bg-light rounded-3 h-100">
                      <h6 className="text-uppercase text-muted small fw-bold mb-3">Personal Info</h6>
                      <div className="mb-2"><span className="text-muted small d-block">Name</span> <strong>{savedStudent.name}</strong></div>
                      <div className="mb-2"><span className="text-muted small d-block">USN</span> <strong>{savedStudent.usn}</strong></div>
                      <div className="mb-2"><span className="text-muted small d-block">Email</span> <strong>{savedStudent.email}</strong></div>
                      <div className="mb-0"><span className="text-muted small d-block">Phone</span> <strong>{savedStudent.phone}</strong></div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-3 bg-light rounded-3 h-100">
                      <h6 className="text-uppercase text-muted small fw-bold mb-3">Academic & Resume</h6>
                      <div className="mb-2"><span className="text-muted small d-block">College</span> <strong>{savedStudent.university}</strong></div>
                      <div className="mb-2"><span className="text-muted small d-block">Degree</span> <strong>{savedStudent.degree} in {savedStudent.major}</strong></div>
                      <div className="mb-0"><span className="text-muted small d-block">Resume</span>
                        {savedStudent.resumeData ? (
                          <a href={savedStudent.resumeData} download={savedStudent.resumeName} className="text-primary text-decoration-none fw-bold">
                            <i className="bi bi-download me-1"></i> Download {savedStudent.resumeName}
                          </a>
                        ) : <span className="text-muted">Not uploaded</span>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Applications Section */}
                {savedStudent.applications && savedStudent.applications.length > 0 && (
                  <div className="mt-4">
                    <h6 className="text-uppercase text-muted small fw-bold mb-3">My Applications</h6>
                    <div className="table-responsive">
                      <table className="table table-hover border">
                        <thead className="table-light">
                          <tr>
                            <th>Company</th>
                            <th>Applied Date</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {savedStudent.applications.map((app, idx) => (
                            <tr key={idx}>
                              <td className="fw-bold">{app.companyName}</td>
                              <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
                              <td><span className="badge bg-success">Registered</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
