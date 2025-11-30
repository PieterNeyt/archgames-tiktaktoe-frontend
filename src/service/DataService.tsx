import axios from "axios";

import { Game, PlayerMark } from "@/models/game.ts";

export async function createGame(): Promise<Game> {
  const { data } = await axios.post<Game>(`/ttt/api/games`);

  return data;
}

export async function createAiGame(
  human: PlayerMark,
  ai: PlayerMark,
): Promise<Game> {
  const { data } = await axios.post<Game>(
    `/ttt/api/games/ai?human=${human}&ai=${ai}`,
  );

  return data;
}

export async function getGame(gameId: string): Promise<Game> {
  const { data } = await axios.get<Game>(`/ttt/api/games/${gameId}`);

  return data;
}

export async function playMove(
  gameId: string,
  row: number,
  col: number,
): Promise<Game> {
  const { data } = await axios.post<Game>(`/ttt/api/games/${gameId}/move`, {
    row,
    col,
  });

  return data;
}

export async function createGameFromSession(sessionId: string): Promise<Game> {
  const { data } = await axios.post<Game>(
    `/ttt/api/games/session/${sessionId}/start`,
  );

  return data;
}
