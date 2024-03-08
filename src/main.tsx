import { AdaptivityProvider, ConfigProvider } from "@vkontakte/vkui";
import ReactDOM from "react-dom/client";
import React from "react";

import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider appearance="dark">
      <AdaptivityProvider>
        <App />
      </AdaptivityProvider>
    </ConfigProvider>
  </React.StrictMode>
);
