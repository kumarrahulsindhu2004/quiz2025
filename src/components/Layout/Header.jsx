import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Menu, X } from "lucide-react"; // modern icons
import "./Header.css";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false); // profile dropdown
  const [mobileMenu, setMobileMenu] = useState(false); // hamburger toggle
  const navigate = useNavigate();

  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : "";

  const handleProfileClick = () => {
    setShowMenu(false);
    navigate("/profile");
  };

  // Close mobile menu when navigating
  const handleNavClick = () => setMobileMenu(false);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".profile-section")) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="logo">BBMK</div>

      {/* Hamburger icon for mobile */}
      <div className="hamburger" onClick={() => setMobileMenu(!mobileMenu)}>
        {mobileMenu ? <X size={26} /> : <Menu size={26} />}
      </div>

      {/* Navigation links */}
      <nav className={`nav ${mobileMenu ? "nav-active" : ""}`}>
        <Link to="/" onClick={handleNavClick}>Home</Link>
        <Link to="/about" onClick={handleNavClick}>About Us</Link>
        <Link to="/courses" onClick={handleNavClick}>Courses</Link>
        <Link to="/blog" onClick={handleNavClick}>Blog</Link>
        <Link to="/contact" onClick={handleNavClick}>Contact</Link>

        {/* Auth buttons for mobile (inside nav) */}
        {!user && (
          <div className="mobile-auth">
            <Link to="/login" onClick={handleNavClick}>
              <button className="login-btn">Login</button>
            </Link>
            <Link to="/register" onClick={handleNavClick}>
              <button className="register-btn">Register</button>
            </Link>
          </div>
        )}
      </nav>

      {/* Desktop Auth/Profile */}
      <div className="auth-buttons">
        {!user ? (
          <>
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
            <Link to="/register">
              <button className="register-btn">Register</button>
            </Link>
          </>
        ) : (
          <div
            className="profile-section"
            onClick={() => setShowMenu(!showMenu)}
          >
            <div className="profile-avatar">{firstLetter}</div>

            {showMenu && (
              <div className="profile-menu">
                <div className="menu-item" onClick={handleProfileClick}>
                  Profile
                </div>
                <div className="menu-item logout" onClick={logout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
