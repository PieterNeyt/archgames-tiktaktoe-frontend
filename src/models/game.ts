export type PlayerMark = "X" | "O" | " " | null;

export type GameStatus = "IN_PROGRESS" | "FINISHED" | "DRAW" | "WAITING_FOR_PLAYER";

export type Game = {
  gameId: string;
  board: PlayerMark[][];
  currentPlayer: PlayerMark;
  aiPlayer: PlayerMark;
  gameStatus: GameStatus;
  winner: PlayerMark;
  myMark: PlayerMark;
};
