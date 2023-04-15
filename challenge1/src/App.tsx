import React from "react";
import { Notification } from "./components";

import "./index.scss";

function App() {
  return (
    <div id="app" className="app">
      <Notification
        notification={{
          message: "Hello World!",
          type: "message",
        }}
      />
    </div>
  );
}

export default App;
