const CheckForEquals = (matrix) => {

    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix.length; j++) {
            if (matrix[i][j] == "X" || matrix[i][j] == "Y") {
                return false;
            }
        }
    }

    return true;
}

export default CheckForEquals;