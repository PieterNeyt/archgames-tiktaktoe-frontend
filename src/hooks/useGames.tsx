// src/hooks/useGames.ts

import type { Game, PlayerMark } from "@/models/game";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createAiGame,
  createGame,
  createGameFromSession,
  getGame,
  playMove,
} from "../service/DataService";

import { useSession } from "@/context/SessionContext"; // Importeer de hook

export function useCreateGame() {
  const { sessionId } = useSession(); // Haal de sessionId op

  return useMutation<Game>({
    // Geef de sessionId door aan createGame
    mutationFn: () => createGame(sessionId),
  });
}

export function useCreateAiGame() {
  const { sessionId } = useSession(); // Haal de sessionId op

  return useMutation<Game, Error, { human: PlayerMark; ai: PlayerMark }>({
    // Geef de sessionId door aan createAiGame
    mutationFn: ({ human, ai }) => createAiGame(sessionId, human, ai),
  });
}

export function useGame(gameId: string) {
  const query = useQuery<Game>({
    queryKey: ["game", gameId],
    queryFn: () => getGame(gameId),
  });

  return {
    game: query.data,
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

export function usePlayMove(gameId: string) {
  const qc = useQueryClient();

  return useMutation<Game, Error, { row: number; col: number }>({
    mutationFn: ({ row, col }) => playMove(gameId, row, col),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["game", gameId] }),
  });
}

export function useStartGameFromSession() {
  return useMutation<Game, Error, { sessionId: string }>({
    mutationFn: ({ sessionId }) => createGameFromSession(sessionId),
  });
}
