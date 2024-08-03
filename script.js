const gameBoard = document.getElementById("gameBoard");
const currentPlayerDisplay = document.getElementById("currentPlayer");
const player1ScoreDisplay = document.getElementById("player1Score");
const player2ScoreDisplay = document.getElementById("player2Score");
const reloadButton = document.querySelector(".circle");
const exit = document.querySelector(".exit");

const size = parseInt(localStorage.getItem('gridSize')) ;

let currentPlayer = 1;
let player1Score = 0;
let player2Score = 0;
let colorLine;
let st = false;
let line;


// Create game board
function createBoard(size) {

  gameBoard.style.gridTemplateColumns = `repeat(${size * 2 + 1}, auto)`;
  gameBoard.style.gridTemplateRows = `repeat(${size * 2 + 1}, auto)`;
  for (let i = 0; i < size * 2 + 1; i++) {
    // i is row index
    for (let j = 0; j < size * 2 + 1; j++) {
      // j is column index
      if (i % 2 === 0 && j % 2 === 0) { 
        const dot = document.createElement("div");
        dot.classList.add("dot");
        gameBoard.appendChild(dot);
      } else if (i % 2 === 0 || j % 2 === 0) {
        const line = document.createElement("div");
        line.classList.add("line");
        if (i % 2 === 0) {
          line.dataset.type = "horizontal";
          line.style.marginTop = "5px";
        } else {
          line.classList.add("vertical");
          line.dataset.type = "vertical";
        }
        line.dataset.row = i;
        line.dataset.col = j;
        line.addEventListener("click", handleLineClick);
        gameBoard.appendChild(line);
      } else {
        const box = document.createElement("div");
        box.classList.add("box");
        gameBoard.appendChild(box);
      }
    }
  }
}

// Handle line click
function handleLineClick(e) { 
    
  const line = e.target;
  if (line.style.backgroundColor == "rgb(55, 175, 255)" || line.style.backgroundColor == "rgb(250, 66, 66)" || line.style.backgroundColor == "black" ) { return;}
  const lines = document.querySelectorAll('.line'); 

  lines.forEach(line => {
    if(line.style.backgroundColor == 'rgb(55, 175, 255)' || line.style.backgroundColor == 'rgb(250, 66, 66)') {
        line.style.backgroundColor = 'black';
    }
  });



  if (currentPlayer == 1) {
    line.style.backgroundColor = 'rgb(55, 175, 255)';
}else {
    line.style.backgroundColor = 'rgb(250, 66, 66)';
}


  const row = parseInt(line.dataset.row);
  const col = parseInt(line.dataset.col);

  let boxCompleted = false;

  if (line.dataset.type === "horizontal") {
    const box1Completed = checkAndCompleteBox(row - 1, col, line);
    const box2Completed = checkAndCompleteBox(row + 1, col, line);
    checkAndCompleteBox(row - 1, col, line);
    boxCompleted = box1Completed || box2Completed;
  } else {
    const box2Completed = checkAndCompleteBox(row, col + 1, line);
    const box1Completed = checkAndCompleteBox(row, col - 1, line);
    checkAndCompleteBox(row, col + 1, line);
    boxCompleted = box1Completed || box2Completed;
  }

  if (!boxCompleted) {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    currentPlayerDisplay.textContent = currentPlayer;
  }


  document.body.style.backgroundColor =
    currentPlayer === 1 ? "rgb(111,147,206)" : "lightcoral";

    winner();
}


