// src/pages/Home.tsx
import { useParams } from "react-router-dom";
import { Button, Select, SelectItem } from "@heroui/react";
import { useState } from "react";
import { useOxoGame } from "../hooks/useGames";
import { PlayerMark } from "@/models/game";

export default function Home() {
    const { lobbyId, sessionId } = useParams();
    const [human, setHuman] = useState<PlayerMark>("X");

    const { startAi, isStartingAi, startPlayer, isStartingPlayer } = useOxoGame(sessionId!, lobbyId!);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-8">
            <h1 className="text-4xl font-bold">Tic Tac Toe</h1>
            <p className="text-gray-500">Lobby: {lobbyId}</p>

            <div className="flex flex-col gap-4 w-64">
                <Button
                    color="primary"
                    onPress={() => startPlayer()}
                    isLoading={isStartingPlayer}
                >
                    Multiplayer (Play vs Player)
                </Button>

                <div className="border-t pt-4">
                    <Select
                        label="Kies je teken"
                        selectedKeys={[human as string]}
                        onSelectionChange={(keys) => setHuman(Array.from(keys)[0] as PlayerMark)}
                    >
                        <SelectItem key="X">X</SelectItem>
                        <SelectItem key="O">O</SelectItem>
                    </Select>
                    <Button
                        className="w-full mt-2"
                        color="secondary"
                        onPress={() => startAi(human)}
                        isLoading={isStartingAi}
                    >
                        Singleplayer (vs AI)
                    </Button>
                </div>
            </div>
        </div>
    );
}