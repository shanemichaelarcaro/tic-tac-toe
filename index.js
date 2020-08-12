/*
 * Name: Tic Tac Toe
 * Date: 8/11/20
 * Author: Shane Arcaro
 * Description: Javascript Toc Tac Toe game
 */

// global game variables for keeping track of turn and position
let playerOne = true;

let playerBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]

// Function to act when a table button is pressed
function pressed(id) {
    // Check if the pressed button has already been activated
    let button = document.getElementById(id);
    if(button.innerText != '')
        return;

    // Determine col and row position baised on id
    let col = id % 3;
    let row = parseInt(id / 3, 10);

    // Update player turn and game indicator values
    playerBoard[col][row] = playerOne ? 'X' : 'O';
    button.innerText = playerOne ? 'X' : 'O';
    button.disabled = true;
    playerOne = !playerOne;
    document.getElementById('turn').innerText = playerOne ? 'X' : 'O';
    
    // Check if anyone has won the game
    let winning = winner();

    /*
        If someone has won, update the background and foreground of 
        every winning tile to indicate to the players.
    */
    for(let i = 0; i < winning.length; i++) {
        let button = document.getElementById(winning[i]);
        button.style.background = 'green';
        button.style.color = 'white';
    }   

    // Check if the game has been won by a player
    if(winning != 0) {
        // Update player turn and game indicator values
        // Disable all table buttons
        for(let i = 0; i < 9; i++) {
            let button = document.getElementById(i);
            button.disabled = true;
        }
        let playerText = document.getElementById('header');
        let playerWinner = document.getElementById('turn');

        playerText.textContent = 'Winner: ';
        playerWinner.textContent = document.getElementById(winning[0]).textContent;

        addResetButton();
    }

    // Check if game is over because of a tie
    if(isGameOver()) {
        addResetButton();
        let playerText = document.getElementById('header');
        let playerWinner = document.getElementById('turn');

        playerText.textContent = 'Tie';
        playerWinner.textContent = 'Game';
    }
        
}

// Add reset button to the bottom of the screen
function addResetButton() {
    let resetButton = document.createElement('button');
    let resetText = document.createTextNode('Reset');

    resetButton.appendChild(resetText);

    // Style buttons to match theme
    resetButton.style.width = '10rem';
    resetButton.style.height = '3rem';
    resetButton.style.margin = '0 auto 2.5rem';
    resetButton.onclick = reset;
    resetButton.id = 'game-reset-button';
    resetButton.style.fontFamily = 'Hind Madurai, sans-serif'
    resetButton.style.fontSize = '1.5rem';

    // Clear board html to stop multiple button spawns
    let board = document.getElementById('addButton');
    board.innerHTML = '';
    board.appendChild(resetButton); 
}

// Check if game is over using a '' check
function isGameOver() {
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            let text = playerBoard[i][j];
            if(text==='')
                return false;
        }
    }
    return true;
}

// Reset the game
function reset() {
    // Reset game variables
    playerOne = true;
    playerBoard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]

     /*
        Because the board HTML is cleared after reset is called
        the buttons must be recreated and added back to the board.
        This is to prevent multiple button spawns.
    */
    let board = document.getElementById('addButton');
    board.innerHTML = '';

    let table = document.getElementById('board-table');
    table.innerHTML = "";

    let counter = 0;
    for(let i = 0; i < 3; i++) {
        let tableRow = document.createElement('tr');

        for(let j = 0; j < 3; j++) {
            let tableData = document.createElement('td');
            let button = document.createElement('button');
            button.className = 'table-button';
            button.id = counter++;
            button.onclick = function(){pressed(button.id)};
            tableData.appendChild(button);
            tableRow.appendChild(tableData);
        }
        table.appendChild(tableRow);
    }

    // Edit the corners of new buttons to keep theme

    let buttons = document.getElementsByClassName('table-button');

    let corner1 = buttons[0];
    let corner2 = buttons[2];
    let corner3 = buttons[6];
    let corner4 = buttons[8];

    corner1.style.borderTopLeftRadius = '20%';
    corner2.style.borderTopRightRadius = '20%';
    corner3.style.borderBottomLeftRadius = '20%';
    corner4.style.borderBottomRightRadius = '20%';

    corner1.style.border = 'none';
    corner2.style.border = 'none';
    corner3.style.border = 'none';
    corner4.style.border = 'none';


    // Reset game variable text
    let playerText = document.getElementById('header');
    playerText.textContent = 'Turn:';

    let playerWinner = document.getElementById('turn');
    playerWinner.textContent = 'X';
}

// Helper function for winner to check if 3 values are equivalent
function checkValues(valueA, valueB, valueC) {
    if(valueA == "" || valueB == "" || valueC == "")
        return false;
    return valueA == valueB && valueA == valueC;
}

// Check if the game has been won by a player
function winner() {
    // Vertical
    if(checkValues(playerBoard[0][0], playerBoard[0][1], playerBoard[0][2]))
        return [0, 3, 6];
    if(checkValues(playerBoard[1][0], playerBoard[1][1], playerBoard[1][2]))
        return [1, 4, 7];
    if(checkValues(playerBoard[2][0], playerBoard[2][1], playerBoard[2][2]))
        return [2, 5, 8];

    // Horizontal
    if(checkValues(playerBoard[0][0], playerBoard[1][0], playerBoard[2][0]))
        return [0, 1, 2];
    if(checkValues(playerBoard[0][1], playerBoard[1][1], playerBoard[2][1]))
        return [3, 4, 5];
    if(checkValues(playerBoard[0][2], playerBoard[1][2], playerBoard[2][2]))
        return [6, 7, 8];

    // Diagonal
    if(checkValues(playerBoard[0][0], playerBoard[1][1], playerBoard[2][2]))
        return [0, 4, 8];
    if(checkValues(playerBoard[0][2], playerBoard[1][1], playerBoard[2][0]))
        return [2, 4, 6];

    return 0;
}