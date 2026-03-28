import React from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
    Thermometer, Droplets, Sun, Wind, Bell, Search, Info
} from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = ({ data, fullData, latest, loading }) => {

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
                    <OverviewCard 
                        title="Soil Moisture" 
                        value={latest.soil_moisture} 
                        unit="%" 
                        icon={Droplets} 
                        color={latest.soil_moisture == null ? "var(--brand-green)" : (latest.soil_moisture < 30 ? "var(--brand-red)" : (latest.soil_moisture < 70 ? "var(--brand-green)" : "var(--brand-blue)"))}
                        subText={latest.soil_moisture == null ? "--" : (latest.soil_moisture < 30 ? "Dry" : (latest.soil_moisture < 70 ? "Healthy" : "Too Wet"))} 
                    />
                    <OverviewCard 
                        title="Temperature" 
                        value={latest.air_temperature} 
                        unit="°C" 
                        icon={Thermometer} 
                        color={latest.air_temperature == null ? "var(--brand-amber)" : (latest.air_temperature < 18 ? "var(--brand-blue)" : (latest.air_temperature < 32 ? "var(--brand-green)" : "var(--brand-red)"))}
                        subText={latest.air_temperature == null ? "--" : (latest.air_temperature < 18 ? "Cold" : (latest.air_temperature < 32 ? "Optimal" : "Hot"))} 
                    />
                    <OverviewCard 
                        title="Air Humidity" 
                        value={latest.air_humidity} 
                        unit="%" 
                        icon={Wind} 
                        color={latest.air_humidity == null ? "var(--brand-blue)" : (latest.air_humidity < 30 ? "var(--brand-red)" : (latest.air_humidity < 40 ? "var(--brand-amber)" : (latest.air_humidity < 60 ? "var(--brand-green)" : (latest.air_humidity < 80 ? "var(--brand-blue)" : "var(--brand-red)"))))}
                        subText={latest.air_humidity == null ? "--" : (latest.air_humidity < 30 ? "Too Dry" : (latest.air_humidity < 40 ? "Low" : (latest.air_humidity < 60 ? "Optimal" : (latest.air_humidity < 80 ? "High" : "Too Humid"))))} 
                    />
                    <OverviewCard 
                        title="Light Intensity" 
                        value={latest.ldr_light} 
                        unit="%" 
                        icon={Sun} 
                        color={latest.ldr_light == null ? "var(--brand-yellow)" : (latest.ldr_light < 20 ? "var(--text-muted)" : (latest.ldr_light < 40 ? "var(--brand-blue)" : (latest.ldr_light < 75 ? "var(--brand-green)" : (latest.ldr_light < 90 ? "var(--brand-amber)" : "var(--brand-red)"))))}
                        subText={latest.ldr_light == null ? "--" : (latest.ldr_light < 20 ? "Too Dark" : (latest.ldr_light < 40 ? "Low Light" : (latest.ldr_light < 75 ? "Healthy" : (latest.ldr_light < 90 ? "Bright Light" : "Too Bright"))))}
                    />
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card chart-card">
                    <div className="flex-between" style={{ marginBottom: '32px' }}>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Daily Average Comparison</h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Aggregated average values for each sensor</p>
                        </div>
                    </div>

                    <div style={{ width: '100%', height: 400 }}>
                        {(() => {
                            const getAverages = () => {
                                const sourceData = fullData && fullData.length > 0 ? fullData : data;
                                if (!sourceData || !sourceData.length) return [];
                                const avg = (key) => {
                                    const valid = sourceData.filter(d => d[key] != null);
                                    if (!valid.length) return 0;
                                    return valid.reduce((acc, curr) => acc + Number(curr[key]), 0) / valid.length;
                                };

                                const m = avg('soil_moisture');
                                const t = avg('air_temperature');
                                const h = avg('air_humidity');
                                const l = avg('ldr_light');

                                return [
                                    { name: 'Moisture', value: m || 0, display: m || 0, unit: '%', fill: 'var(--brand-green)' },
                                    { name: 'Temperature', value: t ? (t / 50) * 100 : 0, display: t, unit: '°C', fill: 'var(--brand-amber)' },
                                    { name: 'Humidity', value: h || 0, display: h || 0, unit: '%', fill: 'var(--brand-blue)' },
                                    { name: 'Light Intensity', value: l || 0, display: l || 0, unit: '%', fill: 'var(--brand-yellow)' }
                                ];
                            };
                            const avgData = getAverages();

                            const renderCustomBarLabel = (props) => {
                                const { x, y, width, index } = props;
                                const entry = avgData[index];
                                return (
                                    <text x={x + width / 2} y={y - 12} fill="var(--text-muted)" textAnchor="middle" fontSize="13" fontWeight="bold">
                                        {entry.display.toFixed(1)}{entry.unit}
                                    </text>
                                );
                            };

                            return (
                                <ResponsiveContainer>
                                    <BarChart data={avgData} margin={{ top: 40, right: 30, left: 30, bottom: 10 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: 'var(--text-secondary)', fontWeight: 600 }} dy={10} />
                                        <YAxis hide domain={[0, 100]} />
                                        <Tooltip 
                                            cursor={{ fill: 'var(--bg-muted)', opacity: 0.5 }}
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    const pData = payload[0].payload;
                                                    return (
                                                        <div style={{ background: 'white', padding: '12px', borderRadius: '8px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)' }}>
                                                            <div style={{ fontWeight: 'bold', marginBottom: '4px', color: 'var(--text-primary)' }}>{pData.name} Avg</div>
                                                            <div style={{ color: pData.fill, fontWeight: '800', fontSize: '1.2rem' }}>
                                                                {pData.display.toFixed(1)} {pData.unit}
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                        <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={80} label={renderCustomBarLabel}>
                                            {avgData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            );
                        })()}
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Dashboard;
