import React, { useState } from 'react';
import Modal from 'react-modal';

const Board = () => {

    let initialSquares = [ null, null, null, 
                        null, null, null, 
                        null, null, null];

    const winLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    let [squares, setSquares] = useState(initialSquares);
    let [playerTurn, setPlayerTurn] = useState("X");
    let [playerWin, setPlayerWin] = useState("");
    let [playerOneSquares, setPlayerOneSquares] = useState([]);
    let [playerTwoSquares, setPlayerTwoSquares] = useState([]);
    let [modalIsOpen, setIsOpen] = useState(false);

    function playerMove(i){
        let newArray = Array.from(squares);
        if(newArray[i] === null){
            if(playerTurn === "X"){               
                newArray[i] = 'X';
                setSquares(newArray);
                let playerSquareCopy = [...playerOneSquares];
                let newPlayerSquares = [...playerSquareCopy, i];
                setPlayerOneSquares(newPlayerSquares);
                checkWin(newPlayerSquares, "X");  
                setPlayerTurn("O")       
            }
            else{
                newArray[i] = 'O';
                setSquares(newArray);
                let playerSquareCopy = [...playerTwoSquares];
                let newPlayerSquares = [...playerSquareCopy, i];
                setPlayerTwoSquares(newPlayerSquares);
                checkWin(newPlayerSquares, "O");
                setPlayerTurn("X");
            }   
        }   
    }

    function checkWin(arr, player){
        for(let i = 0; i < winLines.length; i++){
            if(winLines[i].every(ai => arr.includes(ai))){
                setPlayerWin(player);
                setIsOpen(true);
            }
        }
    }

    function renderSquares(){
        return squares.map((x, index) => 
            <div onClick={()=>{playerMove(index)}} style={styles.square} key={index}>{x}</div>
        )
    }

    function restartGame(){
        setSquares(initialSquares);
        setPlayerOneSquares([]);
        setPlayerTwoSquares([]);
        setPlayerTurn("X");
        setIsOpen(false);
    }

    return(
        <div style={styles.container}>
            {renderSquares()}
            <Modal
                isOpen={modalIsOpen}
            >
                <div>
                    Player {playerWin} Wins!
                </div>
                <div>
                    Do you want to play again?
                </div>
                <div>
                    <button onClick={restartGame}>Yes</button>
                    <button>No</button>
                </div>
            </Modal>
        </div>
    );
}

export default Board;

const styles = {
    container:{
        backgroundColor: 'pink',
        display: 'flex',
        flexWrap: 'wrap',
        width: 600,
        height : 600
    },
    square:{
        backgroundColor: 'lightblue',
        width : 196,
        height: 196,
        margin: 2,
        textAlign: 'center',
    }
}