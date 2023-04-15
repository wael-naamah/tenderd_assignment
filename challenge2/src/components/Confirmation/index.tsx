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
  type,
  accept,
  decline,
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
        Sure
      </div>
      <div className="btn btn-danger" onClick={handleDecline}>
        No Thanks
      </div>
    </Notification>
  ) : null;
};

export default Confirmation;
