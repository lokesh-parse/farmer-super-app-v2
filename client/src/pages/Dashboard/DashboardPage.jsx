import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/auth";
import { getHistory } from "../../utils/history";
import StatCard from "../../components/common/StatCard";
import SectionCard from "../../components/common/SectionCard";
import { getLanguage } from "../../utils/language"; 
import {
  getNotifications,
  addNotification,
  removeNotification,
} from "../../utils/notifications";

import { getFarmRecords } from "../../services/farmService";
import { getCommunityPosts } from "../../services/communityService";
import { getProfile } from "../../services/profileService";
import { getRecommendations } from "../../services/recommendationService";
import { getDashboardStats } from "../../services/dashboardService"; 

function DashboardPage() {
  const navigate = useNavigate();

  const user = getUser();
  const history = getHistory();
  const selectedLanguage = getLanguage(); 

  const [notifications, setNotifications] = useState([]);
  
  const [farmRecords, setFarmRecords] = useState([]);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [profile, setProfile] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  
  const [dashboardStats, setDashboardStats] = useState({
    farmers: 0,
    farmRecords: 0,
    communityPosts: 0,
    marketplaceItems: 0,
    recommendations: 0,
  });

  useEffect(() => {
    const saved = getNotifications();
    setNotifications(saved);

    if (saved.length === 0) {
      const demoAlerts = [
        {
          id: Date.now() + 1,
          type: "crop",
          text: "Check your crop for pest infection this week.",
        },
        {
          id: Date.now() + 2,
          type: "market",
          text: "Tomato price increased in Pune market.",
        },
        {
          id: Date.now() + 3,
          type: "weather",
          text: "Rain expected tomorrow. Avoid irrigation.",
        },
      ];

      demoAlerts.forEach(addNotification);
      setNotifications(demoAlerts);
    }
  }, []);

  useEffect(() => {
    async function loadDashboardData() {
      const farmData = await getFarmRecords();
      const communityData = await getCommunityPosts();
      const profileData = await getProfile();
      const recommendationData = await getRecommendations();
      const statsData = await getDashboardStats(); 

      setFarmRecords(farmData);
      setCommunityPosts(communityData);
      setProfile(profileData);
      setRecommendations(recommendationData);
      setDashboardStats(statsData); 
    }

    loadDashboardData();
  }, []);

  const handleRemove = (id) => {
    removeNotification(id);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const totalActivities = history.length;
  const chatCount = history.filter((item) => item.type === "AI Chat").length;
  const weatherCount = history.filter((item) => item.type === "Weather").length;
  const cropCount = history.filter((item) => item.type === "Crop Doctor").length;

  const lastActivity = history[0];
  const recentHistory = history.slice(0, 4);

  const totalExpense = farmRecords.reduce((sum, record) => {
    const expense = Number(record.expense);
    return sum + (isNaN(expense) ? 0 : expense);
  }, 0);

  const topCrop = farmRecords.length > 0 ? farmRecords[0].crop_name || "N/A" : "Tomatos";

  return (
    <div className="dashboard-layout">
      {/* LEFT COLUMN: Main Content */}
      <div className="dashboard-main-col">
        
        {/* 1. Hero Image Section */}
        <div className="hero-banner-image">
          <div className="hero-text-content">
            <h1>Welcome, {user?.name || "Lokesh Umesh Parse"} 👋</h1>
            <p>Here is your farming platform overview</p>

            <div className="hero-glass-card">
              <div className="glass-header">
                <span className="glass-icon">🌾</span>
                <h3>Welcome Back, {user?.name || "Lokesh Umesh Parse"}</h3>
              </div>
              <p className="glass-sub">AI Powered Farming Platform for Smart Agriculture</p>
              
              <div className="glass-stats-row">
                <div className="glass-stat-item">
                  <div className="glass-stat-icon">👥</div>
                  <div className="glass-stat-text">
                    <h2>{dashboardStats.farmers || 1}</h2>
                    <span>Farmers</span>
                  </div>
                </div>
                <div className="glass-divider"></div>
                <div className="glass-stat-item">
                  <div className="glass-stat-icon">📋</div>
                  <div className="glass-stat-text">
                    <h2>{dashboardStats.farmRecords || 3}</h2>
                    <span>Records</span>
                  </div>
                </div>
                <div className="glass-divider"></div>
                <div className="glass-stat-item">
                  <div className="glass-stat-icon">💬</div>
                  <div className="glass-stat-text">
                    <h2>{dashboardStats.communityPosts || 1}</h2>
                    <span>Posts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Middle Bar: Market Ticker & Language */}
        <div className="dashboard-middle-bar">
          <div className="market-ticker-pill">
            <span className="ticker-item">🌾 Wheat ₹2450/qtl</span> | 
            <span className="ticker-item">🍅 Tomato ₹1800/qtl</span> | 
            <span className="ticker-item">🧅 Onion ₹2200/qtl</span> | 
            <span className="ticker-item">🌾 Rice ₹3100/qtl</span>
          </div>
          <div className="language-pill">
            🌐 Preferred Language: <strong>{selectedLanguage || "English"}</strong>
          </div>
        </div>

        {/* 3. Quick Actions (8 Buttons) */}
        <div className="quick-actions-grid">
          <button className="action-btn" onClick={() => navigate("/app/chat")}>
            <div className="action-icon bg-green">🤖</div>
            <span>AI Chat</span>
          </button>
          <button className="action-btn" onClick={() => navigate("/app/crop-doctor")}>
            <div className="action-icon bg-red">🩺</div>
            <span>Crop Doctor</span>
          </button>
          <button className="action-btn" onClick={() => navigate("/app/weather")}>
            <div className="action-icon bg-blue">🌦</div>
            <span>Weather</span>
          </button>
          <button className="action-btn" onClick={() => navigate("/app/market")}>
            <div className="action-icon bg-yellow">💰</div>
            <span>Market</span>
          </button>
          <button className="action-btn" onClick={() => navigate("/app/community")}>
            <div className="action-icon bg-purple">👨‍🌾</div>
            <span>Community</span>
          </button>
          <button className="action-btn" onClick={() => navigate("/app/farm-records")}>
            <div className="action-icon bg-teal">📋</div>
            <span>Records</span>
          </button>
          <button className="action-btn" onClick={() => navigate("/app/learning-hub")}>
            <div className="action-icon bg-orange">📚</div>
            <span>Learning Hub</span>
          </button>
          <button className="action-btn" onClick={() => navigate("/app/profile")}>
            <div className="action-icon bg-indigo">👤</div>
            <span>Profile</span>
          </button>
        </div>

        {/* 4. Stats Grid (12 Cards) */}
        <div className="dashboard-stats-grid">
          <StatCard title="Total Activities" value={totalActivities || 40} icon="📊" />
          <StatCard title="AI Chats" value={chatCount || 28} icon="🤖" />
          <StatCard title="Weather Checks" value={weatherCount || 12} icon="🌦" />
          <StatCard title="Crop Scans" value={cropCount || 0} icon="🌱" />
          <StatCard title="Farm Records" value={dashboardStats.farmRecords || 3} icon="📋" />
          <StatCard title="Community Posts" value={dashboardStats.communityPosts || 1} icon="💬" />
          <StatCard title="Marketplace Items" value={dashboardStats.marketplaceItems || 1} icon="🛒" />
          <StatCard title="Recommendations" value={dashboardStats.recommendations || 2} icon="🎯" />
          <StatCard title="Top Crop" value={topCrop} icon="🌾" />
          <StatCard title="Village" value={profile.village || "Suradevi"} icon="📍" />
          <StatCard title="Farmers" value={dashboardStats.farmers || 1} icon="👨‍🌾" />
          <StatCard title="Total Expense" value={`₹${totalExpense || 1002000}`} icon="₹" />
        </div>

        {/* 5. Smart Recommendations */}
        <div className="recommendations-container">
          <h3 className="section-title">✨ Smart Recommendations</h3>
          <div className="recommendation-list">
            <div className="rec-card bg-light-blue">
              <div className="rec-icon">🌧</div>
              <div className="rec-text">
                <h4>Weather Alert</h4>
                <p>Rain expected in next 24 hours. Avoid irrigation.</p>
              </div>
            </div>
            <div className="rec-card bg-light-orange">
              <div className="rec-icon">📈</div>
              <div className="rec-text">
                <h4>Market Advice</h4>
                <p>Cotton prices are increasing. Consider waiting before selling.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Activity Bottom Grid */}
        <div className="dashboard-bottom-grid">
          <SectionCard title="🕒 Last Activity">
            {lastActivity ? (
              <div className="activity-card single-activity">
                <div className="activity-icon">💬</div>
                <div className="activity-details">
                  <strong>{lastActivity.type}</strong>
                  <p>{lastActivity.detail}</p>
                </div>
              </div>
            ) : (
              <p>No activity yet.</p>
            )}
          </SectionCard>

          <SectionCard title="📋 Recent Activity">
            {recentHistory.length > 0 ? (
              <div className="recent-activity-list">
                {recentHistory.map((item, index) => (
                  <div key={item.id || index} className="activity-list-item">
                    <div className="activity-icon-small">
                      {item.type.includes("Weather") ? "🌦" : "💬"}
                    </div>
                    <div className="activity-list-text">
                      <strong>{item.type}</strong>
                      <p>{item.detail}</p>
                    </div>
                    <small className="activity-time">{item.time || "Just now"}</small>
                  </div>
                ))}
              </div>
            ) : (
              <p>No recent activity available.</p>
            )}
          </SectionCard>
        </div>
      </div>

      {/* RIGHT COLUMN: Sidebar Content */}
      <div className="dashboard-right-col">
        
        {/* Weather Widget */}
        <div className="weather-widget">
          <div className="weather-header">
            <span>☁️ Today's Weather</span>
          </div>
          <div className="weather-main">
            <h1>31°C</h1>
            <div className="weather-icon-large">⛅</div>
          </div>
          <p className="weather-desc">Partly Cloudy</p>
          <div className="weather-footer">
            <span>Humidity 70%</span>
            <span className="divider">|</span>
            <span>Wind 12 km/h</span>
          </div>
        </div>

        {/* Notifications Widget */}
        <div className="notifications-widget">
          <h3 className="section-title">🔔 Notifications</h3>
          
          {notifications.length > 0 ? (
            <div className="notif-list">
              {notifications.map((n) => (
                <div key={n.id} className={`notif-card ${n.type}`}>
                  <div className="notif-icon">
                    {n.type === 'crop' ? '🐛' : n.type === 'market' ? '📈' : '🌧'}
                  </div>
                  <p>{n.text}</p>
                  <button className="dismiss-btn" onClick={() => handleRemove(n.id)}>Dismiss</button>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-alerts">No alerts</p>
          )}
          <button className="view-all-btn">View All Notifications →</button>
        </div>

      </div>
    </div>
  );
}

export default DashboardPage;