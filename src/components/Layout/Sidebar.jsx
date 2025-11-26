import React from "react";
import { NavLink } from "react-router-dom";
import { FaUserGraduate, FaBuilding, FaIndustry, FaHome } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="sidebar d-flex flex-column">
      <h4 className="mb-4">Placement Portal</h4>
      <nav className="nav flex-column">
        <NavLink to="/" className="nav-link mb-2" end>
          <FaHome /> <span className="ms-2">Home</span>
        </NavLink>
        <NavLink to="/student" className={({isActive}) => `nav-link mb-2 ${isActive ? 'active' : ''}`}>
          <FaUserGraduate /> <span className="ms-2">Student Dashboard</span>
        </NavLink>
        <NavLink to="/department" className={({isActive}) => `nav-link mb-2 ${isActive ? 'active' : ''}`}>
          <FaBuilding /> <span className="ms-2">Department Dashboard</span>
        </NavLink>
        <NavLink to="/company" className={({isActive}) => `nav-link mb-2 ${isActive ? 'active' : ''}`}>
          <FaIndustry /> <span className="ms-2">Company Dashboard</span>
        </NavLink>
        <NavLink to="/resume-matcher" className="nav-link mb-2">
  <FaUserGraduate /> <span className="ms-2">Resume Matcher</span>
</NavLink>
      </nav>
      <div className="mt-auto small mt-4">
        <div>© {new Date().getFullYear()}</div>
      </div>
    </aside>
  );
};

export default Sidebar;
