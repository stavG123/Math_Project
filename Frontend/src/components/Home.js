import React from "react";
import "./CSS/Home.css"; // Import CSS for styling

const Home = () => {
  return (
    <div className="home-container">
      <div className="content">
        {/* Left Section - Text */}
        <div className="text-section">
          <h2>Welcome to La Salle Swim Program</h2>
          <p>
            Our swim program is dedicated to enhancing performance through data-driven analysis.
            We help athletes refine their techniques and improve their endurance. Explore our training
            videos to see how we help swimmers achieve their best results.
          </p>
        </div>

        {/* Right Section - Video */}
        <div className="video-section">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/your_video_id"
            title="La Salle Swimming Training"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Home;
