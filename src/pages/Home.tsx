import type { PlayerMark } from "@/models/game";

import { Button, Select, SelectItem } from "@heroui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCreateGame, useCreateAiGame } from "../hooks/useGames";

export default function Home() {
  const navigate = useNavigate();

  const createGame = useCreateGame();
  const createAiGame = useCreateAiGame();

  const [human, setHuman] = useState<PlayerMark>("X");
  const ai = human === "X" ? "O" : "X";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <h1 className="text-4xl font-bold">Tic Tac Toe</h1>

      {/* PvP */}
      <Button
        color="primary"
        onPress={() =>
          createGame.mutate(undefined, {
            onSuccess: (g) => navigate(`/game/${g.gameId}`),
          })
        }
      >
        Play vs Player
      </Button>

      {/* AI */}
      <div className="flex flex-col items-center gap-4">
        <Select
          className="w-48"
          label="Choose your mark"
          selectedKeys={new Set([human])}
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
        >
          Play vs AI ({ai} is AI)
        </Button>
      </div>
    </div>
  );
}
