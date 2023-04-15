import React, { useState } from "react";
import Notification from "../Notification";

import "./index.scss";

type ConfirmationProps = {
  message: string;
  accept: () => void;
  decline: () => void;
  type?: "success" | "message" | "caution" | "error";
};

const Confirmation: React.FC<ConfirmationProps> = ({
  message,
  accept,
  decline,
  type = "message",
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleAccept = () => {
    setIsVisible(false);
    accept();
  };

  const handleDecline = () => {
    setIsVisible(false);
    decline();
  };

  return isVisible ? (
    <Notification notification={{ message, type }}>
      <div className="btn btn-primary" onClick={handleAccept}>
        Yes Please
      </div>
      <div className="btn btn-danger" onClick={handleDecline}>
        Not Yet
      </div>
    </Notification>
  ) : null;
};

export default Confirmation;
