const todayWord = 'HELLO';
const cont = document.querySelector(".container");
const winOrLose = document.querySelector(".winOrLose");

let row = 0;
let col = 0;

for (let i = 0 ; i < 6 ; i++) {
    for (let j = 0 ; j < 5 ; j++) {
        let box = document.createElement('div');
        box.setAttribute('id','box'+i+"-"+j);
        box.classList.add("tile");
        // box.innerText = "a";
        cont.appendChild(box);
    }
}


document.addEventListener('keyup' , (ev) => {
    let key = ev.key;
    updateBoard(key);
})

function updateBoard(key) {
    if (row < 6) {
        if (col <= 5) {
            if ("a" <= key && key <= "z") {
                if (col == 5) {
                    alert("Cannot insert more elements");
                    col = 5;
                    return;
                }
                let currBox = document.querySelector("#box"+row+"-"+col);
                currBox.innerText = key.toUpperCase(); 
                col++;
            }
            else if (key == "Backspace") {
                col--;
                if (col < 0) {
                    alert("There is no element to delete");
                    col = 0;
                    return;
                }
                let currBox = document.querySelector("#box"+row+"-"+col);
                currBox.innerText = "";
            }
            else if (key == 'Enter') {
                if (col <= 4) {
                    alert(`Enter ${5 - col} more words then press enter`);
                    return;
                }
                else if (col == 5) {
                    updateRow(row);
                    row++;
                    col = 0;
                }
            }
            else {
                alert("Enter valid key");
            }
        }
    }
}

function updateRow(row) {
    let count = 0;
    for (let i = 0 ; i < 5 ; i++) {
        let currBox = document.querySelector("#box"+row+"-"+i);

        if (currBox.innerText == todayWord.charAt(i)) {
            currBox.classList.add("correct");
            count++;
        }
        else if (todayWord.includes(currBox.innerText)) {
            currBox.classList.add("wrongPosition");
        }
        else {
            currBox.classList.add("wrong");
        }
    }
    if (count == 5) {
        let gameOver = document.createElement('div');
        let score;
        if (row == 0) {
            score = 100;
        }
        else {
            score = 100 - row * 10;
        }
        gameOver.innerText = `You Guessed It Right \n \n Your Score is : ${score} / 100`;
        gameOver.classList.add("lastQuotes");
        cont.classList.add("gayab");
        winOrLose.appendChild(gameOver);
    }
}
