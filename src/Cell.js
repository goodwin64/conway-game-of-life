export default class Cell {
	constructor(anyLifeStatusShape, htmlElem) {
		const isAlive = anyLifeStatusShape instanceof Cell
			? anyLifeStatusShape.isAlive
			: Boolean(anyLifeStatusShape);
		this.isAlive = isAlive;
		this.cellElem = this.getCellElem(isAlive, htmlElem);
	}

	static getNextLifeStatus(cell, neighboursCount) {
		if (cell.isAlive) {
			if (neighboursCount === 2 || neighboursCount === 3) {
				return true;
			}
		} else {
			if (neighboursCount === 3) {
				return true;
			}
		}
		return false;
	}

	updateCellElem() {
		if (this.isAlive) {
			this.cellElem.classList.add('is-alive');
		} else {
			this.cellElem.classList.remove('is-alive');
		}
	}

	createCellElem(isAlive) {
		const cellElem = document.createElement('div');
		cellElem.classList.add('cell');
		if (isAlive) {
			cellElem.classList.add('is-alive');
		}
		cellElem.addEventListener('click', () => {
			this.isAlive = !this.isAlive;
			this.updateCellElem();
		});
		return cellElem;
	}

	getCellElem(isAlive, htmlElem) {
		if (htmlElem) {
			// FIXME: rewrite logic, remove side-effect in get-* method
			if (isAlive) {
				// htmlElem.classList.add('is-alive');
			} else {
				// htmlElem.classList.remove('is-alive');
			}
			return htmlElem;
		} else {
			return this.createCellElem(isAlive);
		}
	}
}
