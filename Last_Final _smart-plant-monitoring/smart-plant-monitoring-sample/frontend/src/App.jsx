import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import SensorDetail from './components/SensorDetail';
import History from './components/History';
import Settings from './components/Settings';
import { 
  LayoutDashboard, 
  Droplets, 
  Thermometer, 
  Wind, 
  Sun,
  History as HistoryIcon,
  Settings as SettingsIcon,
  Leaf,
  Bell,
  User
} from 'lucide-react';
import './index.css';

const API_URL = "http://127.0.0.1:5000/api/sensor-data";

function App() {
  const [activePage, setActivePage] = useState('overview');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setData(prev => [...prev, ...response.data].slice(-50));
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const NavItem = ({ id, label, icon: Icon }) => (
    <button 
      className={`sidebar-item ${activePage === id ? 'active' : ''}`}
      onClick={() => setActivePage(id)}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );

  const latest = data[data.length - 1] || {};

  return (
    <div className="app-layout">
      {/* ─── Sidebar ─── */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <Leaf size={24} fill="currentColor" />
          <span className="logo-text">PlantSense</span>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-label">Dashboard</div>
          <NavItem id="overview" label="Overview" icon={LayoutDashboard} />
          <NavItem id="soil" label="Soil Moisture" icon={Droplets} />
          <NavItem id="temp" label="Temperature" icon={Thermometer} />
          <NavItem id="hum" label="Humidity" icon={Wind} />
          <NavItem id="light" label="Light Intensity" icon={Sun} />

          <div className="nav-label">Other</div>
          <NavItem id="notifications" label="Notifications" icon={Bell} />
          <NavItem id="history" label="History Logs" icon={HistoryIcon} />
          <NavItem id="settings" label="Settings" icon={SettingsIcon} />
        </nav>

        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: 'var(--brand-green)', borderRadius: '50%', display: 'flex', alignItems: 'center', justify6Content: 'center', color: 'white' }}>
              <User size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>User</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>user@plantsense.com</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ─── Main Content ─── */}
      <main className="main-content">
        {activePage === 'overview' && <Dashboard data={data} latest={latest} loading={loading} />}
        
        {activePage === 'soil' && (
          <SensorDetail 
            type="Soil Moisture" 
            value={latest.soil_moisture} 
            unit="%" 
            data={data}
            metricKey="soil_moisture"
            color="var(--brand-green)"
            min={0} max={4095}
          />
        )}
        
        {activePage === 'temp' && (
          <SensorDetail 
            type="Temperature" 
            value={latest.air_temperature} 
            unit="°C" 
            data={data}
            metricKey="air_temperature"
            color="var(--brand-amber)"
            min={0} max={50}
          />
        )}

        {activePage === 'hum' && (
          <SensorDetail 
            type="Humidity" 
            value={latest.air_humidity} 
            unit="%" 
            data={data}
            metricKey="air_humidity"
            color="var(--brand-blue)"
            min={0} max={100}
          />
        )}

        {activePage === 'light' && (
          <SensorDetail 
            type="Light Intensity" 
            value={latest.ldr_light} 
            unit="lux" 
            data={data}
            metricKey="ldr_light"
            color="var(--brand-purple)"
            min={0} max={4095}
          />
        )}

        {activePage === 'history' && <History />}
        {activePage === 'settings' && <Settings />}
      </main>
    </div>
  );
}

export default App;
