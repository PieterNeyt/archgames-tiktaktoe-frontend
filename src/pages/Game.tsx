import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Spinner,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button,
} from "@heroui/react";

import { useGameDetails } from "../hooks/useGames";
import * as DataService from "../service/DataService";
import TicTacToeBoard from "@/components/TicTacToeBoard";

export default function GamePage() {
  const { lobbyId, sessionId, gameId } = useParams();
  const navigate = useNavigate();

  const { data: game, isLoading, refetch } = useGameDetails(
      gameId!,
      sessionId!
  );

  const [showModal, setShowModal] = useState(false);

  const isGameOver =
      game?.gameStatus === "FINISHED" || game?.gameStatus === "DRAW";

  useEffect(() => {
    if (isGameOver) {
      setShowModal(true);
    }
  }, [isGameOver]);

  if (isLoading || !game) return <Spinner />;

  const handleMove = async (row: number, col: number) => {
    if (game.gameStatus !== "IN_PROGRESS") return;
    try {
      await DataService.playMove(sessionId!, gameId!, row, col);
      refetch();
    } catch {
      alert("Not your move or invalid move!");
    }
  };

  return (
      <div className="flex flex-col items-center py-10 gap-6">
        {game.gameStatus === "WAITING_FOR_PLAYER" ? (
            <h2 className="text-2xl animate-pulse">
              Waiting on an opponent...
            </h2>
        ) : (
            <>
              <h2 className="text-lg font-semibold">
                Jij bent:{" "}
                <span className="text-primary">{game.myMark}</span>
              </h2>

              <p className="text-sm text-gray-500">
                {game.currentPlayer === game.myMark
                    ? "Your move"
                    : "Waiting on opponent"}
              </p>

              <TicTacToeBoard
                  board={game.board}
                  onMove={handleMove}
              />
            </>
        )}

        {/* GAME OVER MODAL */}
        <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            isDismissable={false}
        >
          <ModalContent>
            <ModalHeader className="text-xl font-bold text-center">
              Game Over
            </ModalHeader>

            <ModalBody className="text-center">
              {game.winner ? (
                  <p className="text-lg">
                    Winner: <b>{game.winner}</b>
                  </p>
              ) : (
                  <p className="text-lg">Its a draw!</p>
              )}
            </ModalBody>

            <ModalFooter className="flex justify-center">
              <Button
                  color="primary"
                  onClick={() =>
                      navigate(`/${lobbyId}/${sessionId}`)
                  }
              >
                Back to Home
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
  );
}
