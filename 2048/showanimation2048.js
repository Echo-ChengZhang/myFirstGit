function showNumberWithAnimation(i, j, k) {
    var numberCell = $("#number-cell-" + i + "-" + j);
    numberCell.css("background-color", getNumberBackgroundColor(k));
    numberCell.css("color", getNumberColor(k));
    numberCell.text(k);
    numberCell.animate({
        width: "100px",
        height: "100px",
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 200);
}

function showMoveAnimation(fromX, fromY, toX, toY) {
    var numberCell = $("#number-cell-" + fromX + "-" + fromY);
    numberCell.animate({
        top: getPosTop(toX, toY),
        left: getPosLeft(toX, toY)
    }, 200);
}

function updateScore(score) {
    $("#score").text(score);
}

function updateHighestScore(highestScore) {
    $("#highestScore").text(highestScore);
}