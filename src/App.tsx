// App.tsx
import { Route, Routes } from "react-router-dom";

import GamePage from "@/pages/Game";
import Home from "@/pages/Home.tsx";
import Forbidden from "@/pages/Forbidden";

function App() {
  return (
    <Routes>
      <Route element={<Forbidden />} path="/403" />

      {/* HomePage krijgt nu direct lobbyId en sessionId uit de URL */}
      <Route element={<Home />} path="/:lobbyId/:sessionId" />

      {/* GamePage volgt de structuur van Dammen */}
      <Route element={<GamePage />} path="/:lobbyId/:sessionId/play/:gameId" />

      {/* Fallback route */}
      <Route
        element={<div>Navigeer via het platform naar /lobbyId/sessionId</div>}
        path="/"
      />
    </Routes>
  );
}

export default App;
