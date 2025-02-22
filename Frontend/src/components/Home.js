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
              Our swim program is dedicated to enhancing performance through
              data-driven analysis. We help athletes refine their techniques and
              improve their swimming.
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
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Meet Our Team
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          The swimmers under are the swimmers who are teaching the machine
          learning model and analyzing the swimming using the Flex app.{" "}
        </motion.p>
      </div>

      {/* Swimmer Profiles Section */}
      <div className="image-section-wrapper">
        <div className="image-section">
          {[
            {
              name: "Andrea Savoca",
              role: "Breaststroke & IM Specialist",
              img: "Pic/andrea.png",
            },
            { name: "AJ Wong", role: "Breaststroke Expert", img: "Pic/aj.png" },
            {
              name: "Felix Jedbratt",
              role: "Sprint Freestyle & Fly Expert",
              img: "Pic/felix.png",
            },
            {
              name: "Tori Fenn",
              role: "Sprint Freestyle & Fly Expert",
              img: "Pic/tori.png",
            },
            {
              name: "Heather Levesque",
              role: "Breaststroke & IM Specialist",
              img: "Pic/Heather.png",
            },
            {
              name: "DanDan Eskelund",
              role: "Sprint Freestyle & Relay Anchor",
              img: "Pic/dandan.png",
            },
            {
              name: "Noah Juhlin Fredriksson",
              role: "Butterfly & Freestyle Power",
              img: "Pic/noah.png",
            },
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
      <div className="swimmer-description-section">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Analysis
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          The Analysis Section is designed to showcase a data visualization with a clear title and description, ensuring it is visually appealing and easy to read. The implementation follows a structured and responsive layout to maintain alignment, readability, and full-width presentation.{" "}
        </motion.p>
      </div>

      <div className="Anylsis-section-wrapper">
        <div className="image-section-Anylsis">
          {[
            {
              name: "Analysis of Distance VS Date Of Swimming",
              img: "Pic/Analysis1.png",
              desc: "The data demonstrates a broad range of total distances per session, spanning from approximately 1,000 meters to 7,000 meters.",
            },
            {
              name: "Analysis of Calories Burned vs. Total Distance",
              img: "Pic/Anaylsis2.png",
              desc: "This graph represents the relationship between Total Distance (yards) and Calories Burned (kcal) in a swimming workout.",
            },
            {
              name: "Analysis of Calories Burned vs. Total Distance With Domain Stroke ",
              img: "Pic/Ana3.png",
              desc: "This aligns with the expected physiological effect that greater swimming distance leads to higher energy.",
            },
            {
              name: "Analysis of the Correlation Heatmap for Age vs. Other Metrics",
              img: "Pic/heatmap.png",
              desc: "The heatmap displays the correlation values between Age, Total_Time, Calories_Burned, and Max_HR (BPM), AVG_HR, Training load, splash score, Total Distance. Correlation values range from -1 to +1, where: +1.00 → Perfect positive correlation (when one variable increases, the other increases). -1.00 → Perfect negative correlation (when one variable increases, the other decreases). 0.00 → No correlation (no relationship between the variables).",
            },
          ].map((Analysis, index) => (
            <div className="Analysis-card" key={index}>
              {/* Left - Image */}
              <img
                src={Analysis.img}
                alt={Analysis.name}
                className="analysis-image"
              />

              {/* Right - Name + Description */}
              <div className="analysis-text">
                <p className="Analysis-name">{Analysis.name}</p>
                <p className="Analysis-description">{Analysis.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="swimmer-description-section">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Machine Learning
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          The Analysis Section is designed to showcase a data visualization with a clear title and description, ensuring it is visually appealing and easy to read. The implementation follows a structured and responsive layout to maintain alignment, readability, and full-width presentation.{" "}
        </motion.p>
      </div>

      <div className="Anylsis-section-wrapper">
        <div className="image-section-Anylsis">
          {[
            {
              name: "Machine Learning - Linear Regression in Performance Prediction",
              img: "Pic/linear.png",
              desc: "Linear regression is a supervised machine learning algorithm used for predicting continuous variables by modeling the relationship between dependent and independent variables. It operates by fitting a straight-line equation to the given data.",
            },
            {
              name: "Machine Learning - Decision Tree in the same Performance Prediction",
              img: "Pic/decisiontree.png",
              desc: "A decision tree is a structure that organizes rules to help make decisions. It can be used for decision-making in business or for machine learning, first plotting Decision Tree Feature Importance values."
            },
            {
              name: "Machine Learning -Random Forest in the same Performance Prediction",
              img: "Pic/randomforest.png",
              desc: "A Random Forest algorithm is a supervised machine learning technique that combines multiple decision trees to make predictions."
            },
            {
              name:"Machine Learning - Neural Network in Performance Prediction:",
              img: "Pic/deeplearn.png",
              desc:"A neural network is a type of artificial intelligence (AI) that uses a network of interconnected nodes to process data. Neural networks are inspired by the human brain."
            }
          ].map((Analysis, index) => (
            <div className="Analysis-card" key={index}>
              {/* Left - Image */}
              <img
                src={Analysis.img}
                alt={Analysis.name}
                className="analysis-image"
              />

              {/* Right - Name + Description */}
              <div className="analysis-text">
                <p className="Analysis-name">{Analysis.name}</p>
                <p className="Analysis-description">{Analysis.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ML-explain">
        <h2 className="ml-title">Track Your Progress With DataBase</h2>
        <div className="ml-categories">
          <div className="ml-category">
            <h3>Swimmer</h3>
            <ul>
              <li><span className="checkmark">✅</span> ID</li>
              <li><span className="checkmark">✅</span> Name</li>
              <li><span className="checkmark">✅</span> Age</li>
              <li><span className="checkmark">✅</span> Gender</li>
            </ul>
          </div>
          <div className="ml-category">
            <h3>Values</h3>
            <ul>
              <li><span className="checkmark">✅</span> Backstroke</li>
              <li><span className="checkmark">✅</span> Freestyle</li>
              <li><span className="checkmark">✅</span> Butterfly</li>
              <li><span className="checkmark">✅</span> Breaststroke</li>
              <li><span className="checkmark">✅</span> Kick</li>
              <li><span className="checkmark">✅</span> Total Time</li>
              <li><span className="checkmark">✅</span> Total Distance</li>
              <li><span className="checkmark">✅</span> Calories Burned</li>
              <li><span className="checkmark">✅</span> Splash Score</li>
              <li><span className="checkmark">✅</span> Training Load</li>
              <li><span className="checkmark">✅</span> Average HR</li>
              <li><span className="checkmark">✅</span> Max HR</li>
            </ul>
          </div>
          <div className="ml-category">
            <h3>Practice</h3>
            <ul>
              <li><span className="checkmark">✅</span> Practice ID</li>
              <li><span className="checkmark">✅</span> Date</li>
            </ul>
          </div>

        </div>
      </div>
      <hr class="bottom-line"></hr>

    </>
  );
};

export default Home;
