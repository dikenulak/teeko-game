import { numOfColumns, numOfRows } from './constants';

let rowIndx = 0;
let columnIndx = 0;

const checkWinner = (grid, player) => {
	// horizontalCheck
	for (columnIndx = 0; columnIndx < numOfColumns - 3; columnIndx++) {
		for (rowIndx = 0; rowIndx < numOfRows; rowIndx++) {
			if (
				grid[rowIndx][columnIndx] === player &&
				grid[rowIndx][columnIndx + 1] === player &&
				grid[rowIndx][columnIndx + 2] === player &&
				grid[rowIndx][columnIndx + 3] === player
			) {
				return true;
			}
		}
	}

	// verticalCheck
	for (rowIndx = 0; rowIndx < numOfRows - 3; rowIndx++) {
		for (columnIndx = 0; columnIndx < numOfColumns; columnIndx++) {
			if (
				grid[rowIndx][columnIndx] === player &&
				grid[rowIndx + 1][columnIndx] === player &&
				grid[rowIndx + 2][columnIndx] === player &&
				grid[rowIndx + 3][columnIndx] === player
			) {
				return true;
			}
		}
	}

	// ascendingDiagonalCheck
	for (rowIndx = 3; rowIndx < numOfRows; rowIndx++) {
		for (columnIndx = 0; columnIndx < numOfColumns - 3; columnIndx++) {
			if (
				grid[rowIndx][columnIndx] === player &&
				grid[rowIndx - 1][columnIndx + 1] === player &&
				grid[rowIndx - 2][columnIndx + 2] === player &&
				grid[rowIndx - 3][columnIndx + 3] === player
			) {
				return true;
			}
		}
	}

	// descendingDiagonalCheck
	for (rowIndx = 3; rowIndx < numOfRows; rowIndx++) {
		for (columnIndx = 3; columnIndx < numOfColumns; columnIndx++) {
			if (
				grid[rowIndx][columnIndx] === player &&
				grid[rowIndx - 1][columnIndx - 1] === player &&
				grid[rowIndx - 2][columnIndx - 2] === player &&
				grid[rowIndx - 3][columnIndx - 3] === player
			) {
				return true;
			}
		}
	}

	return false;
};

export { checkWinner };
