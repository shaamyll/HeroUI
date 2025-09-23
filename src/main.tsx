import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Providers } from "./providers";
import { BrowserRouter } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react"; // ⬅️ import HeroUI provider

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Providers>
        {/* Wrap HeroUIProvider around your app */}
        <HeroUIProvider>
          <main className="text-foreground bg-background">
            <App />
          </main>
        </HeroUIProvider>
      </Providers>
    </BrowserRouter>
  </StrictMode>
);
