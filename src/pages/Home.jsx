import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ maxWidth: 1200, margin: "1.5rem auto", padding: "0 1rem" }}>
      <div className="hero home-hero d-flex align-items-center" style={{ borderRadius: 14 }}>
        <div className="overlay"></div>
        <div className="hero-content container-fluid py-5">
          <div className="row align-items-center">
            <div className="col-md-7">
              <div className="kicker">Placement Portal</div>
              <h1 className="mb-3">Welcome to Innovative Career Success Platform</h1>
              <p className="lead muted">Explore company profiles, hiring roles, interview processes and year-wise placement insights — match your resume to roles and get actionable suggestions to improve.</p>
              <div className="mt-4">
                <Link to="/company" className="btn btn-primary me-2">Explore Companies</Link>
                <Link to="/resume-matcher" className="btn btn-outline-primary">Match Resume</Link>
              </div>
            </div>
            <div className="col-md-5 d-none d-md-block">
              <div className="card feature-card p-3">
                <h6>Fast Actions</h6>
                <ul className="muted small">
                  <li>Filter by department & year</li>
                  <li>Resume suggestions powered by NLP</li>
                  <li>Company-specific requirements & interview questions</li>
                </ul>
                <div className="mt-3">
                  <Link to="/department" className="btn btn-outline-primary btn-sm me-2">Department Insights</Link>
                  <Link to="/student" className="btn btn-outline-secondary btn-sm">My Profile</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section container-fluid">
        <div className="row">
          <div className="col-md-3 col-6 mb-4">
            <div className="stats-card">
              <span className="stats-number">500+</span>
              <span className="stats-label">Placements Secured</span>
            </div>
          </div>
          <div className="col-md-3 col-6 mb-4">
            <div className="stats-card">
              <span className="stats-number">50+</span>
              <span className="stats-label">Hiring Partners</span>
            </div>
          </div>
          <div className="col-md-3 col-6 mb-4">
            <div className="stats-card">
              <span className="stats-number">45 LPA</span>
              <span className="stats-label">Highest Package</span>
            </div>
          </div>
          <div className="col-md-3 col-6 mb-4">
            <div className="stats-card">
              <span className="stats-number">8 LPA</span>
              <span className="stats-label">Average Package</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container-fluid py-5">
        <h2 className="section-title">Why Choose Innovative Career Success Platform?</h2>
        <p className="section-subtitle">We provide end-to-end support for your placement journey, from resume building to interview preparation.</p>

        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="feature-box">
              <div className="feature-icon">🎯</div>
              <h4 className="feature-title">Smart Resume Matcher</h4>
              <p className="feature-text">Our NLP-powered tool analyzes your resume against job descriptions to give you a match score and improvement suggestions.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-box">
              <div className="feature-icon">📊</div>
              <h4 className="feature-title">Real-time Insights</h4>
              <p className="feature-text">Get detailed analytics on department-wise placement trends, company hiring patterns, and salary packages.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-box">
              <div className="feature-icon">🏢</div>
              <h4 className="feature-title">Company Profiles</h4>
              <p className="feature-text">Access comprehensive profiles of top recruiters, including their interview processes, eligibility criteria, and past questions.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="container-fluid py-5 mb-5" style={{ background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)", borderRadius: "16px" }}>
        <div className="row justify-content-center">
          <div className="col-md-10 text-center">
            <div style={{ fontSize: "3rem", color: "#6c757d", marginBottom: "-1rem" }}>❝</div>
            <h3 style={{
              fontSize: "2rem",
              fontWeight: "300",
              lineHeight: "1.6",
              color: "#2c3e50",
              fontStyle: "italic",
              margin: "2rem 0"
            }}>
              "Success is where preparation and opportunity meet."
            </h3>
            <div style={{ width: "60px", height: "3px", background: "#0d6efd", margin: "0 auto 1.5rem" }}></div>
            <h5 style={{ fontWeight: "600", color: "#495057", letterSpacing: "1px" }}>BOBBY UNSER</h5>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <h2 className="cta-title">Ready to Kickstart Your Career?</h2>
        <p className="cta-text">Join thousands of students who are already accelerating their placement journey with Innovative Career Success Platform.</p>
        <Link to="/login" className="btn-light-cta">Get Started Now</Link>
      </div>
    </div >
  );
}
