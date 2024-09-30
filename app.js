let boxes = $(".box");
let turn = "X";  // Initial turn
let music = new Audio("uwu.mp3");
let hasWon = false;
let winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWin() {
    for (let pattern of winPattern) {
        let pos1 = $(boxes[pattern[0]]).text();
        let pos2 = $(boxes[pattern[1]]).text();
        let pos3 = $(boxes[pattern[2]]).text();
        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                music.play();
                $("img").addClass("show");
                hasWon = true;
                $(".turn").text(turn + " Wins");
                return; 
            }
        }
    }
}

const computerGuess = () => {
    if (hasWon) return; 

    let randomNumber = Math.floor(Math.random() * 9);

    while ($(boxes[randomNumber]).text() !== "") {
        randomNumber = Math.floor(Math.random() * 9);
    }

    $(boxes[randomNumber]).text(turn); 
    checkWin(); 

    if (!hasWon) {
        turn = (turn === "X" ? "O" : "X"); // Toggle the turn after computer's move
        $(".turn").text("Turn for " + turn); // Update the turn message
    }
};

boxes.each(function (index) {
    $(this).on("click", function () {
        if ($(this).text() === "" && !hasWon) {
            $(this).text(turn);  // Player makes their move
            checkWin();  // Check if player wins after their move

            if (!hasWon) {
                turn = (turn === "X" ? "O" : "X");
                $(".turn").text("Turn for " + turn);
                setTimeout(computerGuess, 500);  // Small delay for computer move
            }
        }
    });
});

$(".reset").on("click", function () {
    boxes.text("");  // Clear all boxes
    music.pause();  // Stop the music
    music.currentTime = 0;  // Reset music to start
    $("img").removeClass("show");  // Hide the image
    $(".turn").text("Click!");  // Reset the turn message
    turn = "X";  // Reset turn to X
    hasWon = false;  // Reset win flag
});