// Check and complete box
function checkAndCompleteBox(row, col, line) {


  winner();

    player1Score = 0;
    player2Score = 0;
              
    const boxes = document.querySelectorAll('.box');
  
    boxes.forEach((box,i) => {
    if(box.textContent == 1){
      player1Score++;    
    }else if(box.textContent == 2) {
      player2Score++;    
    }
    });
     player1ScoreDisplay.textContent = player1Score;
     player2ScoreDisplay.textContent = player2Score;
      st = false;
      console.log("function ranned");
      line = line;
      if (row < 0 || col < 0 || row >= size * 2 + 1 || col >= size * 2 + 1) {
        gameBoard.classList.remove("disabled");
        return false;
      }
    
      const topLine = document.querySelector(
        `.line[data-row="${row - 1}"][data-col="${col}"]`
      );
      const bottomLine = document.querySelector(
        `.line[data-row="${row + 1}"][data-col="${col}"]`
      );
      const leftLine = document.querySelector(
        `.line[data-row="${row}"][data-col="${col - 1}"]`
      );
      const rightLine = document.querySelector(
        `.line[data-row="${row}"][data-col="${col + 1}"]`
      );
    
      if (!topLine && !bottomLine && !leftLine && !rightLine) {
        gameBoard.classList.remove("disabled");
        return false;
      }
    
      let lineCount = 0;
    
      if (topLine.style.backgroundColor == "rgb(55, 175, 255)" || topLine.style.backgroundColor == "rgb(250, 66, 66)" || topLine.style.backgroundColor == "black" ) {
        lineCount++;
        console.log("top",topLine);
      } else {
        colorLine = topLine;
      }
    
      if (bottomLine.style.backgroundColor == "rgb(55, 175, 255)" || bottomLine.style.backgroundColor == "rgb(250, 66, 66)" || bottomLine.style.backgroundColor == "black" ) {
        lineCount++;
        console.log("bottom");
      } else {
        colorLine = bottomLine;
      }
    
      if (rightLine.style.backgroundColor == "rgb(55, 175, 255)" || rightLine.style.backgroundColor == "rgb(250, 66, 66)" || rightLine.style.backgroundColor == "black" ) {
        lineCount++;
        console.log("right");
      } else {
        colorLine = rightLine;
      }
    
      if (leftLine.style.backgroundColor == "rgb(55, 175, 255)" || leftLine.style.backgroundColor == "rgb(250, 66, 66)" || leftLine.style.backgroundColor == "black" ) {
        lineCount++;
        console.log("left");
      } else {
        colorLine = leftLine;
      }
    
      console.log(lineCount);
      
      
      // Update the text content of the box
      const boxIndex = ((row - 1) / 2) * size + (col - 1) / 2;
      console.log(boxIndex+size);
      if (lineCount === 4) {
    
        // Calculate the index of the box
        gameBoard.classList.remove("disabled");
        console.log("index", boxIndex);
        boxes[boxIndex].textContent = currentPlayer;
        if (currentPlayer == 1) {
            boxes[boxIndex].style.backgroundColor = 'rgb(55, 175, 255)';
        }else {
            boxes[boxIndex].style.backgroundColor = 'rgb(250, 66, 66)';
        }
        boxes[boxIndex].style.opacity = '1';
    
        return true;
      } else if (
        lineCount === 3 &&
        boxIndex - 1 >= 0 &&
        !boxes[boxIndex - 1].textContent == "" &&
        line.dataset.type === "vertical" &&
        parseInt(line.dataset.col) < parseInt(colorLine.dataset.col)
      ) {

        st = true;
          gameBoard.classList.add("disabled");
          line.style.backgroundColor = "black";
          if (currentPlayer == 1) {
            boxes[boxIndex].style.backgroundColor = 'rgb(55, 175, 255)';
        }else {
            boxes[boxIndex].style.backgroundColor = 'rgb(250, 66, 66)';
        }
        boxes[boxIndex].style.opacity = '1';
          line = colorLine;
          if (currentPlayer == 1) {
            colorLine.style.backgroundColor = 'rgb(55, 175, 255)';
        }else {
            colorLine.style.backgroundColor = 'rgb(250, 66, 66)';
        }
    
          boxes[boxIndex].textContent = currentPlayer;

         setTimeout(()=>{          
            if (colorLine === rightLine) {
            return checkAndCompleteBox(row, col + 2, line);
          } else if (colorLine === bottomLine) {
            return checkAndCompleteBox(row + 2, col, line);
          } else if (colorLine === topLine) {
            return checkAndCompleteBox(row - 2, col, line);
          } else {
            return checkAndCompleteBox(row + 2, col, line);
    
          }},500)
      } else if (
        lineCount === 3 &&
        boxIndex + 1 < size * size &&
        !boxes[boxIndex + 1].textContent == "" &&
        line.dataset.type == "vertical" &&
        parseInt(line.dataset.col) > parseInt(colorLine.dataset.col)
      ) {
        console.log("-----------right box is filled-----------");
        st = true;
          gameBoard.classList.add("disabled");
          line.style.backgroundColor = "black";
          if (currentPlayer == 1) {
            boxes[boxIndex].style.backgroundColor = 'rgb(55, 175, 255)';
        }else {
            boxes[boxIndex].style.backgroundColor = 'rgb(250, 66, 66)';
        }
        boxes[boxIndex].style.opacity = '1';
          line = colorLine;
          if (currentPlayer == 1) {
            colorLine.style.backgroundColor = 'rgb(55, 175, 255)';
        }else {
            colorLine.style.backgroundColor = 'rgb(250, 66, 66)';
        }
    
          boxes[boxIndex].textContent = currentPlayer;

          setTimeout(()=>{
          if (colorLine === leftLine) {
            return checkAndCompleteBox(row, col - 2, line);
          } else if (colorLine === topLine) {
            return checkAndCompleteBox(row - 2, col, line);
          } else if (colorLine === bottomLine) {
            return checkAndCompleteBox(row + 2, col, line);
          } else {
            return checkAndCompleteBox(row + 2, col, line);
          
        }},500)
    
      } else if (
        lineCount === 3 &&
        boxIndex + size < size * size &&
        !boxes[boxIndex + size].textContent == "" &&
        line.dataset.type == "horizontal" &&
        parseInt(line.dataset.row) > parseInt(colorLine.dataset.row)
    
      ) {
        console.log("-----------bottom box is filled-----------");
        st = true;
          gameBoard.classList.add("disabled");
          line.style.backgroundColor = "black";
          if (currentPlayer == 1) {
            boxes[boxIndex].style.backgroundColor = 'rgb(55, 175, 255)';
        }else {
            boxes[boxIndex].style.backgroundColor = 'rgb(250, 66, 66)';
        }
        boxes[boxIndex].style.opacity = '1';
          line = colorLine;
          if (currentPlayer == 1) {
            colorLine.style.backgroundColor = 'rgb(55, 175, 255)';
        }else {
            colorLine.style.backgroundColor = 'rgb(250, 66, 66)';
        }
    
          boxes[boxIndex].textContent = currentPlayer;

          setTimeout(()=>{
          if (colorLine === topLine) {
            return checkAndCompleteBox(row - 2, col, line);
          } else if (colorLine === rightLine) {
            return checkAndCompleteBox(row, col + 2, line);
          } else if (colorLine === bottomLine) {
            return checkAndCompleteBox(row + 2, col, line);
          }  else {
            return checkAndCompleteBox(row, col - 2, line);
        }},500)
      
      } else if (
        lineCount === 3 &&
        boxIndex - size >= 0 &&
        !boxes[boxIndex - size].textContent == "" &&
        line.dataset.type == "horizontal" &&
        parseInt(line.dataset.row) < parseInt(colorLine.dataset.row)
      ) {
        console.log("-----------Top box is filled-----------");
        st = true;
          gameBoard.classList.add("disabled");
          line.style.backgroundColor = "black";
          if (currentPlayer == 1) {
            boxes[boxIndex].style.backgroundColor = 'rgb(55, 175, 255)';
        }else {
            boxes[boxIndex].style.backgroundColor = 'rgb(250, 66, 66)';
        }
        boxes[boxIndex].style.opacity = '1';
          line = colorLine;
          if (currentPlayer == 1) {
            colorLine.style.backgroundColor = 'rgb(55, 175, 255)';
        }else {
            colorLine.style.backgroundColor = 'rgb(250, 66, 66)';
        }

    
          boxes[boxIndex].textContent = currentPlayer;
          setTimeout(()=>{
          if (colorLine === bottomLine) {
            return checkAndCompleteBox(row + 2, col, line);
          } else if (colorLine === rightLine) {
            return checkAndCompleteBox(row, col + 2, line);
          }else if (colorLine === topLine) {
            return checkAndCompleteBox(row - 2, col, line);    
          } else {
            return checkAndCompleteBox(row, col - 2, line);
          
        }},500)
      }
    
      console.log("again ran");
      // if( colorLine == leftLine ) {checkAndCompleteBox(row ,col - 2); }
      // else if ( colorLine == rightLine ) {checkAndCompleteBox(row ,col + 2); }
      // else if ( colorLine == topLine ) {checkAndCompleteBox(row + 2, col ); }
      // else { checkAndCompleteBox(row - 2, col );}
    
      console.log("before ", gameBoard.classList);
      console.log("st is ", st);
      if (st) return;
  
      gameBoard.classList.remove("disabled");
      console.log("after ", gameBoard.classList);
    
      return false;

}

