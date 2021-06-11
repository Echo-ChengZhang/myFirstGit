function canMoveLeft(board) {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] == 9 && j != 0) {
                return true;
            }
        }
    }
    return false;
}

function canMoveUp(board) {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] == 9 && i != 0) {
                return true;
            }
        }
    }
    return false;
}

function canMoveRight(board) {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] == 9 && j != 2) {
                return true;
            }
        }
    }
    return false;
}

function canMoveDown(board) {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] == 9 && i != 2) {
                return true;
            }
        }
    }
    return false;
}