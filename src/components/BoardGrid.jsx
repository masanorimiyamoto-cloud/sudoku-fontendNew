// src/components/BoardGrid.jsx
import React from "react";
import Cell from "./Cell_com";  // ここで正しいパスを指定する
import './BoardGrid.css';

const BoardGrid = ({ board, problemCells, errorCells, selectedCell, onCellClick }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`cell ${problemCells.some(([r, c]) => r === rowIndex && c === colIndex) ? "problem" : ""} ${
              errorCells.some(([r, c]) => r === rowIndex && c === colIndex) ? "error" : ""
            }`}
            onClick={() => onCellClick(rowIndex, colIndex)}
          >
            {cell !== 0 ? cell : ""}
          </div>
        ))
      )}
    </div>
  );
};
