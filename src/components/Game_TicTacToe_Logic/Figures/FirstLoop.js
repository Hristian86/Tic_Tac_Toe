import SecondLoop from "./SecondLoop";
import Diagonals from "./Diagonals";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import Row_Win from "../../ConstantSymbols/Row_Win";

const FirstLoop = (CPU, cpuSymbol, userSymbol, isSymbolAdded) => {
    // Check diagonals for win.
    const resu = Diagonals(CPU, cpuSymbol, userSymbol, isSymbolAdded);

    if (resu !== undefined) {
        return resu;
    }

    for (var i = 0; i < CPU.length; i++) {

        let result = SecondLoop(i, CPU, cpuSymbol, userSymbol, isSymbolAdded);
        if (result === "END") {
            return "END";
        } else if (result === "CPU WIN") {
            return "CPU WIN";
        }
    }

    return "Continue";
}

export default FirstLoop;

// Old code.

        //if (i == 0) {

        //    let index = 0;
        //    let isDiagonal = 0
        //    while (index < CPU.length) {
        //        if (CPU[index][index] == "X") {
        //            isDiagonal += 1;
        //        }

        //        index += 1;
        //    }

        //    if (isDiagonal == CPU.length) {
        //        return "END";
        //    }

        //    if (CPU[i][i] == "X" && CPU[i + 1][i + 1] == "X" && CPU[i + 2][i + 2] == "X") {
        //        return "END";
        //    }

        //    if (CPU[i][i] == "Y" && CPU[i + 1][i + 1] == "Y" && CPU[i + 2][i + 2] == "Y") {
        //        return "CPU WIN";
        //    }
        //} else if (i == CPU.length - 1) {
        //    if (CPU[i][0] == "X" && CPU[i - 1][1] == "X" && CPU[i - 2][2] == "X") {
        //        return "END";
        //    }

        //    if (CPU[i][0] == "Y" && CPU[i - 1][1] == "Y" && CPU[i - 2][2] == "Y") {
        //        return "CPU WIN";
        //    }
        //}
