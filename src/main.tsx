import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AboutPage } from "./AboutPage";
import { BniPage } from "./BniPage";
import "./styles.css";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");
const path = window.location.pathname.replace(base, "").replace(/\/+$/, "") || "/";
const page =
  path === "/about" ? <AboutPage /> : path === "/bni" ? <BniPage /> : <App />;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {page}
  </StrictMode>,
);
