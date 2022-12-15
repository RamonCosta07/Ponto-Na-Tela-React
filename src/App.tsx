import { useState } from "react";
import "./App.css";

interface ClickedProps {
  clientX: number;
  clientY: number;
}

function App() {
  const [clickedPoints, setClickedPoints] = useState<ClickedProps[]>([]);
  const [undoPoints, setUndoPoints] = useState<ClickedProps[]>([]);

  function getCoordenates(e: React.MouseEvent<HTMLElement>): void {
    const { clientX, clientY } = e;
    setClickedPoints([...clickedPoints, { clientX, clientY }]);
  }

  function handleUndo(): void {
    const newClickedPoints = [...clickedPoints];
    const undoPoint = newClickedPoints.pop();
    setClickedPoints(newClickedPoints);
    if (!undoPoint) return;
    setUndoPoints([...undoPoints, undoPoint]);
  }

  function handleRedo(): void {
    const newUndoPoints = [...undoPoints];
    const redoPoint = newUndoPoints.pop();
    if (!redoPoint) return;
    setUndoPoints(newUndoPoints);
    setClickedPoints([...clickedPoints, redoPoint]);
  }

  return (
    <>
      <button
        disabled={clickedPoints.length === 0}
        className="btnD"
        onClick={handleUndo}
      >
        Desfazer Último Ponto
      </button>

      <button
        className="btnR"
        onClick={handleRedo}
        disabled={undoPoints.length === 0}
      >
        Refazer Último Ponto
      </button>

      <div className="App" onClick={getCoordenates}>
        {clickedPoints.map((point, index) => {
          return (
            <div
              style={{
                left: point.clientX - 6,
                top: point.clientY - 7,
                position: "absolute",
                borderRadius: "50%",
                background: "red",
                width: "8px",
                height: "8px",
              }}
              key={index}
            ></div>
          );
        })}
      </div>
    </>
  );
}

export default App;
