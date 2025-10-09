import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="profile-container">
        <h2>Please log in to view your profile.</h2>
      </div>
    );
  }

  // ✅ Handle both possible structures safely
  const displayName =
    user.firstName || user.name || "User";

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="avatar-circle">
          {displayName.charAt(0).toUpperCase()}
        </div>
        <h2>
          {user.firstName} {user.middleName} {user.lastName}
        </h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Mobile:</strong> {user.mobile}</p>
        <p><strong>User ID:</strong> {user._id}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
