import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AboutPage } from "./AboutPage";
import { BniPage } from "./BniPage";
import "./styles.css";

const path = window.location.pathname.replace(/\/+$/, "") || "/";
const page =
  path === "/about" ? <AboutPage /> : path === "/bni" ? <BniPage /> : <App />;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {page}
  </StrictMode>,
);
