import React from 'react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Droplets, Thermometer, Wind, Sun, 
  Clock, AlertCircle, Info, TrendingUp, History
} from 'lucide-react';
import { motion } from 'framer-motion';

const SensorDetail = ({ type, value, unit, data, fullData, metricKey, color, min, max }) => {
    // Mock insights based on current value
    const getInsights = () => {
        if (type === "Soil Moisture") {
            const val = value || 0;
            let health = "Unknown";
            let color = "var(--text-muted)";
            let recommendation = "";
            
            if (val < 30) {
                health = "Dry";
                color = "var(--brand-amber)"; // or red
                recommendation = "Watering required immediately.";
            } else if (val < 70) {
                health = "Healthy";
                color = "var(--brand-green)";
                recommendation = "Current moisture levels are optimal.";
            } else {
                health = "Too Wet";
                color = "var(--brand-blue)";
                recommendation = "Hold off on watering to prevent root rot.";
            }
            
            return {
                health,
                healthColor: color,
                recommendation,
                insights: [
                    { title: "Watering Recommendation", desc: "Next watering recommended in 18-24 hours based on current soil drying rate.", icon: Droplets, iconBg: "var(--brand-blue-soft)", iconColor: "var(--brand-blue)" },
                    { title: "Evaporation Rate", desc: "Current air temperature is causing moderate evaporation. Moisture dropping at ~2.3% per day.", icon: Wind, iconBg: "var(--brand-amber-soft)", iconColor: "var(--brand-amber)" },
                    { title: "Water Retention", desc: "Soil quality is good with moderate water retention capacity. Consider adding mulch.", icon: TrendingUp, iconBg: "var(--brand-green-soft)", iconColor: "var(--brand-green)" }
                ]
            };
        } else if (type === "Temperature") {
            const val = value || 0;
            let health = "Unknown";
            let color = "var(--text-muted)";
            let recommendation = "";
            
            if (val < 18) {
                health = "Cold";
                color = "var(--brand-blue)";
                recommendation = "Consider moving the plant to a warmer location.";
            } else if (val < 32) {
                health = "Optimal";
                color = "var(--brand-green)";
                recommendation = "Current temperature is ideal for growth.";
            } else {
                health = "Hot";
                color = "var(--brand-red)";
                recommendation = "Ensure adequate ventilation or shading to prevent heat stress.";
            }
            
            return {
                health,
                healthColor: color,
                recommendation,
                insights: [
                    { title: "Temperature Assessment", desc: `Current temperature is ${val}°C, which is considered ${health.toLowerCase()} for typical house plants.`, icon: Thermometer, iconBg: "var(--brand-amber-soft)", iconColor: "var(--brand-amber)" },
                    { title: "Growth Rate", desc: val < 18 ? "Growth might slow down due to low temperatures." : (val < 32 ? "Optimal temperature ensures steady and healthy growth." : "High temperatures can dry out the soil quickly."), icon: TrendingUp, iconBg: "var(--brand-green-soft)", iconColor: "var(--brand-green)" }
                ]
            };
        } else if (type === "Light Intensity") {
            const val = value || 0;
            let health = "Unknown";
            let color = "var(--text-muted)";
            let recommendation = "";
            let desc = "";

            if (val < 20) {
                health = "Too Dark";
                color = "var(--text-muted)";
                recommendation = "Move the plant to a brighter location to allow photosynthesis.";
                desc = "Plant cannot photosynthesize efficiently at this light level.";
            } else if (val < 40) {
                health = "Low Light";
                color = "var(--brand-blue)";
                recommendation = "Plant is surviving but not thriving. More light would be beneficial.";
                desc = "Current lighting is sufficient for survival but not optimal growth.";
            } else if (val < 75) {
                health = "Healthy";
                color = "var(--brand-green)";
                recommendation = "Current light intensity is ideal for most houseplants.";
                desc = "Ideal light exposure for optimal health and growth.";
            } else if (val < 90) {
                health = "Bright Light";
                color = "var(--brand-yellow)";
                recommendation = "Good for sun-loving plants, but monitor for heat stress.";
                desc = "Bright direct light exposure, perfect for sun-tolerant species.";
            } else {
                health = "Too Bright";
                color = "var(--brand-red)";
                recommendation = "Provide some shade to prevent leaf burn.";
                desc = "High light intensity may cause leaf burn or rapid soil drying.";
            }

            return {
                health,
                healthColor: color,
                recommendation,
                insights: [
                    { title: "Light Exposure", desc, icon: Sun, iconBg: "var(--brand-yellow-soft)", iconColor: "var(--brand-yellow)" },
                    { title: "Growth Rate", desc: val < 40 ? "Growth is severely limited by available light." : (val < 90 ? "Optimal light supports robust daily growth." : "Too much direct sun may damage delicate plant tissues over time."), icon: TrendingUp, iconBg: "var(--brand-green-soft)", iconColor: "var(--brand-green)" }
                ]
            };
        } else if (type === "Humidity") {
            const val = value || 0;
            let health = "Unknown";
            let color = "var(--text-muted)";
            let recommendation = "";
            let desc = "";

            if (val < 30) {
                health = "Too Dry";
                color = "var(--brand-red)";
                recommendation = "Mist the plant, use a humidifier, or create a pebble tray.";
                desc = "Air is too dry, which causes brown leaf tips and crispy edges.";
            } else if (val < 40) {
                health = "Low";
                color = "var(--brand-amber)";
                recommendation = "Tolerable for some plants, but tropicals need more moisture.";
                desc = "Humidity is on the lower side for typical indoor plants.";
            } else if (val < 60) {
                health = "Optimal";
                color = "var(--brand-green)";
                recommendation = "Current air humidity is ideal for most houseplants.";
                desc = "Perfect balance of moisture in the air.";
            } else if (val < 80) {
                health = "High";
                color = "var(--brand-blue)";
                recommendation = "Excellent for tropical plants like ferns and calatheas.";
                desc = "High humidity promotes lush green foliage.";
            } else {
                health = "Too Humid";
                color = "var(--brand-red)";
                recommendation = "Ensure good airflow to prevent fungal diseases and mold.";
                desc = "Excessively high humidity without ventilation risks fungal growth.";
            }

            return {
                health,
                healthColor: color,
                recommendation,
                insights: [
                    { title: "Air Moisture Level", desc, icon: Wind, iconBg: "var(--brand-blue-soft)", iconColor: "var(--brand-blue)" },
                    { title: "Plant Hydration", desc: val < 40 ? "Low humidity causes plants to lose water faster through leaves." : (val < 80 ? "Healthy humidity reduces the need for frequent soil watering." : "High moisture minimizes leaf transpiration."), icon: Droplets, iconBg: "var(--brand-green-soft)", iconColor: "var(--brand-green)" }
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

    const dailyData = React.useMemo(() => {
        const sourceData = fullData && fullData.length > 0 ? fullData : data;
        if (!sourceData || sourceData.length === 0) return [];
        
        const groups = {};
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        // Pad array mathematically to always show 7 days history labels
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(today.getDate() - i);
            const dName = days[d.getDay()];
            groups[dName] = { sum: 0, count: 0, dateObj: new Date(d.getFullYear(), d.getMonth(), d.getDate()) };
        }
        
        sourceData.forEach(item => {
            if (!item.timestamp) return;
            const date = new Date(item.timestamp);
            const dayName = days[date.getDay()];
            
            if (groups[dayName]) {
                if (item[metricKey] !== undefined && item[metricKey] !== null) {
                    groups[dayName].sum += Number(item[metricKey]);
                    groups[dayName].count += 1;
                }
            }
        });
        
        const result = Object.keys(groups).map(day => {
            const avg = groups[day].count > 0 ? groups[day].sum / groups[day].count : 0;
            return {
                day,
                average: parseFloat(avg.toFixed(1)),
                dateObj: groups[day].dateObj
            };
        });
        
        // Sort chronologically
        result.sort((a, b) => a.dateObj - b.dateObj);
        
        return result;
    }, [fullData, data, metricKey]);

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
                              formatter={(value) => [`${value}${unit}`, type]}
                          />
                          <Area type="monotone" dataKey={metricKey} stroke={color} fill="url(#detailGrad)" strokeWidth={3} />
                      </AreaChart>
                  </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card chart-card" style={{ marginTop: '24px' }}>
              <div className="flex-between" style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '800' }}>Daily Averages</h3>
                <div className="time-chip" style={{ background: 'var(--bg-muted)', border: 'none' }}>Last 7 Days</div>
              </div>
              <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                      <BarChart data={dailyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                          <YAxis 
                              domain={['dataMin - 5', 'dataMax + 5']} 
                              tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
                              tickLine={false}
                              axisLine={false}
                          />
                          <Tooltip 
                              cursor={{ fill: 'var(--bg-muted)', opacity: 0.5 }}
                              contentStyle={{ 
                                  background: 'white', 
                                  border: '1px solid #e2e8f0', 
                                  borderRadius: '8px', 
                                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                                  fontSize: '0.8rem'
                              }}
                              formatter={(val) => [`${val}${unit}`, 'Daily Avg']}
                          />
                          <Bar dataKey="average" fill={color} radius={[4, 4, 0, 0]} barSize={32} />
                      </BarChart>
                  </ResponsiveContainer>
              </div>
            </motion.div>
        </div>
    );
};

export default SensorDetail;
