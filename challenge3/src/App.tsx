import React from "react";
import "./index.scss";
import { QuestionList } from "./components";

const questions = [
  {
    question:
      "What is the average the airspeed velocity of a (European) unladen swallow?",
    answer: "11 meters per second",
  },
  {
    question: "What are the first 10 digits of PI?",
    answer: "3.141592653",
  },
];

function App() {
  return (
    <div id="app">
      <QuestionList questions={questions} />
    </div>
  );
}

export default App;
