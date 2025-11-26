import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5005';

export default function CompanyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/companies/${id}`);
        if (!mounted) return;
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setCompany(data);
      } catch (err) {
        console.error('Failed to load company', err);
        setError('Failed to load company');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <div className="p-3">Loading...</div>;
  if (error) return <div className="p-3 text-danger">{error}</div>;
  if (!company) return <div className="p-3">Company not found</div>;

  // group questions by round
  const questionsByRound = (company.questions || []).reduce((acc, q) => {
    const r = q.round || 1;
    acc[r] = acc[r] || [];
    acc[r].push(q.question);
    return acc;
  }, {});

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>{company.name}</h4>
        <div>
          <button className="btn btn-outline-secondary me-2" onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body">
          <div className="mb-2"><strong>Role Hired:</strong> {company.role || (company.roles && company.roles.join(', ')) || '-'}</div>
          <div className="mb-2"><strong>Package:</strong> {company.packageLPA ? `${company.packageLPA} LPA` : '-'}</div>
          <div className="mb-2"><strong>Visit Date:</strong> {company.visitDate ? new Date(company.visitDate).toLocaleDateString() : '-'}</div>
          <div className="mb-2"><strong>Rounds:</strong> {company.rounds || '-'}</div>
          <div className="mb-2"><strong>Skills:</strong> <span className="fs-5">{company.requiredSkills ? (Array.isArray(company.requiredSkills) ? company.requiredSkills.join(', ') : company.requiredSkills) : '-'}</span></div>

          {company.jobDescription && (
            <div className="mt-4">
              <h5 className="fw-bold">Job Description</h5>
              <p className="mb-0 lead text-dark" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{company.jobDescription}</p>
            </div>
          )}

        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5>Interview Questions</h5>
          {Object.keys(questionsByRound).length === 0 && <div className="small text-muted">No questions available</div>}
          {Object.entries(questionsByRound).sort((a, b) => Number(a[0]) - Number(b[0])).map(([round, qs]) => (
            <div key={round} className="mb-3">
              <strong>Round {round}</strong>
              <ul className="mt-2">
                {qs.map((q, i) => <li key={i}>{q}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
