import { useState, useRef } from "react";
import PageHeader from "../../components/common/PageHeader";
import { analyzeCropDisease } from "../../services/cropDiseaseService";

function CropDoctorPage() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null); // Reset result on new image
  };

  const handleAnalyze = async () => {
    if (!image) return;

    setLoading(true);

    try {
      const data = await analyzeCropDisease(image);
      setResult(data);
    } catch (error) {
      setResult({
        disease: "Analysis failed",
        confidence: "low",
        symptoms: ["Server connection failed"],
        solution: ["Check backend server and try again"],
        warning: "Unable to analyze image right now.",
      });
    } finally {
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const commonIssues = [
    { icon: "🍃", name: "Leaf Spot" },
    { icon: "🍌", name: "Yellowing" },
    { icon: "🥀", name: "Wilt Disease" },
    { icon: "🐛", name: "Pest Attack" },
    { icon: "❄️", name: "Powdery Mildew" },
    { icon: "🍂", name: "Rust" },
    { icon: "🌿", name: "Stem Rot" },
    { icon: "🍅", name: "Fruit Rot" },
  ];

  const recentDiagnoses = [
    { crop: "Tomato", issue: "Tomato Leaf Curl", time: "2 hours ago", status: "Treating", statusColor: "green", img: "🍅" },
    { crop: "Rice", issue: "Rice Brown Spot", time: "1 day ago", status: "Identified", statusColor: "orange", img: "🌾" },
    { crop: "Chilli", issue: "Chilli Anthracnose", time: "2 days ago", status: "Treating", statusColor: "green", img: "🌶️" },
    { crop: "Cotton", issue: "Cotton Jassid", time: "3 days ago", status: "Treating", statusColor: "green", img: "☁️" },
  ];

  return (
    <div className="crop-doctor-wrapper">
      {/* Page Header Area */}
      <div className="cd-header-area">
        <div className="cd-header-text">
          <div className="cd-title-row">
            <span className="cd-main-icon">🩺</span>
            <h1>Crop Doctor</h1>
          </div>
          <p>Diagnose plant problems and get expert solutions powered by AI</p>
        </div>
        <div className="ai-powered-badge">✨ AI Powered</div>
      </div>

      {/* Hero Banner */}
      <div className="cd-hero-banner">
        <div className="cd-hero-content">
          <h2>Healthy Crops, Higher Yields 🌱</h2>
          <p>Upload a clear image of your crop or affected plant part. Our AI will identify the problem and suggest the best solution.</p>
        </div>
        <div className="cd-hero-illustration">
          <div className="scan-phone-mockup">
            <div className="scan-screen">
              <span className="scan-leaf">🌿</span>
              <div className="scan-line"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main 3-Column Grid */}
      <div className="cd-main-grid">
        
        {/* Column 1: Upload Section */}
        <div className="cd-col-upload">
          <h3 className="cd-section-title">1. Upload Crop Image</h3>
          <p className="cd-section-sub">Upload a clear image of the affected plant or leaf</p>
          
          <div className="cd-upload-card">
            <input 
              type="file" 
              accept="image/jpeg, image/png, image/webp" 
              style={{ display: "none" }} 
              ref={fileInputRef} 
              onChange={handleImageChange} 
            />
            
            {preview ? (
              <div className="cd-preview-container">
                <img src={preview} alt="Crop preview" className="cd-preview-img" />
                <button className="cd-change-btn" onClick={triggerFileInput}>Change Image</button>
              </div>
            ) : (
              <div className="cd-dropzone" onClick={triggerFileInput}>
                <div className="cd-drop-icon">☁️</div>
                <p className="cd-drop-text">Drag & drop an image here<br/>or</p>
                <button className="cd-choose-btn">Choose File</button>
                <span className="cd-format-text">JPG, PNG, WEBP up to 10MB</span>
              </div>
            )}
          </div>

          <div className="cd-tips-box">
            <h4>💡 Tips for better results</h4>
            <ul>
              <li><span className="check-icon">✓</span> Use clear and focused images</li>
              <li><span className="check-icon">✓</span> Capture affected part of the plant</li>
              <li><span className="check-icon">✓</span> Good lighting helps AI accuracy</li>
            </ul>
          </div>

          <button 
            className="cd-analyze-btn" 
            onClick={handleAnalyze} 
            disabled={!image || loading}
          >
            {loading ? "Analyzing Image..." : "Analyze Crop 🔍"}
          </button>

          {/* Common Issues Horizontal Scroll */}
          <div className="cd-common-issues">
            <h4>Common Issues We Detect</h4>
            <div className="cd-issues-scroll">
              <button className="cd-scroll-btn left">❮</button>
              <div className="cd-issues-list">
                {commonIssues.map((issue, idx) => (
                  <div key={idx} className="cd-issue-item">
                    <span className="issue-icon">{issue.icon}</span>
                    <span className="issue-name">{issue.name}</span>
                  </div>
                ))}
              </div>
              <button className="cd-scroll-btn right">❯</button>
            </div>
          </div>
        </div>

        {/* Column 2: Diagnosis & Solutions */}
        <div className="cd-col-results">
          
          <h3 className="cd-section-title">2. Diagnosis Result</h3>
          <div className="cd-diagnosis-card">
            {!result && !loading ? (
              <div className="cd-empty-state">
                <div className="cd-empty-icon">🔍</div>
                <p>Upload an image and click 'Analyze Crop' to see the diagnosis result here.</p>
              </div>
            ) : loading ? (
              <div className="cd-loading-state">
                <div className="cd-spinner"></div>
                <p>AI is analyzing your crop...</p>
              </div>
            ) : (
              <div className="cd-result-content">
                <h4 className="disease-name">🚨 {result.disease || "Unknown Issue"}</h4>
                <div className="confidence-bar">
                  <div className="conf-fill" style={{ width: result.confidence === 'low' ? '30%' : '85%' }}></div>
                </div>
                <p className="conf-text">Confidence: {result.confidence || "High"}</p>
              </div>
            )}
          </div>

          <h3 className="cd-section-title" style={{ marginTop: '24px' }}>3. Recommended Solutions</h3>
          <div className="cd-solutions-list">
            <div className="cd-sol-item">
              <div className="sol-icon bg-light-green">💊</div>
              <div className="sol-text">
                <h4>Treatment</h4>
                <p>Suggested chemicals and organic solutions</p>
              </div>
              <div className="sol-arrow">›</div>
            </div>
            <div className="cd-sol-item">
              <div className="sol-icon bg-light-green">🛡️</div>
              <div className="sol-text">
                <h4>Prevention</h4>
                <p>How to prevent this problem in future</p>
              </div>
              <div className="sol-arrow">›</div>
            </div>
            <div className="cd-sol-item">
              <div className="sol-icon bg-light-green">❤️</div>
              <div className="sol-text">
                <h4>Care Tips</h4>
                <p>Best practices for healthy crop growth</p>
              </div>
              <div className="sol-arrow">›</div>
            </div>
            <div className="cd-sol-item">
              <div className="sol-icon bg-light-green">🛍️</div>
              <div className="sol-text">
                <h4>Products</h4>
                <p>Recommended products (seeds, fertilizers, pesticides)</p>
              </div>
              <div className="sol-arrow">›</div>
            </div>
          </div>
        </div>

        {/* Column 3: Sidebar */}
        <div className="cd-col-sidebar">
          
          <div className="cd-sidebar-widget">
            <h3>Recent Diagnoses</h3>
            <div className="cd-history-list">
              {recentDiagnoses.map((item, idx) => (
                <div key={idx} className="cd-history-item">
                  <div className="hist-img">{item.img}</div>
                  <div className="hist-info">
                    <h4>{item.issue}</h4>
                    <p>{item.crop} • {item.time}</p>
                  </div>
                  <div className={`hist-badge ${item.statusColor}`}>
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
            <button className="cd-view-all-btn">⏱ View All History</button>
          </div>

          <div className="cd-expert-widget">
            <h3>Need Expert Help?</h3>
            <p>Still not sure about the problem?<br/>Talk to our agriculture experts.</p>
            <button className="cd-expert-btn">💬 Connect with Expert</button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default CropDoctorPage;