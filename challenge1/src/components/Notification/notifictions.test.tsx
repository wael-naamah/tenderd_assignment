import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Notification, { NotificationProps } from ".";

describe("Notification component", () => {
  const notification: NotificationProps["notification"] = {
    message: "This is a notification message",
    type: "success",
  };

  it("renders the notification message", () => {
    render(<Notification notification={notification} />);
    const messageElement = screen.getByText(notification.message || "");
    expect(messageElement).toBeInTheDocument();
  });

  it("renders null if message prop is not provided", () => {
    render(<Notification notification={{}} />);
    const notificationElement = screen.queryByText(
      /This is a notification message/
    );
    expect(notificationElement).toBeNull();
  });

  it('applies the success alert class if type prop is "success"', () => {
    render(<Notification notification={notification} />);
    const notificationElement = screen.getByText(notification.message || "");
    expect(notificationElement).toHaveClass("alert-success");
  });

  it('applies the danger alert class if type prop is "error"', () => {
    const notification: NotificationProps["notification"] = {
      message: "This is an error notification message",
      type: "error",
    };
    render(<Notification notification={notification} />);
    const notificationElement = screen.getByText(notification.message || "");
    expect(notificationElement).toHaveClass("alert-danger");
  });

  it('applies the warning alert class if type prop is "caution"', () => {
    const notification: NotificationProps["notification"] = {
      message: "This is a caution notification message",
      type: "caution",
    };
    render(<Notification notification={notification} />);
    const notificationElement = screen.getByText(notification.message || "");
    expect(notificationElement).toHaveClass("alert-warning");
  });

  it("applies the info alert class if type prop is not provided", () => {
    const notification: NotificationProps["notification"] = {
      message: "This is an info notification message",
    };
    render(<Notification notification={notification} />);
    const notificationElement = screen.getByText(notification.message || "");
    expect(notificationElement).toHaveClass("alert-info");
  });
});
