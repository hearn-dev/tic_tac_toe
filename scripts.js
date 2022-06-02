let circleTurn
let turns = 0;
let defaultDomState = document.body.innerHTML
const game = (() => {


    const winning_combinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ]
    

    const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
    const endGameScreen = document.getElementById("winning-message")
    const restart = document.getElementById("restartButton");


    // Check all win conditions
    const checkWin = (currentClass) => {
        return winning_combinations.some(combination => {
            return combination.every(index => {
                return board.cellElements[index].classList.contains(currentClass)
            })
        })
    }

    const checkTurns = () => {
        return turns;
    }

    const isDraw = () => {
        return checkTurns()>=8;
    }

    // Place player mark
    const placeMark = (cell, currentClass) => {
        cell.classList.add(currentClass);
        console.log (circleTurn);
    }

    const endGame = (draw) => {
        if (draw) {
            winningMessageTextElement.innerText = "It's a draw!";
        } else {
            winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} Wins!`;
        }
        endGameScreen.classList.add("show");

    }

    const reset = () => {
        endGameScreen.classList.remove("show");
        board.startGame();
    }

    restart.addEventListener('click', reset)

    return {
        turns,
        checkWin,
        checkTurns,
        isDraw,
        placeMark,
        endGame,
    }
})()

const board = (() => {

    const X_CLASS = 'x';
    const CIRCLE_CLASS = 'circle';

    // Select gameboard on DOM
    const gameBoard = document.getElementById('board')

    // Select DOM cells
    const cellElements = document.querySelectorAll('[data-cell]');
    
    function handleClick(e) {
        // Place Mark
        const cell = e.target;
        const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
        game.placeMark(cell, currentClass);

        // Check For Win
        if (game.checkWin(currentClass)) {
            game.endGame(false);

        // Check For Draw
        } else if (game.isDraw()) {
            game.endGame(true);
        
        // Switch turns
        } else {
            switchTurns();
            setBoardHoverClass();
            turns++;
            console.log(turns);
        }
 

    }

    // Initiate game
    const startGame = () => {
        circleTurn = false;
        cellElements.forEach(cell => {
            cell.classList.remove(X_CLASS);
            cell.classList.remove(CIRCLE_CLASS);
            cell.removeEventListener('click', handleClick, {once: true})
        });
        
        // Event Listener to handle clicks
        cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, {once: true})
    });
        setBoardHoverClass();
        
        turns = 0;
    }

    // Switch from X to O or vice versa
    const switchTurns = () => {
        circleTurn = !circleTurn;
    }

    // Hover shows symbol of player turn
    const setBoardHoverClass = () => {
        gameBoard.classList.remove(X_CLASS);
        gameBoard.classList.remove(CIRCLE_CLASS);
        if (circleTurn) {
            gameBoard.classList.add(CIRCLE_CLASS);
        } else {
            gameBoard.classList.add(X_CLASS);
        }
    }

    return {
        cellElements,
        circleTurn,
        startGame,
    }
})();

board.startGame();