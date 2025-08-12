const boxes = document.querySelectorAll(".box");
const title = document.querySelector("#title");
const body = document.querySelector("body");
const resetbtn = document.querySelector(".reset");
const restartbtn = document.querySelector(".restart");

let turnO = true;
let steps = 0;

let winpattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        steps++;


        box.innerText = turnO ? "O" : "X";
        box.style.color = turnO ? "red" : "blue";
        body.style.backgroundColor = turnO ? "rgb(24, 73, 122)" : "rgba(255, 0, 0, 0.5)";
        turnO = !turnO;

        title.innerText = `Player ${turnO ? "O" : "X"} turn`;
        box.disabled = true;

        checkWinner();
        if(!checkWinner() && steps===9){
           title.innerText = `It's a draw`; 
        }
    });
});

const checkWinner = () => {
    for (let pattern of winpattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                boxes[pattern[0]].style.backgroundColor = 'rgb(237, 163, 90)';
                boxes[pattern[2]].style.backgroundColor = 'rgb(237, 163, 90)';
                boxes[pattern[1]].style.backgroundColor = 'rgb(237, 163, 90)';
                return pos1, pattern;
            }
        }
    }
    return null;
};

const showWinner = (winner) => {

    title.innerText = `Player ${winner} won the game`;

    resetbtn.classList.add("hide");
    restartbtn.classList.remove("hide");

    body.style.backgroundColor = winner === "X" ? "rgb(24, 73, 122)" : "rgba(255, 0, 0, 0.5)";

    disableBoxes();
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const resetGame = () => {
    steps = 0;
    turnO = true;
    enableBoxes();
    title.innerText = `Player ${turnO ? "O" : "X"} turn`;
    body.style.backgroundColor="rgba(255, 0, 0, 0.5)"
    resetbtn.classList.remove("hide");
    restartbtn.classList.add("hide");
};

const restartGame = () => {
    steps = 0;
    let position1, val1 = checkWinner();

    boxes[val1[0]].style.backgroundColor = 'rgb(201, 216, 148)';
    boxes[val1[1]].style.backgroundColor = 'rgb(201, 216, 148)';
    boxes[val1[2]].style.backgroundColor = 'rgb(201, 216, 148)';
    enableBoxes();

    resetbtn.classList.remove("hide");
    restartbtn.classList.add("hide");

    if (position1 === "O") {
        turnO = true;
        body.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
    } else {
        turnO = false;
        body.style.backgroundColor = "rgb(24, 73, 122)";
    }

    title.innerText = `Player ${turnO ? "O" : "X"} turn`;
};
restartbtn.addEventListener("click", restartGame); resetbtn.addEventListener("click", resetGame);
