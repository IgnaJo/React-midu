import React, { Children, useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS } from "./components/constant";
import { checkWinnerFrom, checkEndGame } from "./components/logic/board";
import { WinnerModal } from "./components/WinnerModal";
import { resetGameStorage, saveGameStorage } from "./components/logic/storage";
import { Board } from "./components/Board";



const App = () => {
  const [board, setBoard] = useState(() =>{
    const boardFromLocalStorage = window.localStorage.getItem('board')
    return boardFromLocalStorage ? JSON.parse(boardFromLocalStorage) : Array(9).fill(null)
  });

  //si hay algo en storage, se carga esa info, si no se empieza de 0
  const [turn, setTurn] = useState(()=>{
    const turnFromLocalStorage = window.localStorage.getItem('turn')
    return turnFromLocalStorage ?? TURNS.X
  });

  
  const [winner, setWinner] = useState( null);

 

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameStorage()
    
  };



  const updateBoard = (index) => {
    // se hace una nueva copia para mantener inmutable los valores iniciales
    const newBoard = [...board];
    //si ya tiene un valor, no modificar
    //si existe ganador, no actualiza
    if (board[index] || winner) return;
    newBoard[index] = turn;
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setBoard(newBoard);
    setTurn(newTurn);

    saveGameStorage({board:newBoard, turn:newTurn})   

    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };
  return (
    <main className="board">
      <h1>TIC TAC TOE</h1>
     {/*  <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section> */}
      <Board board={board} turn={turn} setTurn={setTurn} winner={winner} setBoard={setBoard}/>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

   <WinnerModal winner={winner} resetGame={resetGame}/>
    </main>
  );
};

export default App;
