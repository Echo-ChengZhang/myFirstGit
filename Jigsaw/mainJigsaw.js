var board = new Array();

function newGame() {
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    for (var i = 0; i < arr.length + 10; i++) {
        var rdm = Math.floor(Math.random() * arr.length);
        arr.push(arr[rdm]);
        arr.splice(rdm, 1);
    }

    var k = 0;
    for (var i = 0; i < 3; i++) {
        board[i] = new Array();
        for (var j = 0; j < 3; j++) {
            board[i][j] = arr[k];
            k++;
        }
    }

    updateBoardView();
}

function updateBoardView() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.text(board[i][j]);

            switch (board[i][j]) {
                case 1:
                    gridCell.css("background", "url(pic/mona/1.jpg)");
                    gridCell.css("background-size", "100px 100px");
                    gridCell.css("font-size", "0");
                    break;

                case 2:
                    gridCell.css("background", "url(pic/mona/2.jpg)");
                    gridCell.css("background-size", "100px 100px");
                    gridCell.css("font-size", "0");
                    break;

                case 3:
                    gridCell.css("background", "url(pic/mona/3.jpg)");
                    gridCell.css("background-size", "100px 100px");
                    gridCell.css("font-size", "0");
                    break;

                case 4:
                    gridCell.css("background", "url(pic/mona/4.jpg)");
                    gridCell.css("background-size", "100px 100px");
                    gridCell.css("font-size", "0");
                    break;

                case 5:
                    gridCell.css("background", "url(pic/mona/5.jpg)");
                    gridCell.css("background-size", "100px 100px");
                    gridCell.css("font-size", "0");
                    break;

                case 6:
                    gridCell.css("background", "url(pic/mona/6.jpg)");
                    gridCell.css("background-size", "100px 100px");
                    gridCell.css("font-size", "0");
                    break;

                case 7:
                    gridCell.css("background", "url(pic/mona/7.jpg)");
                    gridCell.css("background-size", "100px 100px");
                    gridCell.css("font-size", "0");
                    break;

                case 8:
                    gridCell.css("background", "url(pic/mona/8.jpg)");
                    gridCell.css("background-size", "100px 100px");
                    gridCell.css("font-size", "0");
                    break;

                case 9:
                    gridCell.css("background", "url(pic/mona/9.jpg)");
                    gridCell.css("background-size", "100px 100px");
                    gridCell.css("font-size", "0");
                    break;

                default:
                    break;
            }
        }
    }
}

$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37: //left
            event.preventDefault();
            if (moveLeft()) {
                setTimeout("isGameOver()", 500);
            }
            break;

        case 38: //up
            event.preventDefault();
            if (moveUp()) {
                setTimeout("isGameOver()", 500);
            }
            break;

        case 39: //right
            event.preventDefault();
            if (moveRight()) {
                setTimeout("isGameOver()", 500);
            }
            break;

        case 40: //down
            event.preventDefault();
            if (moveDown()) {
                setTimeout("isGameOver()", 500);
            }
            break;

        default:
            break;
    }
})

function isGameOver() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] != i * 3 + j + 1) {
                return false;
            }
        }
    }

    gameOver();
}

function gameOver() {
    alert("Game Over");
}

function moveLeft() {
    if (!canMoveLeft(board)) {
        return false;
    }

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] == 9) {
                board[i][j] = board[i][j - 1];
                board[i][j - 1] = 9;
                setTimeout("updateBoardView()", 200);
                return true;
            }
        }
    }
}

function moveUp() {
    if (!canMoveUp(board)) {
        return false;
    }

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] == 9) {
                board[i][j] = board[i - 1][j];
                board[i - 1][j] = 9;
                setTimeout("updateBoardView()", 200);
                return true;
            }
        }
    }
}

function moveRight() {
    if (!canMoveRight(board)) {
        return false;
    }

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] == 9) {
                board[i][j] = board[i][j + 1];
                board[i][j + 1] = 9;
                setTimeout("updateBoardView()", 200);
                return true;
            }
        }
    }
}

function moveDown() {
    if (!canMoveDown(board)) {
        return false;
    }

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] == 9) {
                board[i][j] = board[i + 1][j];
                board[i + 1][j] = 9;
                setTimeout("updateBoardView()", 200);
                return true;
            }
        }
    }
}