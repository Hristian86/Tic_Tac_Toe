const IsOutOfBounds = (row, col, matrix) => {
    return row < 0 || row >= matrix.length || col < 0 || col >= matrix.legth;
}

export const SecondLoop = (i, matrix) => {
    let counterRow = 0;
    let counterCol = 0;
    let cpuCounterRow = 0;
    let cpuCounterCol = 0;

    for (var j = 0; j < matrix.length; j++) {

        if (matrix[i][j] == "X") {
            counterCol += 1;
        }

        if (matrix[j][i] == "X") {
            counterRow += 1;
        }

        if (matrix[i][j] == "Y") {
            cpuCounterCol += 1;
        }

        if (matrix[j][i] == "Y") {
            cpuCounterRow += 1;
        }
    }

    if (counterCol == 3 || counterRow == 3) {
        return "END";
    }

    if (cpuCounterCol == 3 || cpuCounterRow == 3) {
        return "CPU WIN";
    }
}

export default SecondLoop;