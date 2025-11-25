import { useParams } from "react-router-dom";
import { Spinner, Button } from "@heroui/react";

import { useGame, usePlayMove } from "../hooks/useGames";

import TicTacToeBoard from "@/components/TicTacToeBoard";

export default function GamePage() {
  const { id } = useParams();
  const gameId = id!;

  const { game, loading, refetch } = useGame(gameId);
  const playMove = usePlayMove(gameId);

  if (loading || !game) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  const handleMove = (row: number, col: number) => {
    if (game.gameStatus !== "IN_PROGRESS") return;
    playMove.mutate(
      { row, col },
      {
        onSuccess: () => refetch(),
      },
    );
  };

  return (
    <div className="flex flex-col items-center py-10 gap-6">
      <h1 className="text-3xl font-bold">Game: {gameId}</h1>
      <h2 className="text-xl">
        Current Player: <span className="font-bold">{game.currentPlayer}</span>
      </h2>

      <TicTacToeBoard board={game.board} onMove={handleMove} />

      {game.gameStatus !== "IN_PROGRESS" && (
        <div className="text-2xl font-bold mt-4">
          {game.winner ? `Winner: ${game.winner}` : "It's a draw!"}
        </div>
      )}

      <Button color="primary" onPress={() => (window.location.href = "/")}>
        Back to Home
      </Button>
    </div>
  );
}
