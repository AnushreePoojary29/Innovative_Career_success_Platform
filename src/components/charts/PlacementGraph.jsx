import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from 'recharts';

// PlacementGraph: compares Eligible Students (studentsRegistered) vs Students Placed
export default function PlacementGraph({ data }) {
  const defaultData = {
    years: [
      { year: '2024-2025', totalStudents: 751, studentsRegistered: 441, companiesVisited: 146, studentsPlaced: 259 },
      { year: '2023-2024', totalStudents: 609, studentsRegistered: 340, companiesVisited: 231, studentsPlaced: 314 },
      { year: '2022-2023', totalStudents: 664, studentsRegistered: 503, companiesVisited: 241, studentsPlaced: 385 },
      { year: '2021-2022', totalStudents: 793, studentsRegistered: 542, companiesVisited: 272, studentsPlaced: 442 },
      { year: '2020-2021', totalStudents: 715, studentsRegistered: 567, companiesVisited: 213, studentsPlaced: 396 },
      { year: '2019-2020', totalStudents: 790, studentsRegistered: 592, companiesVisited: 176, studentsPlaced: 409 },
    ],
  };

  const src = data && Array.isArray(data.years) ? data : defaultData;

  const chartData = useMemo(() => {
    return src.years.map((y) => ({
      year: y.year,
      eligible: Number(y.studentsRegistered || 0),
      placed: Number(y.studentsPlaced || 0),
    }));
  }, [src]);

  const COLORS = { eligible: '#2E8B57', placed: '#1976D2' };

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || payload.length === 0) return null;
    const el = payload.find((p) => p.dataKey === 'eligible')?.value ?? 0;
    const pl = payload.find((p) => p.dataKey === 'placed')?.value ?? 0;
    const rate = el ? ((pl / el) * 100).toFixed(1) : '-';
    return (
      <div style={{ background: '#fff', padding: 10, borderRadius: 6, boxShadow: '0 6px 18px rgba(0,0,0,0.08)' }}>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>{label}</div>
        <div style={{ color: COLORS.eligible }}>Eligible: <strong>{el}</strong></div>
        <div style={{ color: COLORS.placed }}>Placed: <strong>{pl}</strong></div>
        <div style={{ marginTop: 6 }}>Placement Rate: <strong>{rate}%</strong></div>
      </div>
    );
  };

  return (
    <div style={{ width: '100%', maxWidth: 980, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h5 style={{ margin: 0 }}>Placement Overview</h5>
        <div style={{ fontSize: 13, color: '#666' }}>Eligible vs Placed (per year)</div>
      </div>

      <div style={{ background: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 6px 18px rgba(32,33,36,0.06)' }}>
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={chartData} margin={{ top: 12, right: 24, left: 6, bottom: 24 }} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="year" tick={{ fill: '#333', fontSize: 12 }} />
            <YAxis tick={{ fill: '#333', fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" align="right" iconType="circle" />

            <Bar dataKey="eligible" name="Eligible Students" fill={COLORS.eligible} radius={[6, 6, 0, 0]} barSize={28}>
              <LabelList dataKey="eligible" position="top" />
            </Bar>

            <Bar dataKey="placed" name="Students Placed" fill={COLORS.placed} radius={[6, 6, 0, 0]} barSize={28}>
              <LabelList dataKey="placed" position="top" />
            </Bar>

          </BarChart>
        </ResponsiveContainer>

        <div style={{ marginTop: 12, fontSize: 13, color: '#666' }}>
          
        </div>
      </div>
    </div>
  );
}
