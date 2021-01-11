import { horisontal_line, vertical_line } from "../../WinDrawLines/Win_draw_line";

const IsOutOfBounds = (row, col, matrix) => {
    return row < 0 || row >= matrix.length || col < 0 || col >= matrix.legth;
}

export const SecondLoop = (i, matrix, cpuSymbol, userSymbol) => {
    let counterRow = 0;
    let counterCol = 0;
    let cpuCounterRow = 0;
    let cpuCounterCol = 0;

    for (var j = 0; j < matrix.length; j++) {

        // To Do logic for cpu not only to put random.
        //if (matrix[i][j] != cpuSymbol && matrix[i][j] != userSymbol && counterCol == 2) {
        //    console.log("hre");
        //    console.log(counterRow);

        //}

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

        if (counterCol === matrix.length) {
            horisontal_line(i);
        }

        if (counterRow === matrix.length) {
            vertical_line(i);
        }

        return "END";
    }

    if (cpuCounterCol == matrix.length || cpuCounterRow == matrix.length) {
        if (cpuCounterCol === matrix.length) {
            horisontal_line(i);
        }

        if (cpuCounterRow === matrix.length) {
            vertical_line(i);
        }


        return "CPU WIN";
    }
}

export default SecondLoop;