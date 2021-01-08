
const ResetMatrix = (matrix, startField) => {
    LoopingForReset(matrix, startField);
    return matrix;
}

const LoopingForReset = (matrix, startField) => {
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix.length; j++) {
            matrix[i][j] = startField;
        }
    }
}

export default ResetMatrix;