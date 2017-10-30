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
			? Gamepad.primitivesToCells(cellsMatrix)
			: new Array(gamepadSize);
	}

	/**
	 * Returns how many neighbours are alive
	 * Works with both fields: "of Primitives" and "of Cells"
	 */
	static countNeighbours(field, rowIndex, cellIndex) {
		let result = 0;
		for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
			let isBeyondEdge = i < 0 || i >= field.length;
			if (isBeyondEdge) continue;

			for (let j = cellIndex - 1; j <= cellIndex + 1; j++) {
				const isMyCellNow = i === rowIndex && j === cellIndex;
				let isBeyondEdge = j < 0 || j >= field[0].length;
				if (isMyCellNow || isBeyondEdge) continue;

				const currNeighbour = new Cell(field[i][j]);
				if (currNeighbour.isAlive) {
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
				const neighboursCount = Gamepad.countNeighbours(field, rowIndex, cellIndex);
				const nextLifeStatus = Cell.getNextLifeStatus(cell, neighboursCount);
				return new Cell(nextLifeStatus, cell.cellElem);
			});
		});
	}

	/**
	 * Returns the "1/0" matrix instead of "Cells" matrix
	 */
	static cellsToPrimitives(field) {
		return field.map(row => {
			return row.map(cell => {
				return Number(cell.isAlive);
			});
		});
	}

	/**
	 * Parser from simple structure:
	 * [                [
	 *  [1, 0]           [aliveCellObject, deadCellObject],
	 *  [0, 1]   --->    [deadCellObject, aliveCellObject]
	 * ]                ]
	 */
	static primitivesToCells(field) {
		return field.map(row => row.map(cellLikeShape => new Cell(cellLikeShape)));
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
				if (cell.isAlive) {
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
	 * Renders the field first time: fill View from Model
	 */
	initialRender() {
		this.field.forEach(row => {
			const rowElem = document.createElement('div');
			rowElem.classList.add('row');

			row.forEach(cell => {
				rowElem.appendChild(cell.cellElem);
			});

			this.gamepadElem.appendChild(rowElem);
		});
	}

	/**
	 * Update existing View
	 */
	render() {
		const cells = [].concat.apply([], this.field);
		cells.forEach(cell => {
			cell.updateCellElem();
		});
	}

	/**
	 * API: runs next tick
	 */
	nextTick() {
		const nextDayField = Gamepad.getNextDayField(this.field);
		this.recalculateNextDayField(nextDayField);
		this.render();
	}
}