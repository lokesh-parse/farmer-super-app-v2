import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">🌾 Farmer Super App</h2>

      <nav className="nav-links">

        {/* Dashboard */}
        <NavLink to="/app/dashboard">
          📊 Dashboard
        </NavLink>

        {/* AI Tools */}
        <NavLink to="/app/chat">
          🤖 AI Chat
        </NavLink>

        <NavLink to="/app/crop-doctor">
          🩺 Crop Doctor
        </NavLink>

        <NavLink to="/app/crop-advisory">
          🌱 Crop Advisory
        </NavLink>

        <NavLink to="/app/weather">
          🌦 Weather
        </NavLink>

        {/* Learning */}
        <NavLink to="/app/learning-hub">
          📚 Learning Hub
        </NavLink>

        {/* Farm Management */}
        <NavLink to="/app/farm-records">
          📋 Farm Records
        </NavLink>

        <NavLink to="/app/profit-calculator">
          💰 Profit Calculator
        </NavLink>

        {/* Market */}
        <NavLink to="/app/market">
          📈 Market Prices
        </NavLink>

        <NavLink to="/app/marketplace">
          🛒 Marketplace
        </NavLink>

        {/* Community */}
        <NavLink to="/app/community">
          👨‍🌾 Community
        </NavLink>

        {/* Government */}
        <NavLink to="/app/government-schemes">
          🏛 Government Schemes
        </NavLink>

        {/* User */}
        <NavLink to="/app/profile">
          👤 Profile
        </NavLink>

        {/* Admin */}
        <NavLink to="/app/admin">
          ⚙ Admin
        </NavLink>

      </nav>
    </aside>
  );
}

export default Sidebar;