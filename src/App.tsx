import { useState } from "react";
import "./App.css";
import { generateQuestion, evaluateAnswer } from "./api";

function App() {
  const [topic, setTopic] = useState("Math");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const fetchQuestion = async () => {
    const { q, choices } = await generateQuestion(topic);
    setQuestion(q);
    setOptions(choices);
    setUserAnswer("");
    setFeedback("");
  };

  const checkAnswer = async () => {
    const response = await evaluateAnswer(question, userAnswer);
    setFeedback(response);
  };

  return (
    <div className="app">
      <h1>TutorBuddyAI</h1>

      <div>
        <label>
          Topic:
          <select value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option value="Math">Math</option>
            <option value="History">History</option>
            <option value="Science">Science</option>
          </select>
        </label>
        <button onClick={fetchQuestion}>Start</button>
      </div>

      {question && (
        <div className="question-box">
          <p>{question}</p>
          <ul>
            {options.map((opt, i) => (
              <li key={i}>
                <label>
                  <input
                    type="radio"
                    name="answer"
                    value={opt}
                    checked={userAnswer === opt}
                    onChange={(e) => setUserAnswer(e.target.value)}
                  />
                  {opt}
                </label>
              </li>
            ))}
          </ul>
          <button onClick={checkAnswer} disabled={!userAnswer}>
            Submit Answer
          </button>
        </div>
      )}

      {feedback && (
        <div className="feedback-box">
          <h3>Feedback</h3>
          <p>{feedback}</p>
          <button onClick={fetchQuestion}>Next Question</button>
        </div>
      )}
    </div>
  );
}

export default App;
