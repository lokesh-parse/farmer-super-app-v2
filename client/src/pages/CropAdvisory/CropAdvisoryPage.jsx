import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import { getCropAdvisory } from "../../services/cropAdvisoryService";

function CropAdvisoryPage() {
  const [form, setForm] = useState({
    cropName: "",
    season: "",
    location: "Nagpur, Maharashtra",
    growthStage: "",
    problem: "",
  });

  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await getCropAdvisory(form);
      setAdvice(data);
    } catch (error) {
      console.error("Advisory fetch failed", error);
    } finally {
      setLoading(false);
    }
  };

  const recentAdvisories = [
    { crop: "Tomato", issue: "Leaf Curl Problem", time: "2 hours ago", img: "🍅", badge: "New", color: "green" },
    { crop: "Rice", issue: "Yellowing Leaves", time: "1 day ago", img: "🌾", badge: "Moderate", color: "yellow" },
    { crop: "Wheat", issue: "Rust Disease", time: "2 days ago", img: "🌾", badge: "Moderate", color: "yellow" },
    { crop: "Cotton", issue: "Aphid Infestation", time: "3 days ago", img: "☁️", badge: "Low", color: "light-green" },
  ];

  const popularCrops = [
    { icon: "🌾", name: "Wheat" }, { icon: "🌾", name: "Rice" }, { icon: "🌽", name: "Maize" },
    { icon: "☁️", name: "Cotton" }, { icon: "🫘", name: "Soybean" }, { icon: "🍅", name: "Tomato" },
    { icon: "🥔", name: "Potato" }, { icon: "🧅", name: "Onion" }, { icon: "🌶️", name: "Chili" },
    { icon: "🍇", name: "Grapes" }
  ];

  return (
    <div className="ca-page-wrapper">
      <PageHeader
        title="Crop Advisory"
        subtitle="Get AI-powered crop recommendations and practical advice"
        icon="🌱"
      />

      {/* Hero Banner */}
      <div className="ca-hero-banner">
        <div className="ca-hero-content">
          <h2>Smart Advice for Better Farming 🍃</h2>
          <p>Share your crop details and get AI-powered recommendations to improve yield and profitability.</p>
        </div>
        
        <div className="ca-hero-center">
          <div className="ca-phone-mockup">
            <div className="ca-screen">
              <span className="ca-app-title">AI Advice</span>
              <div className="ca-plant-icon">🌱</div>
              <div className="ca-mock-lines">
                <div className="ca-line"></div>
                <div className="ca-line short"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="ca-hero-features">
          <div className="ca-feat">
            <div className="ca-feat-icon bg-light-green">📈</div>
            <div className="ca-feat-text">
              <strong>Higher Productivity</strong>
              <span>Improve crop yield</span>
            </div>
          </div>
          <div className="ca-feat">
            <div className="ca-feat-icon bg-light-green">💰</div>
            <div className="ca-feat-text">
              <strong>Cost Effective</strong>
              <span>Reduce input costs</span>
            </div>
          </div>
          <div className="ca-feat">
            <div className="ca-feat-icon bg-light-green">🛡️</div>
            <div className="ca-feat-text">
              <strong>Disease Prevention</strong>
              <span>Stay ahead of problems</span>
            </div>
          </div>
          <div className="ca-feat">
            <div className="ca-feat-icon bg-light-green">👨‍🌾</div>
            <div className="ca-feat-text">
              <strong>Expert Guidance</strong>
              <span>AI + Agriculture Experts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 3-Column Grid */}
      <div className="ca-main-grid">
        
        {/* Column 1: Input Form */}
        <div className="ca-col-form">
          <h3 className="ca-section-title">1. Crop Information</h3>
          <p className="ca-section-sub">Enter details about your crop and field</p>

          <form className="ca-form-card" onSubmit={handleSubmit}>
            <div className="ca-form-row">
              <div className="ca-input-group">
                <label>Crop Name</label>
                <select name="cropName" value={form.cropName} onChange={handleChange} required>
                  <option value="">Select or enter crop name</option>
                  <option value="Tomato">Tomato</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Soybean">Soybean</option>
                </select>
              </div>
              <div className="ca-input-group">
                <label>Season</label>
                <select name="season" value={form.season} onChange={handleChange} required>
                  <option value="">Select season</option>
                  <option value="Kharif">Kharif</option>
                  <option value="Rabi">Rabi</option>
                  <option value="Zaid">Zaid</option>
                </select>
              </div>
            </div>

            <div className="ca-form-row">
              <div className="ca-input-group">
                <label>Location</label>
                <input type="text" name="location" placeholder="Enter your village, district or area" value={form.location} onChange={handleChange} required />
              </div>
              <div className="ca-input-group">
                <label>Growth Stage</label>
                <select name="growthStage" value={form.growthStage} onChange={handleChange}>
                  <option value="">Select growth stage</option>
                  <option value="Seedling">Seedling</option>
                  <option value="Vegetative">Vegetative</option>
                  <option value="Flowering">Flowering</option>
                  <option value="Fruiting">Fruiting</option>
                </select>
              </div>
            </div>

            <div className="ca-input-group">
              <label>Describe your crop problem (optional)</label>
              <textarea
                name="problem"
                placeholder="Tell us about your crop condition, issues or goals..."
                value={form.problem}
                onChange={handleChange}
                rows="4"
              />
              <span className="ca-char-count">{form.problem.length}/500</span>
            </div>

            <button type="submit" className="ca-submit-btn" disabled={loading}>
              {loading ? "Generating Advisory..." : "✨ Get Advisory"}
            </button>
          </form>
        </div>

        {/* Column 2: Advisory Result */}
        <div className="ca-col-result">
          <h3 className="ca-section-title">2. AI Advisory Result</h3>
          <p className="ca-section-sub">Personalized advice for your crop</p>

          <div className="ca-result-card">
            {!advice && !loading ? (
              <div className="ca-empty-state">
                <div className="ca-empty-icon">🧾</div>
                <h4>Your advisory will appear here</h4>
                <p>Fill the crop details and click<br/>'Get Advisory' to see AI recommendations</p>
              </div>
            ) : loading ? (
              <div className="ca-loading-state">
                <div className="ca-spinner"></div>
                <p>Analyzing farm data...</p>
              </div>
            ) : (
              <div className="ca-result-content">
                <h4>Advisory for {advice.cropName}</h4>
                <p><strong>Problem Identified:</strong> {advice.problem}</p>
                
                <h5>Possible Reason</h5>
                <p>{advice.possibleReason}</p>

                <h5>Recommended Solutions</h5>
                <ul className="ca-solution-list">
                  {advice.solution?.map((item, index) => (
                    <li key={index}><span className="check">✓</span> {item}</li>
                  ))}
                </ul>

                <h5>Precautions</h5>
                <ul className="ca-precaution-list">
                  {advice.precautions?.map((item, index) => (
                    <li key={index}><span className="warn">!</span> {item}</li>
                  ))}
                </ul>
                
                {advice.note && <div className="ca-note-box">💡 {advice.note}</div>}
              </div>
            )}
          </div>
        </div>

        {/* Column 3: Sidebar */}
        <div className="ca-col-sidebar">
          
          <div className="ca-sidebar-widget">
            <h3>Recent Advisories</h3>
            <div className="ca-history-list">
              {recentAdvisories.map((item, idx) => (
                <div key={idx} className="ca-history-item">
                  <div className="ca-hist-img">{item.img}</div>
                  <div className="ca-hist-info">
                    <h4>{item.crop}</h4>
                    <p>{item.issue} • {item.time}</p>
                  </div>
                  <div className={`ca-badge badge-${item.color}`}>
                    {item.badge}
                  </div>
                </div>
              ))}
            </div>
            <button className="ca-view-all-btn">⏱ View All History</button>
          </div>

          <div className="ca-sidebar-widget tips-widget">
            <h3>Tips for Better Results</h3>
            <ul>
              <li><span className="ca-check-icon">✓</span> Provide accurate crop and location details</li>
              <li><span className="ca-check-icon">✓</span> Upload clear images in Crop Doctor</li>
              <li><span className="ca-check-icon">✓</span> Follow recommendations regularly</li>
              <li><span className="ca-check-icon">✓</span> Monitor your crop and update information</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Horizontal Sections */}
      <div className="ca-bottom-sections">
        
        <div className="ca-includes-section">
          <h3 className="ca-section-title">3. Advisory Includes</h3>
          <div className="ca-includes-grid">
            <div className="ca-inc-card">
              <div className="ca-inc-icon bg-light-green">🔍</div>
              <div className="ca-inc-text">
                <h4>Problem Analysis</h4>
                <p>Identify issues and root causes</p>
              </div>
            </div>
            <div className="ca-inc-card">
              <div className="ca-inc-icon bg-light-green">📋</div>
              <div className="ca-inc-text">
                <h4>Recommended Actions</h4>
                <p>Step-by-step solutions to follow</p>
              </div>
            </div>
            <div className="ca-inc-card">
              <div className="ca-inc-icon bg-light-yellow">🌾</div>
              <div className="ca-inc-text">
                <h4>Fertilizer Advice</h4>
                <p>Best fertilizers and nutrient guidance</p>
              </div>
            </div>
            <div className="ca-inc-card">
              <div className="ca-inc-icon bg-light-green">🧪</div>
              <div className="ca-inc-text">
                <h4>Pesticide/Organic Solutions</h4>
                <p>Safe and effective pest management</p>
              </div>
            </div>
            <div className="ca-inc-card">
              <div className="ca-inc-icon bg-light-blue">💧</div>
              <div className="ca-inc-text">
                <h4>Irrigation Guidance</h4>
                <p>Optimal water usage recommendations</p>
              </div>
            </div>
            <div className="ca-inc-card">
              <div className="ca-inc-icon bg-light-green">📈</div>
              <div className="ca-inc-text">
                <h4>Expected Outcome</h4>
                <p>Expected results and yield improvement</p>
              </div>
            </div>
          </div>
        </div>

        <div className="ca-popular-crops">
          <div className="ca-pop-header">
            <h3>Popular Crops</h3>
            <a href="#">View all crops →</a>
          </div>
          <div className="ca-crops-list">
            {popularCrops.map((crop, idx) => (
              <div key={idx} className="ca-crop-chip">
                <span>{crop.icon}</span> {crop.name}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

export default CropAdvisoryPage;