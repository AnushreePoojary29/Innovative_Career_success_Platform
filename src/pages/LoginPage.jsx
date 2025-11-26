import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";

export default function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("student"); // 'student' or 'officer'
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  // Form states for officer
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleStudentLogin = async () => {
    setLoading(true);
    try {
      await auth.loginWithMetaMask();
      navigate('/');
    } catch (err) {
      alert('Login failed: ' + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  const handleOfficerLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Common Validation for both Login and Sign Up
      if (!email.endsWith("@sahyadri.edu.in")) {
        throw new Error("Access restricted. Only @sahyadri.edu.in emails are allowed.");
      }

      if (isSignUp) {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match.");
        }
        await auth.signupBasic(email, password);
      } else {
        await auth.loginBasic(email, password);
      }
      navigate('/');
    } catch (err) {
      alert('Authentication failed: ' + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page" style={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      background: "#f8fafc", // Solid light background
      fontFamily: "'Inter', sans-serif",
    }}>

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem"
      }}>

        <div className="card shadow-2xl" style={{
          maxWidth: "720px", // Increased by 50% from 480px
          width: "100%",
          borderRadius: "24px",
          overflow: "hidden",
          border: "none",
          background: "#0f172a", // Dark Blue Background matching sidebar
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        }}>
          <div className="row g-0">
            <div className="col-12">
              {/* Header */}
              <div className="p-5 text-center border-bottom" style={{ borderColor: "rgba(255,255,255,0.1)" }}>

                <h2 className="fw-bold mb-2" style={{ color: "white", fontSize: "1.8rem", letterSpacing: "-0.5px" }}>Welcome Back</h2>
                <p className="mb-0" style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem" }}>Sign in to access the Portal</p>
              </div>

              {/* Tabs */}
              <div className="d-flex border-bottom" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <button
                  className={`btn flex-grow-1 rounded-0 py-4 fw-bold transition-all`}
                  style={{
                    background: activeTab === 'student' ? '#1e293b' : 'transparent',
                    border: 'none',
                    borderBottom: activeTab === 'student' ? '4px solid #3b82f6' : '4px solid transparent',
                    color: activeTab === 'student' ? 'white' : 'rgba(255,255,255,0.5)',
                    fontSize: "1.1rem",
                    letterSpacing: "0.5px"
                  }}
                  onClick={() => setActiveTab('student')}
                >
                  Student Login
                </button>
                <button
                  className={`btn flex-grow-1 rounded-0 py-4 fw-bold transition-all`}
                  style={{
                    background: activeTab === 'officer' ? '#1e293b' : 'transparent',
                    border: 'none',
                    borderBottom: activeTab === 'officer' ? '4px solid #3b82f6' : '4px solid transparent',
                    color: activeTab === 'officer' ? 'white' : 'rgba(255,255,255,0.5)',
                    fontSize: "1.1rem",
                    letterSpacing: "0.5px"
                  }}
                  onClick={() => setActiveTab('officer')}
                >
                  Placement Officer
                </button>
              </div>

              {/* Content */}
              <div className="p-5" style={{ background: "#0f172a" }}>
                {activeTab === 'student' ? (
                  <div className="text-center py-5">
                    <p className="mb-5" style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.2rem", lineHeight: "1.6" }}>
                      Connect your wallet to access your student dashboard securely.
                    </p>
                    <button
                      className="btn w-100 py-4 fw-bold d-flex align-items-center justify-content-center gap-3 shadow-lg hover-scale"
                      onClick={handleStudentLogin}
                      disabled={loading}
                      style={{
                        borderRadius: "16px",
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        fontSize: "1.2rem",
                        transition: "transform 0.2s ease"
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                      onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
                    >
                      {loading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      ) : (
                        <>
                          <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" width="32" height="32" />
                          Connect with MetaMask
                        </>
                      )}
                    </button>
                    <div className="mt-5" style={{ fontSize: "1rem", color: "rgba(255,255,255,0.6)" }}>
                      New here? <a href="https://metamask.io" target="_blank" rel="noreferrer" className="text-decoration-none fw-bold" style={{ color: "#60a5fa" }}>Install MetaMask</a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleOfficerLogin} className="py-2">
                    <div className="mb-4">
                      <label className="form-label fw-bold mb-2" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>Email Address</label>
                      <input
                        type="email"
                        className="form-control form-control-lg border-0"
                        placeholder="officer@sahyadri.edu.in"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                          fontSize: "1.1rem",
                          padding: "1rem 1.25rem",
                          borderRadius: "12px",
                          background: "#1e293b",
                          color: "white"
                        }}
                      />
                      {isSignUp && <div className="form-text mt-2" style={{ color: "rgba(255,255,255,0.5)" }}>Must use an @sahyadri.edu.in email</div>}
                    </div>
                    <div className="mb-5">
                      <label className="form-label fw-bold mb-2" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>Password</label>
                      <input
                        type="password"
                        className="form-control form-control-lg border-0"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                          fontSize: "1.1rem",
                          padding: "1rem 1.25rem",
                          borderRadius: "12px",
                          background: "#1e293b",
                          color: "white"
                        }}
                      />
                    </div>

                    {isSignUp && (
                      <div className="mb-5">
                        <label className="form-label fw-bold mb-2" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>Confirm Password</label>
                        <input
                          type="password"
                          className="form-control form-control-lg border-0"
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          style={{
                            fontSize: "1.1rem",
                            padding: "1rem 1.25rem",
                            borderRadius: "12px",
                            background: "#1e293b",
                            color: "white"
                          }}
                        />
                      </div>
                    )}

                    <button
                      type="submit"
                      className="btn w-100 py-4 fw-bold shadow-lg"
                      disabled={loading}
                      style={{
                        borderRadius: "16px",
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        fontSize: "1.2rem",
                        transition: "all 0.3s ease"
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 10px 20px -10px rgba(0,0,0,0.3)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "";
                      }}
                    >
                      {loading ? (isSignUp ? 'Creating Account...' : 'Signing in...') : (isSignUp ? 'Create Account' : 'Sign In')}
                    </button>

                    <div className="text-center mt-5">
                      <button
                        type="button"
                        className="btn btn-link text-decoration-none p-0"
                        onClick={() => {
                          setIsSignUp(!isSignUp);
                          setEmail("");
                          setPassword("");
                          setConfirmPassword("");
                        }}
                        style={{ fontSize: "1rem", color: "rgba(255,255,255,0.6)" }}
                      >
                        {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
