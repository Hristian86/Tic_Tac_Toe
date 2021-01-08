const Diagonals = (CPU, cpuSymbol, userSymbol, isSymbolAdded) => {
    let index = 0;
    let reverseIndex = CPU.length - 1;

    let isDiagonalUser = 0;
    let isDiagonalCPU = 0;
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
        return "END";
    } else if (isDiagonalCPU == CPU.length || isReverseDiagonalCPU == CPU.length) {
        return "CPU WIN";
    }
}

export default Diagonals;