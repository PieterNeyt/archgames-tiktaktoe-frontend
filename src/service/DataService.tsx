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
  // Als er geen sessionId is, zouden we de oude sessieloze route moeten gebruiken.
  // Maar die is in de backend uitgeschakeld/gecombineerd.
  // Om conform de nieuwe backend-logica te zijn,
  // zou er altijd een sessionId moeten zijn. Als er echt geen is,
  // zal dit een fout veroorzaken of de uitgeschakelde sessieloze route aanroepen
  // (als die weer ingeschakeld wordt). Voor nu, aannemende dat de app
  // de sessionId verplicht als de nieuwe backend-logica geldt,
  // of terugvalt op de oude route (die ik hier weghaal conform de backend).
  // Ik laat het crashen als er geen sessionId is om duidelijk te maken
  // dat de frontend-logica een sessionId verwacht.
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
