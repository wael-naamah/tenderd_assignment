import React, { useState } from "react";
import Confirmation from "../Confirmation";
import "./index.scss";

interface QuestionContainerProps {
  question: string;
  answer: string;
}

interface QuestionListProps {
  questions: QuestionContainerProps[];
}

const QuestionContainer: React.FC<QuestionContainerProps> = ({
  question,
  answer,
}) => {
  const [isConfirmationVisible, setIsConfirmationVisible] =
    useState<Boolean>(false);
  const [isAnswerVisible, setIsAnswerVisible] = useState<Boolean>(false);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<Boolean>(false);

  const showAnswerButtonRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (showAnswerButtonRef.current && isAnswerRevealed) {
      showAnswerButtonRef.current.setAttribute("disabled", "");
    }
  }, [isAnswerRevealed]);

  const handleShowAnswer = () => {
    setIsConfirmationVisible(true);
  };

  const handleAccept = () => {
    setIsConfirmationVisible(false);
    setIsAnswerVisible(true);
    setIsAnswerRevealed(true);
  };

  const handleDecline = () => {
    setIsConfirmationVisible(false);
  };

  return (
    <div className="container">
      {isConfirmationVisible ? (
        <Confirmation
          message="Reveal the answer?"
          accept={handleAccept}
          decline={handleDecline}
          type="message"
        />
      ) : null}
      <p className="question">{question}</p>

      <div
        ref={showAnswerButtonRef}
        className="btn btn-primary show-answer"
        onClick={handleShowAnswer}
      >
        Show Answer
      </div>

      {isAnswerVisible ? <p className="answer">{answer}</p> : null}
    </div>
  );
};

const QuestionList: React.FC<QuestionListProps> = ({ questions }) => {
  return (
    <div>
      {questions.map(({ question, answer }) => (
        <QuestionContainer key={question} question={question} answer={answer} />
      ))}
    </div>
  );
};

export default QuestionList;
