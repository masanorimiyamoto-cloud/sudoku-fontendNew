import React, { useState } from "react";
import axios from "axios";
import BoardGrid from "./components/BoardGrid";
import ControlButtons from "./components/ControlButtons";
import NumberPad from "./components/NumberPad";

interface CellPosition {
  row: number;
  col: number;
}

const SudokuBoard: React.FC = () => {
  const initialBoard: number[][] = Array(9)
    .fill(null)
    .map(() => Array(9).fill(0));

  const [board, setBoard] = useState<number[][]>(initialBoard);
  const [originalBoard, setOriginalBoard] = useState<number[][] | null>(null);
  const [selectedCell, setSelectedCell] = useState<CellPosition | null>(null);
  const [problemCells, setProblemCells] = useState<CellPosition[]>([]);
  const [errorCells, setErrorCells] = useState<CellPosition[]>([]);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [isProblemSet, setIsProblemSet] = useState<boolean>(false);

  const handleChangeCell = (row: number, col: number, value: number) => {
    if (problemCells.some((cell) => cell.row === row && cell.col === col)) return;

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = value;
    setBoard(newBoard);

    setErrorCells((prev) => prev.filter((cell) => !(cell.row === row && cell.col === col)));
  };

  const handleCellClick = (row: number, col: number) => {
    if (problemCells.some((cell) => cell.row === row && cell.col === col)) return;
    setSelectedCell({ row, col });
  };

  const handleNumberClick = (num: number) => {
    if (selectedCell) {
      handleChangeCell(selectedCell.row, selectedCell.col, num);
      setSelectedCell(null);
    }
  };

  const handleSetOrUnsetProblem = () => {
    if (isProblemSet) {
      setOriginalBoard(null);
      setProblemCells([]);
      setIsProblemSet(false);
      alert("問題のセットを解除しました！");
    } else {
      setOriginalBoard(board.map((row) => [...row]));
      const fixedCells = board
        .flatMap((row, rowIndex) =>
          row.map((cell, colIndex) => (cell !== 0 ? { row: rowIndex, col: colIndex } : null))
        )
        .filter((cell): cell is CellPosition => cell !== null);

      setProblemCells(fixedCells);
      setErrorCells([]);
      setIsProblemSet(true);
      alert("問題がセットされました！");
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("https://numplay.onrender.com/solve", {
        board,
      });

      if (response.data.status === "ok") {
        setBoard(response.data.solution);
        setErrorCells([]);
      } else {
        alert("解けませんでした: " + response.data.message);
      }
    } catch (error) {
      alert("サーバーへのリクエストでエラーが発生しました。");
    }
  };

  const handleClearSolution = () => {
    if (!originalBoard) {
      alert("問題をセットしてください！");
      return;
    }
    setBoard(originalBoard.map((row) => [...row]));
    setErrorCells([]);
  };

  const handleResetBoard = () => {
    setBoard(initialBoard.map((row) => [...row]));
    setOriginalBoard(null);
    setProblemCells([]);
    setErrorCells([]);
    setIsProblemSet(false);
  };

  const handleCheckPartialSolution = async () => {
    if (!originalBoard) {
      alert("問題をセットしてください！");
      return;
    }

    setIsChecking(true);
    try {
      const response = await axios.post("https://numplay.onrender.com/solve", {
        board: originalBoard,
      });

      if (response.data.status === "ok") {
        const solution = response.data.solution;
        const errors: CellPosition[] = [];

        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            if (board[i][j] !== 0 && board[i][j] !== solution[i][j]) {
              errors.push({ row: i, col: j });
            }
          }
        }

        setErrorCells(errors);
        alert(
          errors.length === 0
            ? "✅ 入力された値はすべて正しいです！"
            : `❌ ${errors.length}箇所の誤りがあります！`
        );
      } else {
        alert("正解が取得できませんでした: " + response.data.message);
      }
    } catch (error) {
      alert("サーバーへのリクエストでエラーが発生しました。");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Sudoku Solver</h1>
      <BoardGrid
        board={board}
        problemCells={problemCells}
        errorCells={errorCells}
        selectedCell={selectedCell}
        onCellClick={handleCellClick}
      />
      {selectedCell && <NumberPad onNumberClick={handleNumberClick} />}
      <ControlButtons
        onSetOrUnsetProblem={handleSetOrUnsetProblem}
        onSubmit={handleSubmit}
        onCheckPartial={handleCheckPartialSolution}
        onClearSolution={handleClearSolution}
        onReset={handleResetBoard}
        disableCheck={isChecking}
        isProblemSet={isProblemSet}
      />
    </div>
  );
};

export default SudokuBoard;
