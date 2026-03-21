import React from 'react';
import { 
  Settings as SettingIcon, 
  Wifi, 
  Cpu, 
  Database, 
  RefreshCw,
  Sliders,
  ShieldCheck,
  Bell,
  Smartphone,
  ChevronRight
} from 'lucide-react';

const Settings = () => {
  const SettingRow = ({ icon: Icon, title, desc, value, type = "toggle" }) => (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: '24px 0',
      borderBottom: '1px solid var(--border)' 
    }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div className="insight-icon-wrap" style={{ background: 'var(--bg-base)', border: '1px solid var(--border)' }}>
          <Icon size={18} color="var(--text-secondary)" />
        </div>
        <div>
          <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{title}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{desc}</div>
        </div>
      </div>
      <div>
        {type === "toggle" ? (
          <div style={{ 
            width: '42px', height: '22px', 
            background: 'var(--brand-green)', 
            borderRadius: '99px',
            position: 'relative',
            cursor: 'pointer'
          }}>
            <div style={{ 
              width: '18px', height: '18px', 
              background: 'white', 
              borderRadius: '50%',
              position: 'absolute',
              right: '2px', top: '2px'
            }}></div>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontWeight: '700', fontSize: '0.9rem' }}>
            {value} <ChevronRight size={14} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <header className="top-bar">
        <h1>Settings</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Configure system behavior and device preferences</p>
      </header>
      
      <div className="page-content">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
          <div className="card">
            <h3 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '24px' }}>System Configuration</h3>
            
            <SettingRow 
              icon={Bell} 
              title="Smart Alerts" 
              desc="Receive push notifications for critical sensor changes"
            />
            <SettingRow 
              icon={RefreshCw} 
              title="Data Sync Frequency" 
              desc="How often the dashboard requests sensor updates"
              type="text"
              value="5 Seconds"
            />
            <SettingRow 
              icon={Sliders} 
              title="High Precision Mode" 
              desc="Enable 12-bit ADC readings for increased accuracy"
            />
            <SettingRow 
              icon={ShieldCheck} 
              title="Calibration Lock" 
              desc="Prevent accidental changes to sensor threshold values"
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="card">
              <h3 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '20px' }}>Active Hardware</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="insight-item">
                    <div className="insight-icon-wrap bg-blue-soft vibrant-blue"><Cpu size={16}/></div>
                    <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: '800' }}>ESP32-FLORA-S2</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>48:E7:29:B1:C0 (Online)</div>
                    </div>
                </div>
                <div className="insight-item">
                    <div className="insight-icon-wrap" style={{ background: 'var(--brand-amber-soft)', color: 'var(--brand-amber)' }}><Smartphone size={16}/></div>
                    <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: '800' }}>Firmware v2.4.1</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Latest security patch applied</div>
                    </div>
                </div>
              </div>
            </div>

            <div className="card" style={{ background: 'var(--brand-green-soft)', borderColor: 'transparent' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '12px', color: 'var(--brand-green)' }}>Network Signal</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Wifi size={32} color="var(--brand-green)" />
                    <div>
                        <div style={{ fontWeight: '800', fontSize: '1.1rem', color: 'var(--brand-green)' }}>-42 dBm</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--brand-green)', fontWeight: '600' }}>Excellent Connection</div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
