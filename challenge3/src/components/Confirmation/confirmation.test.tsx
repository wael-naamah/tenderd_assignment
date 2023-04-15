import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Confirmation from ".";

describe("Confirmation component", () => {
  const message = "Reveal the answer?";
  const acceptMock = jest.fn();
  const declineMock = jest.fn();

  beforeEach(() => {
    acceptMock.mockClear();
    declineMock.mockClear();
  });

  it("should render the confirmation message", () => {
    render(
      <Confirmation
        message={message}
        accept={acceptMock}
        decline={declineMock}
      />
    );
    const confirmationMessage = screen.getByText(message);
    expect(confirmationMessage).toBeInTheDocument();
  });

  it("should render the accept and decline buttons", () => {
    render(
      <Confirmation
        message={message}
        accept={acceptMock}
        decline={declineMock}
      />
    );
    const acceptButton = screen.getByText("Yes Please");
    const declineButton = screen.getByText("Not Yet");
    expect(acceptButton).toBeInTheDocument();
    expect(declineButton).toBeInTheDocument();
  });

  it("should call the accept function when the accept button is clicked", () => {
    render(
      <Confirmation
        message={message}
        accept={acceptMock}
        decline={declineMock}
      />
    );
    const acceptButton = screen.getByText("Yes Please");
    fireEvent.click(acceptButton);
    expect(acceptMock).toHaveBeenCalledTimes(1);
  });

  it("should call the decline function when the decline button is clicked", () => {
    render(
      <Confirmation
        message={message}
        accept={acceptMock}
        decline={declineMock}
      />
    );
    const declineButton = screen.getByText("Not Yet");
    fireEvent.click(declineButton);
    expect(declineMock).toHaveBeenCalledTimes(1);
  });

  it("should not render the confirmation message and buttons after accepting", () => {
    render(
      <Confirmation
        message={message}
        accept={acceptMock}
        decline={declineMock}
      />
    );
    const acceptButton = screen.getByText("Yes Please");
    fireEvent.click(acceptButton);
    const confirmationMessage = screen.queryByText(message);
    const acceptButtonAgain = screen.queryByText("Yes Please");
    const declineButtonAgain = screen.queryByText("Not Yet");
    expect(confirmationMessage).toBeNull();
    expect(acceptButtonAgain).toBeNull();
    expect(declineButtonAgain).toBeNull();
  });

  it("should not render the confirmation message and buttons after declining", () => {
    render(
      <Confirmation
        message={message}
        accept={acceptMock}
        decline={declineMock}
      />
    );
    const declineButton = screen.getByText("Not Yet");
    fireEvent.click(declineButton);
    const confirmationMessage = screen.queryByText(message);
    const acceptButtonAgain = screen.queryByText("Yes Please");
    const declineButtonAgain = screen.queryByText("Not Yet");
    expect(confirmationMessage).toBeNull();
    expect(acceptButtonAgain).toBeNull();
    expect(declineButtonAgain).toBeNull();
  });
});
