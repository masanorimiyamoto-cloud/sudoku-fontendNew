import React from "react";
import "./ControlButtons.css";

interface ControlButtonsProps {
  onSetOrUnsetProblem: React.MouseEventHandler<HTMLButtonElement>;
  onSubmit: React.MouseEventHandler<HTMLButtonElement>;
  onCheckPartial: React.MouseEventHandler<HTMLButtonElement>;
  onClearSolution: React.MouseEventHandler<HTMLButtonElement>;
  onReset: React.MouseEventHandler<HTMLButtonElement>;
  disableCheck?: boolean;
  isProblemSet?: boolean;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  onSetOrUnsetProblem,
  onSubmit,
  onCheckPartial,
  onClearSolution,
  onReset,
  disableCheck = false,
  isProblemSet = false,
}) => {
  return (
    <div className="button-container">
      <button
        type="button"
        onClick={onSetOrUnsetProblem}
        className="button set-problem-button"
      >
        {isProblemSet ? "問題のセットを解除" : "問題をセット"}
      </button>

      <button
        type="button"
        onClick={onSubmit}
        className="button submit-button"
      >
        解答をリクエスト
      </button>

      <button
        type="button"
        onClick={onCheckPartial}
        disabled={disableCheck}
        className="button check-partial-button"
      >
        {disableCheck ? "チェック中…" : "部分チェック"}
      </button>

      <button
        type="button"
        onClick={onClearSolution}
        className="button clear-solution-button"
      >
        解答を消す
      </button>

      <button
        type="button"
        onClick={onReset}
        className="button reset-button"
      >
        すべてリセット
      </button>
    </div>
  );
};

export default ControlButtons;
