import type { Game, PlayerMark } from "@/models/game";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createAiGame,
  createGame,
  createGameFromSession,
  getGame,
  playMove,
} from "../service/DataService";

export function useCreateGame() {
  return useMutation<Game>({
    mutationFn: () => createGame(),
  });
}

export function useCreateAiGame() {
  return useMutation<Game, Error, { human: PlayerMark; ai: PlayerMark }>({
    mutationFn: ({ human, ai }) => createAiGame(human, ai),
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
