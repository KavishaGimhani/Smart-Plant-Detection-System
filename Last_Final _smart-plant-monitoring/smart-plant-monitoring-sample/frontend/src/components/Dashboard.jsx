import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Thermometer, Droplets, Sun, Wind, Bell, Search, Info
} from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = ({ data, latest, loading }) => {

    const OverviewCard = ({ title, value, unit, icon: Icon, color, subText }) => (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card">
            <span className="card-label">{title}</span>
            <div className="flex-between">
                <div>
                   <div className="card-value">{value ?? '--'}<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}> {unit}</span></div>
                   <div style={{ fontSize: '0.75rem', color: 'var(--brand-green)', marginTop: '4px', fontWeight: '600' }}>{subText}</div>
                </div>
                <div className="insight-icon-wrap" style={{ background: `${color}15`, color: color }}>
                    <Icon size={20} />
                </div>
            </div>
        </motion.div>
    );

    return (
        <>
            <header className="top-bar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <h1>Overview</h1>
                    <div style={{ position: 'relative', width: '300px' }}>
                        <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input type="text" placeholder="Search parameters..." style={{ width: '100%', background: 'var(--bg-base)', border: '1px solid var(--border)', borderRadius: '99px', padding: '10px 10px 10px 40px', fontSize: '0.85rem' }} />
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div className="insight-icon-wrap" style={{ cursor: 'pointer', border: '1px solid var(--border)' }}>
                        <Bell size={18} />
                    </div>
                </div>
            </header>

            <div className="page-content">
                <div className="stats-grid">
                    <OverviewCard title="Soil Moisture" value={latest.soil_moisture} unit="%" icon={Droplets} color="var(--brand-green)" subText="Stable" />
                    <OverviewCard title="Temperature" value={latest.air_temperature} unit="°C" icon={Thermometer} color="var(--brand-amber)" subText="Optimal" />
                    <OverviewCard title="Air Humidity" value={latest.air_humidity} unit="%" icon={Wind} color="var(--brand-blue)" subText="Stable" />
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card chart-card">
                    <div className="flex-between" style={{ marginBottom: '32px' }}>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Overall Environment Trends</h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Aggregated data from all active sensors</p>
                        </div>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: '600' }}>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--brand-green)' }}></span> Soil
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: '600' }}>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--brand-amber)' }}></span> Temp
                            </div>
                        </div>
                    </div>

                    <div style={{ width: '100%', height: 400 }}>
                        <ResponsiveContainer>
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="gradSoil" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--brand-green)" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="var(--brand-green)" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="gradTemp" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--brand-amber)" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="var(--brand-amber)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="timestamp" hide />
                                <YAxis hide domain={['auto', 'auto']} />
                                <Tooltip 
                                    contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: 'var(--shadow-md)' }} 
                                />
                                <Area type="monotone" dataKey="soil_moisture" stroke="var(--brand-green)" fill="url(#gradSoil)" strokeWidth={3} />
                                <Area type="monotone" dataKey="air_temperature" stroke="var(--brand-amber)" fill="url(#gradTemp)" strokeWidth={3} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Dashboard;
