import React from "react";
import "./CSS/Swimmer.css"; // Import styling

const Swimmer = () => {
  return (
    <div className="swimmer-container">
      <div className="swimmer-text-bar">
        <h2>Swimmer Training Program</h2>
        <p>
          Our swimmers undergo high-intensity training designed to improve technique,
          endurance, and speed. We provide personalized training plans based on performance
          analytics.
        </p>

        {/* Video Section for Swimmers */}
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/your_swimmer_video1"
            title="Swimmer Training"
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/your_swimmer_video2"
            title="Advanced Swim Techniques"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Swimmer;
