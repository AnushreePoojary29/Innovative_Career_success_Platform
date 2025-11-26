import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <h5 className="footer-title">Innovative Career Success Platform</h5>
                        <p className="footer-desc">
                            Empowering students with AI-driven placement insights and resume optimization.
                            Your gateway to a successful career starts here.
                        </p>
                    </div>

                    <div className="col-md-2 mb-4">
                        <h6 className="footer-heading">Platform</h6>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/student">Student Dashboard</Link></li>
                            <li><Link to="/company">Companies</Link></li>
                            <li><Link to="/department">Departments</Link></li>
                        </ul>
                    </div>

                    <div className="col-md-2 mb-4">
                        <h6 className="footer-heading">Tools</h6>
                        <ul className="footer-links">
                            <li><Link to="/resume-matcher">Resume Matcher</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </ul>
                    </div>

                    <div className="col-md-4 mb-4">
                        <h6 className="footer-heading">Contact</h6>
                        <ul className="footer-links">
                            <li>Email: sahyadri@edu.in</li>
                            <li>Phone: +91 98765 43210</li>
                            <li>Address: Sahyadri, Mangalore</li>
                        </ul>
                        <div className="social-icons mt-3">
                            <span className="social-icon">🐦</span>
                            <span className="social-icon">📘</span>
                            <span className="social-icon">📸</span>
                            <span className="social-icon">💼</span>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Innovative Career Success Platform Placement Portal. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
