/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Square from "./Square";

const initialGameState = ["", "", "", "", "", "", "", "", ""];

function Game() {
  const [gameState,setGameState] = useState(initialGameState);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner,setWinner] = useState<string | null>(null);
  const [isDraw,setIsDraw] = useState(false);

  const handleCellClick = (event: any) => {
    const cellIndex = Number(event.target.getAttribute("data-cell-index"));
    const currentValue = gameState[cellIndex];

    if (currentValue || winner) {
      // If the cell is already filled or if there's a winner, do nothing
      return;
    }

    // Update the game state
    const newGameState = [...gameState];
    newGameState[cellIndex] = currentPlayer;
    setGameState(newGameState);

    // Check for a winner
    if (checkWinner(newGameState)) {
      setWinner(currentPlayer);
    } else if (newGameState.every(cell => cell)) {
      // Check for a draw
      setIsDraw(true);
    } else {
      // Switch player
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const checkWinner = (gameState: string[]): boolean => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
      const [a, b, c] = combination;
      return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
  };

  const resetGame = () => {
    setGameState(initialGameState);
    setCurrentPlayer("X");
    setWinner(null);
    setIsDraw(false);
  };

  return (
    <div className="h-full p-8 text-slate-800 bg-gradient-to-r from-cyan-500">
      <h1 className="text-center text-5xl mb-4 font-display text-white">
        Tic Tac Toe Game  page
      </h1>
      <div>
        <div className="grid grid-cols-3 gap-3 mx-auto w-96">
          {gameState.map((player, index) => (
            <Square key={index} onClick={handleCellClick} {...{ index, player }} />
          ))}
        </div>
        <div className="text-center mt-4">
          {winner && <div className="text-2xl text-white">Winner: {winner}</div>}
          {isDraw && <div className="text-2xl text-white">It's a Draw!</div>}
          {(winner || isDraw) && (
            <button
              onClick={resetGame}
              className="mt-4 p-2 bg-white text-cyan-500 rounded"
            >
              Reset Game
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Game;
