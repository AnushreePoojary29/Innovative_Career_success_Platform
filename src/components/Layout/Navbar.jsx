import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FaBookOpen } from "react-icons/fa";

const Navbar = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const goToLogin = () => navigate("/login");

  return (
    <>
      <header className="navbar-header">
        <div className="container-fluid d-flex align-items-center justify-content-between">

          {/* LEFT — Logo Area */}
          <div className="d-flex align-items-center gap-3">
            <div style={{
              background: "#0f172a",
              padding: "0.6rem",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <FaBookOpen style={{ fontSize: "1.25rem", color: "white" }} />
            </div>
            <div>
              <h4 className="navbar-title">Innovative Career Success Platform</h4>
              <small className="navbar-tagline">
                Your Gateway to a Successful Career!
              </small>
            </div>
          </div>

          {/* RIGHT — Login / Logout */}
          <div className="nav-buttons d-flex align-items-center">
            {auth.isAuthenticated && (
              <div className="d-flex align-items-center me-3">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${auth.address || 'user'}`}
                  alt="Profile"
                  style={{ width: 36, height: 36, borderRadius: '50%', marginRight: 10, border: '2px solid white', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', backgroundColor: '#eef2f7' }}
                />
              </div>
            )}

            {!auth.isAuthenticated ? (
              <button className="btn-login" onClick={goToLogin}>
                Login
              </button>
            ) : (
              <button className="btn-logout" onClick={auth.logout}>
                Logout
              </button>
            )}

          </div>

        </div>
      </header>

      <style jsx>{`
        .navbar-header {
          background: white;
          padding: 0.6rem 1.25rem;
          border-bottom: 1px solid rgba(15,23,42,0.04);
          box-shadow: 0 6px 18px rgba(15,23,42,0.06);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .navbar-title {
          margin: 0;
          color: #0f1724;
          font-weight: 800;
          letter-spacing: 0.2px;
        }

        .navbar-tagline {
          font-size: 0.85rem;
          color: #6b7280;
        }

        .nav-buttons button {
          padding: 8px 16px;
          border-radius: 10px;
          border: 1px solid rgba(15,23,42,0.06);
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          background: white;
          color: #0f1724;
        }

        .btn-login {
          background: linear-gradient(90deg, #0b6ea8, #1f7fbf);
          color: white;
          border: none;
          box-shadow: 0 8px 18px rgba(15,23,42,0.06);
        }

        .btn-logout {
          background: linear-gradient(90deg, #ef4444, #dc2626);
          color: white;
          border: none;
        }
      `}</style>
    </>
  );
};

export default Navbar;
