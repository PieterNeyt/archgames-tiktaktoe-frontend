import axios from "axios";

import { Game } from "@/models/game.ts";

export async function createGame(id: string): Promise<Game> {
  const { data } = await axios.post<Game>(`/games/${id}`);

  return data;
}
