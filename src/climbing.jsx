import React, { useEffect, useState } from "react";
import "./climbing.css";

function getDailyIndex(arrayLength) {
  const epoch = new Date("2025-01-01").getTime();
  const today = new Date().getTime();
  return Math.floor((today - epoch) / (1000 * 60 * 60 * 24)) % arrayLength;
}

function App() {
  const [videoList, setVideoList] = useState([]);
  const [guess, setGuess] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [picked, setPicked] = useState(null);

  useEffect(() => {
    fetch("/video-data.json")
      .then((r) => r.json())
      .then((list) => {
        setVideoList(list);
        if (list.length > 0) {
          const idx = getDailyIndex(list.length);
          setPicked(list[idx]);
        }
      });
  }, []);

  const handleSubmit = () => {
    setSubmitted(true);
    if (guess.trim().toUpperCase() === picked.grade.toUpperCase()) {
      setFeedback("Correct! You nailed it.");
    } else {
      setFeedback('Incorrect. The grade was ');
      // ${picked.grade}
    }
  };

  if (!picked) return <div>Loading...</div>;

  return (
    <div className="style-container">
      <div className="style-box">
      <h1 className="style-title">Guess the Climbing Grade</h1>
      <div className="video-wrapper">
      <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${picked.id}`}
            title="Climbing video"
            frameBorder="0"
            allowFullScreen
          />
      </div>
      <form onSubmit={handleSubmit} className="guess-form">
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter your guess (e.g., V5)"
            className="guess-input"
          />
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>

        {submitted && <p className="feedback">{feedback}</p>}
      </div>
    </div>
  );
};

export default climbing;
     
