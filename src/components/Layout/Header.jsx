import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Menu, X } from "lucide-react";
import "./Header.css";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();

  const firstLetter =
    user?.firstName?.charAt(0).toUpperCase() ||
    user?.name?.charAt(0).toUpperCase() ||
    "";

  const handleProfileClick = () => {
    setShowMenu(false);
    navigate("/profile");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".profile-section") &&
        !e.target.closest(".mobile-profile")
      ) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header fixed-header">
      {/* ✅ Logo */}
      <div className="logo">BBMK</div>

      {/* ✅ Navigation Links */}
      <nav className={`nav ${mobileMenu ? "nav-active" : ""}`}>
        <Link to="/" onClick={() => setMobileMenu(false)}>
          Home
        </Link>
        <Link to="/about" onClick={() => setMobileMenu(false)}>
          About Us
        </Link>
        <Link to="/courses" onClick={() => setMobileMenu(false)}>
          Courses
        </Link>
        <Link to="/blog" onClick={() => setMobileMenu(false)}>
          Blog
        </Link>
        <Link to="/contact" onClick={() => setMobileMenu(false)}>
          Contact
        </Link>

        {/* ✅ Auth buttons (Mobile Only) */}
        {!user && (
          <div className="mobile-auth">
            <Link to="/login" onClick={() => setMobileMenu(false)}>
              <button className="login-btn">Login</button>
            </Link>
            <Link to="/register" onClick={() => setMobileMenu(false)}>
              <button className="register-btn">Register</button>
            </Link>
          </div>
        )}
      </nav>

      {/* ✅ Desktop Profile / Auth */}
      <div className="auth-buttons desktop-only">
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
          <div className="profile-section" onClick={() => setShowMenu(!showMenu)}>
            <div className="profile-avatar">
              {user?.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt="Profile"
                  className="avatar-img"
                  onError={(e) => (e.target.style.display = "none")}
                />
              ) : (
                firstLetter
              )}
            </div>

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

      {/* ✅ Mobile Header Right (Visible Only on Small Screens) */}
      <div className="header-right mobile-only">
        {user && (
          <div className="mobile-profile">
            <div
              className="profile-avatar"
              onClick={() => setShowMenu(!showMenu)}
            >
              {user?.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt="Profile"
                  className="avatar-img"
                  onError={(e) => (e.target.style.display = "none")}
                />
              ) : (
                firstLetter
              )}
            </div>
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

        {/* ✅ Hamburger Toggle */}
        <div className="hamburger" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X size={26} /> : <Menu size={26} />}
        </div>
      </div>
    </header>
  );
}

export default Header;
