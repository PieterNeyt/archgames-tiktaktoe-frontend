import { Route, Routes } from "react-router-dom";

import GamePage from "@/pages/Game";
import SessionStart from "@/pages/SessionStart";
import ProtectedRoute from "@/components/ProtectedRoute";
import Forbidden from "@/pages/Forbidden";
import Home from "@/pages/Home.tsx";

function App() {
  return (
    <Routes>
      <Route element={<Forbidden />} path="/403" />

      <Route element={<SessionStart />} path="/session/:sessionId" />

      {/* The game menu, only accessible after valid session */}
      <Route
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
        path="/home"
      />

      {/* Protected game */}
      <Route
        element={
          <ProtectedRoute>
            <GamePage />
          </ProtectedRoute>
        }
        path="/game/:id"
      />
    </Routes>
  );
}

export default App;
