const winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8]
]

const game = (() => {

    const checkWin = (currentClass) => {
        return winning_combinations.some(combination => {
            return combination.every(index => {
                return board.cellElements[index].classList.contains(currentClass)
            })
        })
    }

    // Place player mark
    const placeMark = (cell, currentClass) => {
        cell.classList.add(currentClass);
    }

    return {
        checkWin,
        placeMark
    }
})()
const board = (() => {

    const X_CLASS = 'x';
    const CIRCLE_CLASS = 'circle';
    let circleTurn;

    // Select gameboard on DOM
    const gameBoard = document.getElementById('board')

    // Select DOM cells
    const cellElements = document.querySelectorAll('[data-cell]');
    
    // Event Listener to handle clicks
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, {once: true})
    });
    
    function handleClick(e) {
        // Place Mark
        const cell = e.target;
        const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
        game.placeMark(cell, currentClass);

        // Check For Win
        if (game.checkWin(currentClass)) {
            console.log (`${currentClass} wins`)
        }
        // Check For Draw
        // Switch Turns
        switchTurns();
        setBoardHoverClass();
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

    }
})();
