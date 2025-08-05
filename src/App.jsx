import React, { useEffect, useState } from "react";
import "./CrimpdleClone.css";

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
    <div className="app">
      <h1>Guess That Climb!</h1>
      <iframe
        title="climb"
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${picked.id}`}
        allowFullScreen
      />
      {!submitted ? (
        <div>
          <input
            placeholder="Your guess (e.g. V7, 7b+)"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      ) : (
        <div>{feedback}</div>
      )}
    </div>
  );
}

export default App;
