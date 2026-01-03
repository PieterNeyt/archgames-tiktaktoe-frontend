// src/service/DataService.ts
import axios from "axios";
import { Game, PlayerMark } from "@/models/game.ts";

const API_BASE = "/ttt/api/games";

export async function startGameVsAi(
    sessionId: string,
    lobbyId: string,
    human: PlayerMark
): Promise<Game> {
  const ai = human === "X" ? "O" : "X";
  const { data } = await axios.post<Game>(
      `${API_BASE}/session/${sessionId}/start-singleplayer`,
      null,
      { params: { lobbyId, human, ai } }
  );
  return data;
}

export async function startGameVsPlayer(
    sessionId: string,
    lobbyId: string
): Promise<Game> {
  const { data } = await axios.post<Game>(
      `${API_BASE}/session/${sessionId}/start-multiplayer`,
      null,
      { params: { lobbyId } }
  );
  return data;
}

export async function getGame(gameId: string): Promise<Game> {
  const { data } = await axios.get<Game>(`${API_BASE}/${gameId}`);
  return data;
}

export async function playMove(
    sessionId: string, // Belangrijk voor backend validatie: wie doet de zet?
    gameId: string,
    row: number,
    col: number
): Promise<Game> {
  const { data } = await axios.post<Game>(`${API_BASE}/${gameId}/move`, {
    sessionId,
    row,
    col,
  });
  return data;
}