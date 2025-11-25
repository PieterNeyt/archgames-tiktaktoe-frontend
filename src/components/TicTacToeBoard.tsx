import type { PlayerMark } from "@/models/game";

import Cell from "./Cell";

interface Props {
  board: PlayerMark[][];
  onMove: (row: number, col: number) => void;
}

export default function TicTacToeBoard({ board, onMove }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {board.map((row, r) =>
        row.map((cell, c) => (
          <Cell key={`${r}-${c}`} value={cell} onClick={() => onMove(r, c)} />
        )),
      )}
    </div>
  );
}
