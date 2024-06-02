import React, { Children, useEffect, useState } from "react";
import { Square } from "./components/Square";
import { TURNS } from "./components/constant";
import { WinnerModal } from "./components/WinnerModal";
import { resetGameStorage } from "./components/logic/storage";
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

  return (
    <main className="board">
      <h1>TIC TAC TOE</h1>
     
      <Board board={board} turn={turn} setTurn={setTurn} winner={winner} setBoard={setBoard} setWinner={setWinner}/>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

   <WinnerModal winner={winner} resetGame={resetGame}/>
    </main>
  );
};

export default App;
