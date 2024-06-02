import { Square } from "./Square"
import { TURNS } from "./constant";
import { saveGameStorage } from "./logic/storage";
import confetti from "canvas-confetti";
import { checkWinnerFrom, checkEndGame } from "./logic/board";


export const Board = (({board, setBoard, turn, setTurn, winner, setWinner})=>{

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

    
    return(
        <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>
    )
})
    