createBoard(size);

//
function winner() {
  console.log("winnn");
  player1Score = 0;
  player2Score = 0;
  const boxes = document.querySelectorAll('.box');

  boxes.forEach((box) => {
    if (box.textContent == 1) {
      player1Score++;
    } else if (box.textContent == 2) {
      player2Score++;
    }
  });
  console.log("player1Score",player1Score , " player2Score",player2Score);

  if (player1Score + player2Score === (size * size)-1) {
    let winnerText = "";
    let winnerColor = "";

    if (player1Score > player2Score) {
      console.log("blue");
      winnerText = "Blue Wins!";
      winnerColor = "rgb(55, 175, 255)";
    } else if (player2Score > player1Score) {
      console.log("red");
      winnerText = "Red Wins!";
      winnerColor = "rgb(250, 66, 66)";
    } else {
      winnerText = "It's a Draw!";
      winnerColor = "gray";
    }

    const overlay = document.getElementById('winnerOverlay');
    const message = document.getElementById('winnerMessage');

    overlay.style.backgroundColor = winnerColor;
    message.textContent = winnerText;
    overlay.style.display = "flex";

    setTimeout(() => {
      overlay.style.display = "none";
    }, 3000);
  
  }
}


// Reload the game page
reloadButton.addEventListener('click', () => {
  location.reload();}
);  

//exit button
exit.addEventListener('click', () => {
  location.href = 'startPage.html';  // Replace with your target page URL
});