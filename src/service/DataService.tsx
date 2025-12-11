// src/service/DataService.ts

import axios from "axios";

import { Game, PlayerMark } from "@/models/game.ts";

export async function createGame(sessionId: string | null): Promise<Game> {
  if (sessionId) {
    const { data } = await axios.post<Game>(
      `/ttt/api/games/session/${sessionId}/start`,
    );

    return data;
  }

  throw new Error("Game creation requires a sessionId.");
}

export async function createAiGame(
  sessionId: string | null,
  human: PlayerMark,
  ai: PlayerMark,
): Promise<Game> {
  if (sessionId) {
    const { data } = await axios.post<Game>(
      `/ttt/api/games/session/${sessionId}/start?human=${human}&ai=${ai}`,
    );

    return data;
  }
  // Zie opmerking in createGame.
  throw new Error("AI Game creation requires a sessionId.");
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

// createGameFromSession is niet meer nodig, omdat de logica nu in createGame zit.
export async function createGameFromSession(sessionId: string): Promise<Game> {
  const { data } = await axios.post<Game>(
    `/ttt/api/games/session/${sessionId}/start`,
  );

  return data;
}

export async function createMultiplayerGameFromSession(
  sessionId: string,
): Promise<Game> {
  const { data } = await axios.post<Game>(
    `/ttt/api/games/session/${sessionId}/startmultiplayer`,
  );

  return data;
}
