function getPosTop(i, j) {
    return 20 + 120 * i;
}

function getPosLeft(i, j) {
    return 20 + 120 * j;
}

function getNumberBackgroundColor(number) {
    switch (number) {
        case 2:
            return "#eee4da";
        case 4:
            return "#ede08c";
        case 8:
            return "#f2b179";
        case 16:
            return "#f59563";
        case 32:
            return "#f67c5f";
        case 64:
            return "#f65e3b";
        case 128:
            return "#edcf72";
        case 256:
            return "#edcc61";
        case 512:
            return "#9c0";
        case 1024:
            return "#33b5e5";
        case 2048:
            return "#09c";
        case 4096:
            return "#a6c";
        case 8192:
            return "#93c";
    }
}

function getNumberColor(number) {
    if (number <= 4) {
        return "#776e65";
    } else {
        return "white"
    }
}

function noSpace(board) {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}

function noMove(board) {
    if (canMoveLeft(board) || canMoveUp(board) || canMoveRight(board) || canMoveDown(board)) {
        return false;
    } else {
        return true;
    }
}

function canMoveLeft(board) {
    for (var i = 0; i < 3; i++) {
        for (var j = 1; j < 3; j++) {
            if (board[i][j] != 0) {
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveUp(board) {
    for (var j = 0; j < 3; j++) {
        for (var i = 1; i < 3; i++) {
            if (board[i][j] != 0) {
                if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveRight(board) {
    for (var i = 0; i < 3; i++) {
        for (var j = 1; j > -1; j--) {
            if (board[i][j] != 0) {
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown(board) {
    for (var j = 0; j < 3; j++) {
        for (var i = 1; i > -1; i--) {
            if (board[i][j] != 0) {
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function noBlockHorizontal(line, col1, col2, board) {
    for (var i = col2 + 1; i < col1; i++) {
        if (board[line][i] != 0) {
            return false;
        }
    }
    return true;
}