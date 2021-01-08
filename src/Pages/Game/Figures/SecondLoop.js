const IsOutOfBounds = (row, col, matrix) => {
    return row < 0 || row >= matrix.length || col < 0 || col >= matrix.legth;
}

export const SecondLoop = (i, matrix, cpuSymbol, userSymbol) => {
    let counterRow = 0;
    let counterCol = 0;
    let cpuCounterRow = 0;
    let cpuCounterCol = 0;

    for (var j = 0; j < matrix.length; j++) {

        if (matrix[i][j] != cpuSymbol && matrix[i][j] != userSymbol && counterCol == 2) {
            console.log("hre");
            console.log(counterRow);
            
        }

        if (matrix[i][j] == userSymbol) {
            counterCol += 1;
        }

        if (matrix[j][i] == userSymbol) {
            counterRow += 1;
        }

        if (matrix[i][j] == cpuSymbol) {
            cpuCounterCol += 1;
        }

        if (matrix[j][i] == cpuSymbol) {
            cpuCounterRow += 1;
        }
    }

    if (counterCol == matrix.length || counterRow == matrix.length) {
        return "END";
    }

    if (cpuCounterCol == matrix.length || cpuCounterRow == matrix.length) {
        return "CPU WIN";
    }
}

export default SecondLoop;