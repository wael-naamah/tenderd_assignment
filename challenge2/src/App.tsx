import React, { useState } from "react";
import { Confirmation } from "./components";

import "./index.scss";

function App() {
  const [notification, setNotification] = useState({
    message: "Hello World",
    type: "error",
  });

  const handleAccept = () => {
    setNotification({ message: "You accepted!", type: "success" });
  };

  const handleDecline = () => {
    setNotification({ message: "You declined!", type: "error" });
  };
  return (
    <div id="app" className="app">
      <Confirmation
        message="Should we bake a pie?"
        type="success"
        accept={handleAccept}
        decline={handleDecline}
      />
    </div>
  );
}

export default App;
