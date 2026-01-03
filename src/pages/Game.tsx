import { useParams } from "react-router-dom";
import { Spinner, Button } from "@heroui/react";
import { useGameDetails } from "../hooks/useGames";
import * as DataService from "../service/DataService";
import TicTacToeBoard from "@/components/TicTacToeBoard";

export default function GamePage() {
    const {  sessionId, gameId } = useParams();
    const { data: game, isLoading, refetch } = useGameDetails(gameId!);

    if (isLoading || !game) return <Spinner />;

    const handleMove = async (row: number, col: number) => {
        if (game.gameStatus !== "IN_PROGRESS") return;
        try {
            await DataService.playMove(sessionId!, gameId!, row, col);
            refetch();
        } catch (e) {
            alert("Niet jouw beurt of ongeldige zet!");
        }
    };

    return (
        <div className="flex flex-col items-center py-10 gap-6">
            {game.gameStatus === "WAITING_FOR_PLAYER" ? (
                <h2 className="text-2xl animate-pulse">Wachten op een tegenstander...</h2>
            ) : (
                <>
                    <h2 className="text-xl">Beurt: {game.currentPlayer}</h2>
                    <TicTacToeBoard board={game.board} onMove={handleMove} />
                </>
            )}
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
