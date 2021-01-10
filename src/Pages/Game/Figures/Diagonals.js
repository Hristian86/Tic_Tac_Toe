const Diagonals = (CPU, cpuSymbol, userSymbol, isSymbolAdded) => {
    let index = 0;
    let reverseIndex = CPU.length - 1;

    // Left to right diagona.
    let isDiagonalUser = 0;
    let isDiagonalCPU = 0;

    // Right to left diagona.
    let isReverseDiagonalUser = 0;
    let isReverseDiagonalCPU = 0;

    while (index < CPU.length) {

        if (CPU[index][index] == userSymbol) {
            isDiagonalUser += 1;
        }

        if (CPU[index][index] == cpuSymbol) {
            isDiagonalCPU += 1;
        }

        if (CPU[reverseIndex][index] == userSymbol) {
            isReverseDiagonalUser += 1;
        }

        if (CPU[reverseIndex][index] == cpuSymbol) {
            isReverseDiagonalCPU += 1;
        }

        reverseIndex -= 1;
        index += 1;
    }

    if (isDiagonalUser == CPU.length || isReverseDiagonalUser == CPU.length) {

        // To Do drow left to right line.
        return "END";
    } else if (isDiagonalCPU == CPU.length || isReverseDiagonalCPU == CPU.length) {

        // To Do drow right to left line.
        return "CPU WIN";
    }
}

export default Diagonals;