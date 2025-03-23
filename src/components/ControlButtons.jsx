import React from "react";

export default function ControlButtons({
  onSetProblem,
  onSubmit,
  onCheckPartial,
  onClearSolution,
  onReset,
  disableCheck = false,      // 新規プロップ
}) {
  return (
    <div style={{ marginTop: "20px" }}>
      <button type="button" onClick={onSetProblem} style={buttonStyle}>
        問題をセット
      </button>

      <button type="button" onClick={onSubmit} style={buttonStyle}>
        解答をリクエスト
      </button>

      <button
        type="button"
        onClick={onCheckPartial}
        disabled={disableCheck}
        style={{
          ...buttonStyle,
          cursor: disableCheck ? "not-allowed" : "pointer",
          opacity: disableCheck ? 0.6 : 1,
        }}
      >
        {disableCheck ? "チェック中…" : "部分チェック"}
      </button>

      <button type="button" onClick={onClearSolution} style={buttonStyle}>
        解答を消す
      </button>

      <button type="button" onClick={onReset} style={buttonStyle}>
        すべてリセット
      </button>
    </div>
  );
}

const buttonStyle = {
  margin: "10px",
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#6A5ACD",
  color: "white",
  border: "none",
  borderRadius: "5px",
};
