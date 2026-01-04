
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as DataService from "../service/DataService";
import { PlayerMark } from "@/models/game";

export function useOxoGame(sessionId: string, lobbyId: string) {
  const navigate = useNavigate();
  useQueryClient();
  const startAi = useMutation({
    mutationFn: (human: PlayerMark) => DataService.startGameVsAi(sessionId, lobbyId, human),
    onSuccess: (game) => navigate(`/${lobbyId}/${sessionId}/play/${game.gameId}`),
  });

  const startPlayer = useMutation({
    mutationFn: () => DataService.startGameVsPlayer(sessionId, lobbyId),
    onSuccess: (game) => navigate(`/${lobbyId}/${sessionId}/play/${game.gameId}`),
  });

  return {
    startAi: startAi.mutate,
    isStartingAi: startAi.isPending,
    startPlayer: startPlayer.mutate,
    isStartingPlayer: startPlayer.isPending,
  };
}

export function useGameDetails(gameId: string, sessionId: string) {
  return useQuery({
    queryKey: ["game", gameId, sessionId],
    queryFn: () => DataService.getGame(gameId, sessionId),
    refetchInterval: 2000,
  });
}
