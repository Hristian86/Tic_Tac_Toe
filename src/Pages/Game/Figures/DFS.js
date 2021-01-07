
const DFS = (row, col, symbol, matrix, visited) => {

    if (IsOutOfBounds(row, col) || visited[row, col] || matrix[row, col] != symbol) {
        return;
    }

    visited[row, col] = true;

    DFS(row - 1, col, symbol, matrix, visited); // up
    DFS(row - 1, col + 1, symbol, matrix, visited); // up right

    DFS(row + 1, col, symbol, matrix, visited); // down
    DFS(row + 1, col - 1, symbol, matrix, visited); // down left

    DFS(row, col - 1, symbol, matrix, visited); // left
    DFS(row - 1, col - 1, symbol, matrix, visited); // left up

    DFS(row, col + 1, symbol, matrix, visited); // right
    DFS(row + 1, col + 1, symbol, matrix, visited); // right down,
}

const IsOutOfBounds = (row, col, matrix) => {
    return row < 0 || row >= matrix.length || col < 0 || col >= matrix.legth;
}

export default DFS