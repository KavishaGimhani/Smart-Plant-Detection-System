import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Search, 
  Download, 
  Calendar,
  Filter,
  ArrowUpDown,
  History as HistIcon
} from 'lucide-react';
import { motion } from 'framer-motion';

const API_URL = "http://127.0.0.1:5000/api/sensor-data";

const History = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(API_URL);
        setLogs(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const formatDate = (isoStr) => {
    if (!isoStr) return 'N/A';
    const d = new Date(isoStr);
    return d.toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <header className="top-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <h1>Historical Logs</h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Chronological record of sensor data</p>
        </div>
        <button className="sidebar-item" style={{ width: 'auto', gap: '8px', color: 'var(--brand-green)', background: 'var(--brand-green-soft)' }}>
          <Download size={16} />
          Export CSV
        </button>
      </header>

      <div className="page-content" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)' }}>
        <div className="card" style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '0' }}>
            <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)' }}>
                <div style={{ position: 'relative', width: '320px' }}>
                    <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input type="text" placeholder="Search logs..." style={{ width: '100%', background: 'var(--bg-base)', border: '1px solid var(--border)', borderRadius: '99px', padding: '10px 10px 10px 40px', fontSize: '0.85rem' }} />
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="sidebar-item" style={{ width: 'auto', border: '1px solid var(--border)' }}><Filter size={16} /> Filter</button>
                    <button className="sidebar-item" style={{ width: 'auto', border: '1px solid var(--border)' }}><Calendar size={16} /> Date Range</button>
                </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ position: 'sticky', top: 0, background: 'var(--bg-sidebar)', zIndex: 10 }}>
                        <tr>
                            <th style={thStyle}>Timestamp <ArrowUpDown size={12} /></th>
                            <th style={thStyle}>Soil Moisture</th>
                            <th style={thStyle}>Temp</th>
                            <th style={thStyle}>Humidity</th>
                            <th style={thStyle}>Light</th>
                            <th style={thStyle}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log, i) => (
                            <tr key={i} style={trStyle}>
                                <td style={tdStyle}>{formatDate(log.timestamp)}</td>
                                <td style={tdStyle}>{log.soil_moisture}</td>
                                <td style={tdStyle}>{log.air_temperature}°C</td>
                                <td style={tdStyle}>{log.air_humidity}%</td>
                                <td style={tdStyle}>{log.ldr_light} lux</td>
                                <td style={tdStyle}>
                                    <span style={{ 
                                        padding: '4px 10px', 
                                        borderRadius: '99px', 
                                        background: 'var(--brand-green-soft)', 
                                        color: 'var(--brand-green)',
                                        fontSize: '0.65rem',
                                        fontWeight: '800'
                                    }}>OPTIMAL</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {logs.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '100px', color: 'var(--text-muted)' }}>
                        <HistIcon size={48} style={{ opacity: 0.1, marginBottom: '16px' }} />
                        <p>No historical records found for this period.</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </>
  );
};

const thStyle = {
  padding: '16px 24px',
  fontSize: '0.7rem',
  fontWeight: '700',
  color: 'var(--text-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  borderBottom: '1px solid var(--border)'
};

const trStyle = {
  borderBottom: '1px solid var(--border)',
};

const tdStyle = {
  padding: '16px 24px',
  fontSize: '0.85rem',
  color: 'var(--text-primary)',
  fontWeight: '500'
};

export default History;
