import { useState, useEffect } from "react";
import { getWeather } from "../../services/weatherService";
import { addHistoryItem } from "../../utils/history";
import PageHeader from "../../components/common/PageHeader";

function WeatherPage() {
  // Seamlessly setting the default location
  const [location, setLocation] = useState("Nagpur");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  // Auto-fetch weather on first load
  useEffect(() => {
    handleCheckWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckWeather = async () => {
    if (!location.trim() || loading) return;

    setLoading(true);

    try {
      const data = await getWeather(location);
      setWeather(data);
      addHistoryItem({
        type: "Weather",
        detail: `${location} weather checked`,
        time: new Date().toLocaleString(),
      });
    } catch (error) {
      setWeather({
        location: location,
        temperature: "--",
        condition: "Error",
        humidity: "--",
        wind: "--",
        advice: "Could not connect to weather server. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCheckWeather();
    }
  };

  // 1. Is dummy array ko fallback bana diya hai
  const fallbackForecast = [
    { day: "Tomorrow", temp: "32°C", icon: "🌤️" },
    { day: "Wednesday", temp: "30°C", icon: "🌧️" },
    { day: "Thursday", temp: "31°C", icon: "⛅" },
    { day: "Friday", temp: "33°C", icon: "☀️" },
  ];

  // 2. Decide karo: Agar API se forecast aaya hai toh wo use karo, warna fallback dikhao
  const displayForecast = weather?.forecast && weather.forecast.length > 0 
                          ? weather.forecast 
                          : fallbackForecast;

  return (
    <div className="wp-page-wrapper">
      <PageHeader
        title="Weather Advisor"
        subtitle="Real-time weather tracking and AI farming advice"
      />

      {/* Hero Banner */}
      <div className="wp-hero-banner">
        <div className="wp-hero-content">
          <h2>Plan Your Farming with Precision 🌦️</h2>
          <p>Get real-time weather updates and AI-driven agricultural advice to protect your crops and maximize yield.</p>
        </div>
        <div className="wp-hero-illustration">
          <div className="wp-weather-graphic">
            <div className="sun-icon">☀️</div>
            <div className="cloud-icon">☁️</div>
          </div>
        </div>
      </div>

      {/* Main 3-Column Grid */}
      <div className="wp-main-grid">
        
        {/* Column 1: Search & Main Temp */}
        <div className="wp-col-search">
          <h3 className="wp-section-title">1. Location Search</h3>
          <p className="wp-section-sub">Enter your city or village name</p>

          <div className="wp-search-card">
            <div className="wp-input-group">
              <span className="location-pin">📍</span>
              <input
                type="text"
                placeholder="Enter city or village..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button onClick={handleCheckWeather} disabled={loading}>
                {loading ? "..." : "Search"}
              </button>
            </div>
          </div>

          {weather && weather.temperature !== "--" && (
            <div className="wp-current-weather-card">
              <h4>{weather.location}</h4>
              <p className="date-text">{new Date().toDateString()}</p>
              
              <div className="temp-display">
                <h1>{weather.temperature}</h1>
                <div className="condition-box">
                  <span className="cond-icon">
                    {weather.condition?.toLowerCase().includes('rain') ? '🌧️' : 
                     weather.condition?.toLowerCase().includes('cloud') ? '☁️' : '☀️'}
                  </span>
                  <span>{weather.condition}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Column 2: Details & AI Advice */}
        <div className="wp-col-details">
          <h3 className="wp-section-title">2. Weather Details & Advice</h3>
          <p className="wp-section-sub">Actionable insights for your farm</p>

          <div className="wp-details-card">
            {loading ? (
              <div className="wp-loading-state">
                <div className="wp-spinner"></div>
                <p>Fetching satellite data...</p>
              </div>
            ) : weather ? (
              <>
                <div className="wp-metrics-grid">
                  <div className="wp-metric-item">
                    <div className="metric-icon bg-light-blue">💧</div>
                    <div className="metric-text">
                      <span>Humidity</span>
                      <strong>{weather.humidity}</strong>
                    </div>
                  </div>
                  <div className="wp-metric-item">
                    <div className="metric-icon bg-light-teal">💨</div>
                    <div className="metric-text">
                      <span>Wind Speed</span>
                      <strong>{weather.wind}</strong>
                    </div>
                  </div>
                  <div className="wp-metric-item">
                    <div className="metric-icon bg-light-orange">🌡️</div>
                    <div className="metric-text">
                      <span>Pressure</span>
                      <strong>1012 hPa</strong>
                    </div>
                  </div>
                  <div className="wp-metric-item">
                    <div className="metric-icon bg-light-yellow">☀️</div>
                    <div className="metric-text">
                      <span>UV Index</span>
                      <strong>Moderate</strong>
                    </div>
                  </div>
                </div>

                <div className="wp-ai-advice-box">
                  <div className="advice-header">
                    <span className="advice-icon">🤖</span>
                    <h4>AI Farming Advice</h4>
                  </div>
                  <p>{weather.advice}</p>
                </div>
              </>
            ) : (
              <div className="wp-empty-state">
                <div className="wp-empty-icon">🌍</div>
                <p>Search for a location to see detailed weather metrics and AI farming advice.</p>
              </div>
            )}
          </div>
        </div>

        {/* Column 3: Sidebar */}
        <div className="wp-col-sidebar">
          <div className="wp-sidebar-widget">
            <h3>4-Day Forecast</h3>
            <div className="wp-forecast-list">
              
              {/* YAHAN DYNAMIC MAP USE KIYA HAI */}
              {displayForecast.map((day, idx) => (
                <div key={idx} className="wp-forecast-item">
                  <span className="f-day">{day.day || day.date}</span>
                  <span className="f-icon">{day.icon || "☁️"}</span>
                  <span className="f-temp">{day.temp || `${day.temp_c}°C`}</span>
                </div>
              ))}
              
            </div>
          </div>

          <div className="wp-sidebar-widget tips-widget">
            <h3>Weather Tips</h3>
            <ul>
              <li><span className="wp-check-icon">✓</span> Avoid spraying pesticides on windy days.</li>
              <li><span className="wp-check-icon">✓</span> Skip irrigation if heavy rain is forecasted.</li>
              <li><span className="wp-check-icon">✓</span> Protect young saplings during extreme heat.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

export default WeatherPage;