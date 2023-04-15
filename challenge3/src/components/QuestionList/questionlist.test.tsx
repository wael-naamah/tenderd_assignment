import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import QuestionList from ".";

const questions = [
  {
    question: "Question 1",
    answer: "Answer 1",
  },
  {
    question: "Question 2",
    answer: "Answer 2",
  },
  {
    question: "Question 3",
    answer: "Answer 3",
  },
];

describe("QuestionList", () => {
  test("does not render any questions if empty array is provided", () => {
    render(<QuestionList questions={[]} />);
    const questionElements = screen.queryAllByText(/question/i);
    expect(questionElements.length).toBe(0);
  });

  it("renders all questions", () => {
    render(<QuestionList questions={questions} />);
    questions.forEach((q) => {
      const questionEl = screen.getByText(q.question);
      expect(questionEl).toBeInTheDocument();
    });
  });

  it("shows confirmation dialog with two buttons after clicking 'Show Answer'", async () => {
    render(<QuestionList questions={questions} />);

    const showAnswerButtons = screen.queryAllByText(/show answer/i);
    const firstShowAnswerButton = showAnswerButtons[0];
    fireEvent.click(firstShowAnswerButton);

    const confirmationText = await screen.findByText(`Reveal the answer?`);
    expect(confirmationText).toBeInTheDocument();

    const confirmationButton = screen.getByText("Yes Please");
    expect(confirmationButton).toBeInTheDocument();

    const cancelButton = screen.getByText("Not Yet");
    expect(cancelButton).toBeInTheDocument();
  });

  it("reveals answer after clicking on the 'Show Answer' button and confirming", async () => {
    render(<QuestionList questions={questions} />);
    const firstQuestion = questions[0];
    const showAnswerButtons = screen.queryAllByText(/show answer/i);
    const firstShowAnswerButton = showAnswerButtons[0];
    fireEvent.click(firstShowAnswerButton);
    const confirmationButton = screen.getByText(/yes please/i);
    fireEvent.click(confirmationButton);
    const answerEl = await screen.findByText(firstQuestion.answer);
    expect(answerEl).toBeInTheDocument();
  });

  it("cancels answer reveal after clicking on the 'Not Yet' button in the confirmation dialog", async () => {
    render(<QuestionList questions={questions} />);
    const firstQuestion = questions[0];
    const showAnswerButtons = screen.queryAllByText(/show answer/i);
    const firstShowAnswerButton = showAnswerButtons[0];
    fireEvent.click(firstShowAnswerButton);
    const cancelButton = screen.getByText(/not yet/i);
    fireEvent.click(cancelButton);
    const answerEl = screen.queryByText(firstQuestion.answer);
    expect(answerEl).not.toBeInTheDocument();
  });

  it("disables the 'Show Answer' button after the answer is revealed", async () => {
    render(<QuestionList questions={questions} />);
    const firstQuestion = questions[0];
    const showAnswerButtons = screen.queryAllByText(/show answer/i);
    const firstShowAnswerButton = showAnswerButtons[0];
    fireEvent.click(firstShowAnswerButton);
    const confirmationButton = screen.getByText(/yes please/i);
    fireEvent.click(confirmationButton);
    await screen.findByText(firstQuestion.answer);
    expect(firstShowAnswerButton).toHaveAttribute("disabled");
  });
});
