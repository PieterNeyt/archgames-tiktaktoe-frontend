import { Route, Routes } from "react-router-dom";

import Home from "@/pages/Home.tsx";
import GamePage from "@/pages/Game.tsx";
import SessionStart from "@/pages/SessionStart.tsx";

function App() {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<SessionStart />} path="/session/:sessionId" />
      <Route element={<GamePage />} path="/game/:id" />
    </Routes>
  );
}

export default App;
