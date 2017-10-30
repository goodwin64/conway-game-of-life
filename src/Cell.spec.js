import Cell from './Cell';

describe('Cell', () => {
	describe('constructor', () => {
		test('should create alive Cell from truthy primitive', () => {
			expect(
				new Cell(true).isAlive
			).toEqual(
				true
			);
		});

		test('should create alive Cell from alive Cell', () => {
			const aliveCell = new Cell(true);

			expect(
				new Cell(aliveCell).isAlive
			).toEqual(
				true
			);
		});

		test('should create dead Cell from falsy primitive', () => {
			expect(
				new Cell(false).isAlive
			).toEqual(
				false
			);
		});

		test('should create dead Cell from alive Cell', () => {
			const deadCell = new Cell(false);

			expect(
				new Cell(deadCell).isAlive
			).toEqual(
				false
			);
		});

	});

	describe('getNextLifeStatus()', () => {
		test('Die if alive and l.t. 2 neighbours', () => {
			expect(
				Cell.getNextLifeStatus(new Cell(true), 0)
			).toEqual(
				false
			);

			expect(
				Cell.getNextLifeStatus(new Cell(true), 1)
			).toEqual(
				false
			);
		});

		test('Die if alive and g.t. 3 neighbours', () => {
			expect(
				Cell.getNextLifeStatus(new Cell(true), 4)
			).toEqual(
				false
			);
		});

		test('Stay alive if 2 neighbours', () => {
			expect(
				Cell.getNextLifeStatus(new Cell(true), 2)
			).toEqual(
				true
			);
		});

		test('Stay alive if 3 neighbours', () => {
			expect(
				Cell.getNextLifeStatus(new Cell(true), 3)
			).toEqual(
				true
			);
		});

		test('Stay dead if any number of neighbours except 3', () => {
			expect(
				Cell.getNextLifeStatus(new Cell(false), 0)
			).toEqual(
				false
			);

			expect(
				Cell.getNextLifeStatus(new Cell(false), 1)
			).toEqual(
				false
			);

			expect(
				Cell.getNextLifeStatus(new Cell(false), 2)
			).toEqual(
				false
			);

			expect(
				Cell.getNextLifeStatus(new Cell(false), 4)
			).toEqual(
				false
			);
		});

		test('Back to life from death when 3 neighbours', () => {
			expect(
				Cell.getNextLifeStatus(new Cell(false), 3)
			).toEqual(
				true
			);
		});
	});
});
