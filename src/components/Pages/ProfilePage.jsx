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

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="avatar-circle">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>User ID: {user._id}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
