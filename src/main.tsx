import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";

import "@/styles/globals.css";
import { SessionProvider } from "@/context/SessionContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <BrowserRouter basename={"/ttt"}>
          <Provider>
            <App />
          </Provider>
        </BrowserRouter>
      </SessionProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
