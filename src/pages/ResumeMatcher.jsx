import React from "react";

export default function ResumeMatcher() {
  return (
    <div style={{ height: "100vh" }}>
      <iframe
        src="http://localhost:8501"
        title="Resume Matcher"
        style={{
          width: "100%",
          height: "100%",
          border: "none"
        }}
      />
    </div>
  );
}
