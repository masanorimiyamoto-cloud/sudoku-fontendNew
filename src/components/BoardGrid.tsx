// src/components/BoardGrid.tsx
import React from "react";
import "./BoardGrid.css";

// BoardGrid.tsx のインターフェースを以下に変更

interface CellPosition {
  row: number;
  col: number;
}

interface BoardGridProps {
  board: number[][];
  problemCells: CellPosition[];
  errorCells: CellPosition[];
  selectedCell?: CellPosition | null;
  onCellClick: (rowIndex: number, colIndex: number) => void;
}


const BoardGrid: React.FC<BoardGridProps> = ({
  board,
  problemCells,
  errorCells,
  selectedCell,
  onCellClick,
}) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          // 3x3ブロックの境界線を判定
          const isBlockBorderRight = (colIndex + 1) % 3 === 0 && colIndex < 8;
          const isBlockBorderBottom = (rowIndex + 1) % 3 === 0 && rowIndex < 8;

          return (
            <div
            key={`${rowIndex}-${colIndex}`}
            className={`cell
              ${problemCells.some((cell) => cell.row === rowIndex && cell.col === colIndex) ? "problem" : ""}
              ${errorCells.some((cell) => cell.row === rowIndex && cell.col === colIndex) ? "error" : ""}
              ${isBlockBorderRight ? "block-border-right" : ""}
              ${isBlockBorderBottom ? "block-border-bottom" : ""}
            `}
            onClick={() => onCellClick(rowIndex, colIndex)}
>

          
              {cell !== 0 ? cell : ""}
            </div>
          );
        })
      )}
    </div>
  );
};

export default BoardGrid;
