import React, { useMemo } from "react";
import "./index.scss";

type NotificationType = "success" | "message" | "caution" | "error";

export interface NotificationProps {
  notification: {
    message?: string;
    type?: NotificationType;
  };
}

const Notification: React.FC<NotificationProps> = ({
  notification: { type, message },
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

  return message ? <div className={alertClass}>{message}</div> : null;
};

export default Notification;
