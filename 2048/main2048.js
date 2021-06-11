var board = new Array();
var score = 0;
var highestScore = 0;
var hasConflicted = new Array();

$(document).ready(function () {
    newGame();
});

function newGame() {
    //初始化棋盘格
    init();
    //随机两个位置生成数字
    generateOneNumber();
    generateOneNumber();
}

function init() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css("top", getPosTop(i, j));
            gridCell.css("left", getPosLeft(i, j));
        }
    }

    for (var i = 0; i < 3; i++) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j = 0; j < 3; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    updateBoardView();

    score = 0;
    updateScore(score);
}

function updateBoardView() {
    $(".number-cell").remove();
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            $("#grid-container").append("<div class = 'number-cell' id = 'number-cell-" + i + "-" + j + "'></div>");
            var theNumberCell = $("#number-cell-" + i + "-" + j);

            if (board[i][j] == 0) {
                theNumberCell.css("width", "0");
                theNumberCell.css("height", "0");
                theNumberCell.css("top", getPosTop(i, j) + 50);
                theNumberCell.css("left", getPosLeft(i, j) + 50);
            } else {
                theNumberCell.css("width", "100px");
                theNumberCell.css("height", "100px");
                theNumberCell.css("top", getPosTop(i, j));
                theNumberCell.css("left", getPosLeft(i, j));
                theNumberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
                theNumberCell.css("color", getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }

            hasConflicted[i][j] = false;
        }
    }
}

function generateOneNumber() {
    if (noSpace(board)) {
        return false;
    } else {
        //随机一个位置
        var randX = parseInt(Math.floor(Math.random() * 3));
        var randY = parseInt(Math.floor(Math.random() * 3));
        while (true) {
            if (board[randX][randY] == 0) {
                break;
            } else {
                randX = parseInt(Math.floor(Math.random() * 3));
                randY = parseInt(Math.floor(Math.random() * 3));
            }
        }
        //随机一个数字
        var randNumber = Math.random() < 0.6 ? 2 : 4;
        //在该位置显示该数字
        board[randX][randY] = randNumber;
        showNumberWithAnimation(randX, randY, randNumber);
        return true;
    }
}

$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37: //left
            event.preventDefault();
            if (moveLeft()) {
                setTimeout("generateOneNumber()", 200);
                setTimeout(" isGameOver()", 1000);
            }
            break;

        case 38: //up
            event.preventDefault();
            if (moveUp()) {
                setTimeout("generateOneNumber()", 200);
                setTimeout(" isGameOver()", 1000);
            }
            break;

        case 39: //right
            event.preventDefault();
            if (moveRight()) {
                setTimeout("generateOneNumber()", 200);
                setTimeout(" isGameOver()", 1000);
            }
            break;

        case 40: //down
            event.preventDefault();
            if (moveDown()) {
                setTimeout("generateOneNumber()", 200);
                setTimeout(" isGameOver()", 1000);
            }
            break;

        default:
            break;
    }
})

function isGameOver() {
    if (noSpace(board) && noMove(board)) {
        gameOver();
    }
}

function gameOver() {
    alert("游戏结束,你的分数是" + score);
}

function moveLeft() {
    if (!canMoveLeft(board)) {
        return false;
    }

    for (var i = 0; i < 3; i++) {
        for (var j = 1; j < 3; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
                        //move
                        //add
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore(score);
                        if (highestScore < score) {
                            highestScore = score;
                            updateHighestScore(highestScore);
                        }
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}

function moveUp() {
    if (!canMoveUp(board)) {
        return false;
    }

    for (var j = 0; j < 3; j++) {
        for (var i = 1; i < 3; i++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlockHorizontal(j, i, k, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    if (board[k][j] == board[i][j] && noBlockHorizontal(j, i, k, board) && !hasConflicted[k][j]) {
                        //move
                        //add
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore(score);
                        if (highestScore < score) {
                            highestScore = score;
                            updateHighestScore(highestScore);
                        }
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}

function moveRight() {
    if (!canMoveRight(board)) {
        return false;
    }

    for (var i = 0; i < 3; i++) {
        for (var j = 1; j > -1; j--) {
            if (board[i][j] != 0) {
                for (var k = 2; k > j; k--) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
                        //move
                        //add
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[i][k];
                        updateScore(score);
                        if (highestScore < score) {
                            highestScore = score;
                            updateHighestScore(highestScore);
                        }
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}

function moveDown() {
    if (!canMoveDown(board)) {
        return false;
    }

    for (var j = 0; j < 3; j++) {
        for (var i = 1; i > -1; i--) {
            if (board[i][j] != 0) {
                for (var k = 2; k > i; k--) {
                    if (board[k][j] == 0 && noBlockHorizontal(j, i, k, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    if (board[k][j] == board[i][j] && noBlockHorizontal(j, i, k, board) && !hasConflicted[k][j]) {
                        //move
                        //add
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore(score);
                        if (highestScore < score) {
                            highestScore = score;
                            updateHighestScore(highestScore);
                        }
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}