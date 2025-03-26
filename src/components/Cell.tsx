import React from "react";

interface CellProps {
  value: number | string;
  isFixed: boolean;
  isError: boolean;
  isSelected: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const Cell: React.FC<CellProps> = ({
  value,
  isFixed,
  isError,
  isSelected,
  onClick,
}) => {
  const baseClass = "sudoku-cell";
  const className = [
    baseClass,
    isFixed && "fixed",
    isError && "error",
    isSelected && "selected",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        width: "40px",
        height: "40px",
        border: "1px solid black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {value || ""}
    </div>
  );
};

export default Cell;
