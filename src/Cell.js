export default class Cell {
	constructor(anyLifeStatusShape) {
		this.isAlive = Boolean(anyLifeStatusShape);
	}

	static getNextLifeStatus(isAliveNow, neighboursCount) {
		if (isAliveNow) {
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
}
