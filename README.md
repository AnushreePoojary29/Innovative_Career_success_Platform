# Innovative Career Success Platform — README

## 🚀 Overview

The Innovative Career Success Platform is a unified web application designed to streamline placement activities between students, departments, and companies.
The platform includes three dashboards and an integrated AI-based Resume Matcher.

## ✨ Features Implemented

### 1. 🔐 Login & Authentication

**Student Login (MetaMask Integration)**

*   Students log in using MetaMask wallet authentication.
*   The placement officer pre-registers student wallet addresses in the backend.
*   **During login:**
    *   Wallet address is fetched from MetaMask.
    *   System validates whether the address exists in the database.
    *   Only approved students gain access to the student dashboard.

**Placement Officer Login**

*   Traditional email/password login.
*   Officers access department & company dashboards.

### 2. 🎓 Student Dashboard

**Implemented modules:**

*   Student personal profile view.
*   Resume upload and storage.
*   View stored details once submitted.
*   List of companies the student has applied for.
*   Company application status tracking.

**Backend Flow:**

*   Student details stored in database via REST APIs.
*   Fetch APIs return personalized data for each logged-in student.

### 3. 🏢 Company Dashboard

**Functionalities implemented for placement officers:**

*   **Add upcoming company recruitment details:**
    *   Role
    *   CTC
    *   Eligibility
    *   Hiring rounds
    *   Dates
*   Students can register/apply for these companies.
*   **Year-wise archive of companies that previously visited:**
    *   Job roles
    *   Packages
    *   Interview process
    *   Interview questions

**Backend handles:**

*   CRUD operations for company postings.
*   Student registrations linked to company listings.

### 4. 🏫 Department Dashboard

**Functionalities implemented:**

*   Year-wise department placement statistics.
*   **Year-wise alumni directory with:**
    *   Name
    *   Current company
    *   Job role
    *   Year of passing
*   Department-level overview of student participation in placements.

**New additions implemented based on lecturer request:**

**A. Recommendation System (Basic Implementation)**

*   Suggests suitable job roles to students based on:
    *   Uploaded resume
    *   Skill patterns
*   Uses content-based filtering & text similarity.

**B. Student Achievements Module**

*   **Students can upload:**
    *   Certificates
    *   Project achievements
    *   Internship letters
*   Department can view year-wise achievements.

**C. Project Mapping Module**

*   **Each student can add:**
    *   Project abstract
    *   Tools & technologies
    *   GitHub link
*   **System maps projects to:**
    *   Relevant job roles
    *   Companies
    *   Departments/specializations

### 5. 🤖 AI-Based Resume Matcher

Implemented using BERT/SBERT text embedding.

**How It Works**

1.  Extract text from uploaded resume.
2.  Convert job description + resume to vector embeddings.
3.  Calculate similarity score.
4.  Return match percentage and key skill matches.

**Use Cases**

*   Helps students understand whether they fit a job role.
*   Helps placement officers quickly compare resumes.

## 🛠 Tech Stack

**Frontend:**
*   React (Vite)
*   Bootstrap
*   Chart.js / Recharts
*   Ethers.js (Web3 Integration)
*   React Router

**Backend:**
*   Node.js
*   Express.js
*   MongoDB (Mongoose)
*   SIWE (Sign-In with Ethereum)
*   JSON Web Tokens (JWT)

