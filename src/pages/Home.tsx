// src/pages/Home.tsx

import type { PlayerMark } from "@/models/game";

import { Button, Select, SelectItem } from "@heroui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCreateGame, useCreateAiGame } from "../hooks/useGames";

import { useSession } from "@/context/SessionContext"; // Optioneel: om de status te tonen

export default function Home() {
  const navigate = useNavigate();
  const createGame = useCreateGame();
  const createAiGame = useCreateAiGame();
  const { sessionId } = useSession(); // Optioneel: om te zien of we een sessie hebben

  const [human, setHuman] = useState<PlayerMark>("X");
  const ai = human === "X" ? "O" : "X";

  // Optionele visualisatie om te zien of de sessie gebruikt wordt
  const gameMode = sessionId ? "vs Player (Session)" : "vs Player (No Session)";
  const aiMode = sessionId
    ? `Play vs AI (${ai} is AI) (Session)`
    : `Play vs AI (${ai} is AI) (No Session - zal waarschijnlijk falen)`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <h1 className="text-4xl font-bold">Tic Tac Toe</h1>
      {sessionId && (
        <p className="text-sm text-gray-500">
          Actieve Sessie ID: **{sessionId}**
        </p>
      )}
      {/* PvP */}
      <Button
        color="primary"
                onPress={() =>
                    createGame.mutate(undefined, {
                        onSuccess: (g) => navigate(`/game/${g.gameId}`),
                    })
                }
        isLoading={createGame.isPending}
        // Dit wordt nu gestart met de sessionId in de hook
      >
        {gameMode}
      </Button>
      {/* AI */}
      <div className="flex flex-col items-center gap-4">
        <Select
          className="w-48"
          label="Choose your mark"
          selectedKeys={human ? new Set([human]) : new Set()}
          onSelectionChange={(keys) => {
            const value = Array.from(keys)[0] as PlayerMark;

            setHuman(value);
          }}
        >
          <SelectItem key="X">X</SelectItem>
          <SelectItem key="O">O</SelectItem>
        </Select>
        <Button
          color="secondary"
                    onPress={() =>
                        createAiGame.mutate(
                            { human, ai },
                            { onSuccess: (g) => navigate(`/game/${g.gameId}`) },
                        )
                    }
          isLoading={createAiGame.isPending}
          // Dit wordt nu gestart met de sessionId in de hook
        >
          {aiMode}
        </Button>
      </div>
    </div>
  );
}
