import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";

import { App } from "@/App";
import { init } from "@/init.ts";

import "@telegram-apps/telegram-ui/dist/styles.css";
import "@/scss/index.scss";
import { HashRouter } from "react-router-dom";

// Mock the environment in case, we are outside Telegram.

const root = ReactDOM.createRoot(document.getElementById("root")!);

// Configure all application dependencies.
init(retrieveLaunchParams().startParam === "debug" || import.meta.env.DEV);

root.render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);
