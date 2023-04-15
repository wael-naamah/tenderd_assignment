import React, { useMemo, ReactNode } from "react";
import "./index.scss";

type NotificationType = "success" | "message" | "caution" | "error";

export interface NotificationProps {
  notification: {
    message?: string;
    type?: NotificationType;
  };
  children?: ReactNode;
}

const Notification: React.FC<NotificationProps> = ({
  notification: { type, message },
  children,
}) => {
  const alertClass = useMemo(() => {
    switch (type) {
      case "success":
        return "alert alert-success";
      case "error":
        return "alert alert-danger";
      case "caution":
        return "alert alert-warning";
      default:
        return "alert alert-info";
    }
  }, [type]);

  return message ? (
    <div className={alertClass}>
      <p>{message}</p>
      {children}
    </div>
  ) : null;
};

export default Notification;
