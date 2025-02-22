import React from "react";
import { motion } from "framer-motion";
import "./CSS/Home.css"; // Import CSS for styling

const Home = () => {
  return (
    <>
      {/* Main Home Section */}
      <div className="home-container">
        <div className="content">
          <div className="text-section">
            <h2>Welcome to La Salle Swim Program</h2>
            <p className="program-description">
              Our swim program is dedicated to enhancing performance through data-driven analysis.
              We help athletes refine their techniques and improve their swimming.
            </p>
          </div>

          <div className="video-section">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/db4gvqYmMWM"
              title="La Salle Swimming Training"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* New Swimmer Description Section */}
      <div className="swimmer-description-section">
        <motion.h2 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          Meet Our Team
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}>
        The swimmers under are the swimmers who are teaching the machine learning model and analyzing the swimming using the Flex app.        </motion.p>
      </div>

      {/* Swimmer Profiles Section */}
      <div className="image-section-wrapper">
        <div className="image-section">
          {[
            { name: "Andrea Savoca", role: "Breaststroke & IM Specialist", img: "Pic/andrea.png" },
            { name: "AJ Wong", role: "Breaststroke Expert", img: "Pic/aj.png" },
            { name: "Felix Jedbratt", role: "Sprint Freestyle & Fly Expert", img: "Pic/felix.png" },
            { name: "Tori Fenn", role: "Sprint Freestyle & Fly Expert", img: "Pic/tori.png" },
            { name: "Heather Levesque", role: "Breaststroke & IM Specialist", img: "Pic/Heather.png" },
            { name: "DanDan Eskelund", role: "Sprint Freestyle & Relay Anchor", img: "Pic/dandan.png" },
            { name: "Noah Juhlin Fredriksson", role: "Butterfly & Freestyle Power", img: "Pic/noah.png" }
          ].map((swimmer, index) => (
            <div className="swimmer-card" key={index}>
              <motion.img
                src={swimmer.img}
                alt={swimmer.name}
                className="animated-image"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }} 
              />
              <motion.p
                className="swimmer-description"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.3 }}
              >
                {swimmer.name} - {swimmer.role}
              </motion.p>
            </div>
          ))}
        </div>
      </div>

      
    </>
  );
};

export default Home;
