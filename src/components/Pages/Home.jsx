import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <main className="main-section">
        <div className="main-left">
          <h1 className="main-title">
            Build Your Skills on the <span className="highlight">Best</span> Platform
          </h1>

          <p className="main-description">
            Join the Binod Bihari Mahato Mission Quiz Competition! Challenge yourself, compete with peers, and skill up to reach new heights.
          </p>

          <div className="main-buttons">
            <Link to="/register">
              <button className="get-started-btn">Register</button>
            </Link>
            <button className="video-btn">Get Start</button>
          </div>

          <div className="students">
            <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="student1" />
            <img src="https://randomuser.me/api/portraits/women/2.jpg" alt="student2" />
            <img src="https://randomuser.me/api/portraits/men/3.jpg" alt="student3" />
            <span>10,000+ Active Students</span>
          </div>
        </div>

        <div className="main-right">
          <img
            src="https://img.freepik.com/free-photo/front-view-young-beautiful-lady-red-t-shirt-black-jeans-holding-different-copybooks-files-smiling-with-bag-white_140725-18639.jpg?semt=ais_hybrid&w=740&q=80"
            alt="student"
          />
        </div>
      </main>
    </div>
  );
}

export default Home;
