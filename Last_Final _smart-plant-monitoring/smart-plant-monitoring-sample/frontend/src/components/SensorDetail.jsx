import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Droplets, Thermometer, Wind, Sun, 
  Clock, AlertCircle, Info, TrendingUp, History
} from 'lucide-react';
import { motion } from 'framer-motion';

const SensorDetail = ({ type, value, unit, data, metricKey, color, min, max }) => {
    // Mock insights based on current value
    const getInsights = () => {
        if (type === "Soil Moisture") {
            const val = value || 0;
            const health = val > 2000 ? "Monitor Closely" : "Optimal";
            const color = val > 2000 ? "var(--brand-amber)" : "var(--brand-green)";
            
            return {
                health,
                healthColor: color,
                recommendation: val > 2000 ? "Consider watering in the next 12 hours" : "Current moisture levels are sufficient.",
                insights: [
                    { title: "Watering Recommendation", desc: "Next watering recommended in 18-24 hours based on current soil drying rate.", icon: Droplets, iconBg: "var(--brand-blue-soft)", iconColor: "var(--brand-blue)" },
                    { title: "Evaporation Rate", desc: "Current air temperature is causing moderate evaporation. Moisture dropping at ~2.3% per day.", icon: Wind, iconBg: "var(--brand-amber-soft)", iconColor: "var(--brand-amber)" },
                    { title: "Water Retention", desc: "Soil quality is good with moderate water retention capacity. Consider adding mulch.", icon: TrendingUp, iconBg: "var(--brand-green-soft)", iconColor: "var(--brand-green)" }
                ]
            };
        }
        // Add more default insights for other sensors...
        return {
            health: "Optimal",
            healthColor: "var(--brand-green)",
            recommendation: "Sensor readings are within the normal range for this plant species.",
            insights: [
                { title: "General Status", desc: "All parameters are stable. No immediate action required.", icon: Info, iconBg: "var(--brand-blue-soft)", iconColor: "var(--brand-blue)" },
                { title: "Historical Trend", desc: "Data shows a steady pattern over the last 24 hours.", icon: History, iconBg: "var(--brand-purple-soft)", iconColor: "var(--brand-purple)" }
            ]
        };
    };

    const { health, healthColor, recommendation, insights } = getInsights();
    
    // Calculate gauge stroke
    const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);
    const dashOffset = 188 - (percentage * 1.88); // 188 is roughly half circumference for size 120

    return (
        <div className="page-content">
            <header className="analysis-header">
                <h2>{type}</h2>
                <p>Monitor {type.toLowerCase()} levels to optimize care decisions</p>
            </header>

            <div className="stats-grid">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card">
                    <span className="card-label">Current {type}</span>
                    <div className="flex-between">
                        <div className="card-value">{value ?? '--'}<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}> {unit}</span></div>
                        <div className="insight-icon-wrap bg-blue-soft vibrant-blue"><Info size={18}/></div>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--brand-red)', marginTop: '8px', fontWeight: '600' }}>
                        <TrendingUp size={12} style={{ transform: 'rotate(180deg)' }} /> -2.3% from yesterday
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card health-card">
                    <span className="card-label">Overall Health</span>
                    <div className="health-status" style={{ color: healthColor }}>{health}</div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{recommendation}</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card">
                    <span className="card-label">Next Prediction</span>
                    <div className="card-value">18h</div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Based on evaporation rate</p>
                </motion.div>
            </div>

            <div className="analysis-main-grid">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="card">
                    <div className="gauge-container">
                        <svg width="200" height="120" viewBox="0 0 200 120">
                            <path d="M 40 100 A 60 60 0 0 1 160 100" fill="none" stroke="#f1f5f9" strokeWidth="12" strokeLinecap="round" />
                            <path 
                                d="M 40 100 A 60 60 0 0 1 160 100" 
                                fill="none" 
                                stroke={color} 
                                strokeWidth="12" 
                                strokeLinecap="round" 
                                strokeDasharray="188" 
                                strokeDashoffset={dashOffset} 
                                style={{ transition: 'stroke-dashoffset 1s ease' }}
                            />
                        </svg>
                        <div className="gauge-value">{value ?? '--'}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', marginTop: '4px' }}>Level</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '10px' }}>Min: {min}  Max: {max}</div>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card">
                    <h3 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '24px' }}>Key Insights</h3>
                    <div className="insight-list">
                        {insights.map((item, i) => (
                            <div className="insight-item" key={i}>
                                <div className="insight-icon-wrap" style={{ background: item.iconBg, color: item.iconColor }}>
                                    <item.icon size={16} />
                                </div>
                                <div>
                                    <div className="insight-title">{item.title}</div>
                                    <div className="insight-desc">{item.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card chart-card">
              <div className="flex-between" style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '800' }}>Time-Series (Live Data)</h3>
                <div className="time-chip" style={{ background: 'var(--bg-muted)', border: 'none' }}>24 Hours</div>
              </div>
              <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                      <AreaChart data={data}>
                          <defs>
                              <linearGradient id="detailGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor={color} stopOpacity={0.15} />
                                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                              </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="timestamp" hide />
                          <YAxis 
                              domain={['dataMin - 2', 'dataMax + 2']} 
                              tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
                              tickLine={false}
                              axisLine={false}
                          />
                          <Tooltip 
                              contentStyle={{ 
                                  background: 'white', 
                                  border: '1px solid #e2e8f0', 
                                  borderRadius: '8px', 
                                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                                  fontSize: '0.8rem'
                              }}
                              formatter={(value) => [`${value}${unit}`, title]}
                          />
                          <Area type="monotone" dataKey={metricKey} stroke={color} fill="url(#detailGrad)" strokeWidth={3} />
                      </AreaChart>
                  </ResponsiveContainer>
              </div>
            </motion.div>
        </div>
    );
};

export default SensorDetail;
