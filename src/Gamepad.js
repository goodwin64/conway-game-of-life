import Cell from './Cell';

/**
 * Middle layer between Model (matrix) and View (DOM)
 */
export default class Gamepad {
	constructor({
		gamepadElem,
		gamepadSize,
		cellsMatrix,
	}) {
		this.gamepadElem = gamepadElem;
		this.field = cellsMatrix
			// ? this.cellsMatrixToGamepadField(cellsMatrix)
			? cellsMatrix
			: new Array(gamepadSize);
	}

	/**
	 * Returns how many neighbours are alive
	 */
	static countNeighbours(field, rowIndex, cellIndex) {
		let result = 0;
		for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
			// TODO optimize: if beyond the edge - ignore loop iteration
			for (let j = cellIndex - 1; j <= cellIndex + 1; j++) {
				const isMyCellNow = i === rowIndex && j === cellIndex;
				if (isMyCellNow) {
					continue;
				}

				const currRow = field[i];
				const currNeighbour = currRow && currRow[j];
				// if (currNeighbour instanceof Cell && currNeighbour.isAlive) {
				if (Number.isInteger(currNeighbour) && currNeighbour) {
					result++;
				}
			}
		}
		return result;
	}

	/**
	 * Returns the field which will be on the next tick
	 */
	static getNextDayField(field) {
		return field.map((row, rowIndex) => {
			return row.map((cell, cellIndex) => {
				const neighboursCount = this.countNeighbours(rowIndex, cellIndex);
				const nextLifeStatus = Cell.getNextLifeStatus(cell, neighboursCount);
				return new Cell(nextLifeStatus);
			});
		});
	}

	/**
	 * Returns the "1/0" matrix instead of "Cells" matrix
	 */
	static toPrimitivesView(field) {
		return field.map(row => {
			return row.map(cell => {
				return Number(cell.isAlive);
			});
		});
	}

	clearField() {
		this.gamepadElem.innerHTML = '';
	}

	/**
	 * Model -> View formatter
	 */
	cellsMatrixToHtmlFragment(cellsMatrix) {
		const fragment = document.createDocumentFragment();

		cellsMatrix.forEach(row => {
			const rowElem = document.createElement('div');
			rowElem.classList.add('row');

			row.forEach(cell => {
				const cellElem = document.createElement('div');
				cellElem.classList.add('cell');
				// if (cell.isAlive) {
				if (cell) {
					cellElem.classList.add('is-alive');
				}
				rowElem.appendChild(cellElem);
			});

			fragment.appendChild(rowElem);
		});

		return fragment;
	}

	/**
	 * Update Model
	 */
	recalculateNextDayField(nextDayField) {
		this.field = nextDayField;
	}

	/**
	 * Update View
	 */
	render(nextDayField) {
		const newGamepadField = this.cellsMatrixToHtmlFragment(nextDayField);
		this.clearField();
		this.gamepadElem.appendChild(newGamepadField);
	}

	/**
	 * Parser from simple structure:
	 * [                [
	 *  [1, 0]           [aliveCellObject, deadCellObject],
	 *  [0, 1]   --->    [deadCellObject, aliveCellObject]
	 * ]                ]
	 */
	cellsMatrixToGamepadField(cellsMatrix) {
		return cellsMatrix.map(row => row.map(cellLikeShape => new Cell(cellLikeShape)));
	}

	/**
	 * API: runs next tick
	 */
	nextTick() {
		const nextDayField = this.getNextDayField();
		this.recalculateNextDayField(nextDayField);
		this.render(nextDayField);
	}
}