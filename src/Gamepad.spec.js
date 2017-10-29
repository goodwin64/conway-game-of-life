import Gamepad from './Gamepad';

describe('Gamepad', () => {
	describe('getNextDayField() method', () => {
		describe('Die from exposure (underpopulation)', () => {
			test('field 1x1', () => {
				const fieldBefore = [
					[1]
				];
				const fieldAfter = [
					[0]
				];

				expect(
					Gamepad.toPrimitivesView(Gamepad.getNextDayField(fieldBefore))
				).toEqual(
					fieldAfter
				);
			});

			test('medium field, all alone -> all dead (in center)', () => {
				const fieldBefore = [
					[0, 0, 0],
					[0, 1, 0],
					[0, 0, 0],
				];
				const fieldAfter = [
					[0, 0, 0],
					[0, 0, 0],
					[0, 0, 0],
				];

				expect(
					Gamepad.toPrimitivesView(Gamepad.getNextDayField(fieldBefore))
				).toEqual(
					fieldAfter
				);
			});

			test('medium field, all alone -> all dead (near the edge)', () => {
				const fieldBefore = [
					[0, 0, 1],
					[0, 0, 0],
					[0, 0, 0],
				];
				const fieldAfter = [
					[0, 0, 0],
					[0, 0, 0],
					[0, 0, 0],
				];

				expect(
					Gamepad.toPrimitivesView(Gamepad.getNextDayField(fieldBefore))
				).toEqual(
					fieldAfter
				);
			});

			test('large field, all alone -> all dead', () => {
				const fieldBefore = [
					[1, 0, 1, 0, 1, 0, 1],
					[0, 0, 0, 0, 0, 0, 0],
					[1, 0, 1, 0, 1, 0, 1],
					[0, 0, 0, 0, 0, 0, 0],
					[1, 0, 1, 0, 1, 0, 1],
					[0, 0, 0, 0, 0, 0, 0],
					[1, 0, 1, 0, 1, 0, 1],

				];
				const fieldAfter = [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
				];

				expect(
					Gamepad.toPrimitivesView(Gamepad.getNextDayField(fieldBefore))
				).toEqual(
					fieldAfter
				);
			});

			test('small field, 1 neighbour -> all dead', () => {
				const fieldBefore = [
					[1, 0],
					[0, 1],
				];
				const fieldAfter = [
					[0, 0],
					[0, 0],
				];

				expect(
					Gamepad.toPrimitivesView(Gamepad.getNextDayField(fieldBefore))
				).toEqual(
					fieldAfter
				);
			});

			test('all dead -> without changes', () => {
				const fieldBefore = [
					[0, 0, 0],
					[0, 0, 0],
					[0, 0, 0],
				];
				const fieldAfter = [
					[0, 0, 0],
					[0, 0, 0],
					[0, 0, 0],
				];

				expect(
					Gamepad.toPrimitivesView(Gamepad.getNextDayField(fieldBefore))
				).toEqual(
					fieldAfter
				);
			});

		});

		describe('Die from overcrowding (overpopulation)', () => {

		});

		describe('Survive when 2..3 neighbours', () => {
			test('cells near edges will survive', () => {
				const fieldBefore = [
					[1, 1, 1],
					[1, 1, 1],
				];
				const fieldAfter = [
					[1, 0, 1],
					[1, 0, 1],
				];

				expect(
					Gamepad.toPrimitivesView(Gamepad.getNextDayField(fieldBefore))
				).toEqual(
					fieldAfter
				);
			});

			test('central cell: exactly 2 neighbours, plain row', () => {
				const fieldBefore = [
					[1, 1, 1],
				];
				const fieldAfter = [
					[0, 1, 0],
				];

				expect(
					Gamepad.toPrimitivesView(Gamepad.getNextDayField(fieldBefore))
				).toEqual(
					fieldAfter
				);
			});

			test('central cell: exactly 2 neighbours, matrix', () => {
				const fieldBefore = [
					[0, 0, 1],
					[0, 1, 0],
					[1, 0, 0],
				];
				const fieldAfter = [
					[0, 0, 0],
					[0, 1, 0],
					[0, 0, 0],
				];

				expect(
					Gamepad.toPrimitivesView(Gamepad.getNextDayField(fieldBefore))
				).toEqual(
					fieldAfter
				);
			});

			test('central cell: exactly 3 neighbours', () => {
				const fieldBefore = [
					[1, 1, 0],
					[0, 1, 0],
					[1, 0, 0],
				];
				const fieldAfter = [
					[1, 1, 0],
					[0, 1, 0],
					[0, 0, 0],
				];

				expect(
					Gamepad.toPrimitivesView(Gamepad.getNextDayField(fieldBefore))
				).toEqual(
					fieldAfter
				);
			});
		});

		describe('Come to life from death', () => {
			test('central cell will come to life', () => {
				const fieldBefore = [
					[0, 1, 1],
					[0, 0, 0],
					[1, 0, 0],
				];
				const fieldAfter = [
					[0, 0, 0],
					[0, 1, 0],
					[0, 0, 0],
				];

				expect(
					Gamepad.toPrimitivesView(Gamepad.getNextDayField(fieldBefore))
				).toEqual(
					fieldAfter
				);
			});

		});
	});

	describe('countNeighbours() method', () => {
		test('field 1x1', () => {
			const field = [
				[1]
			];

			expect(
				Gamepad.countNeighbours(field, 0, 0)
			).toEqual(0);
		});

		test('field 2x2, alone', () => {
			const field = [
				[1, 0],
				[0, 0],
			];

			expect(
				Gamepad.countNeighbours(field, 0, 0)
			).toEqual(0);
		});

		test('field 2x2, with 1 neighbour', () => {
			const field = [
				[1, 0],
				[0, 1],
			];

			expect(
				Gamepad.countNeighbours(field, 0, 0)
			).toEqual(1);
		});

		test('field 2x2, all alive', () => {
			const field = [
				[1, 1],
				[1, 1],
			];

			expect(
				Gamepad.countNeighbours(field, 0, 0)
			).toEqual(3);

			expect(
				Gamepad.countNeighbours(field, 0, 1)
			).toEqual(3);

			expect(
				Gamepad.countNeighbours(field, 1, 1)
			).toEqual(3);
		});

		test('field 2x2, beyond the edge', () => {
			const field = [
				[1, 1],
				[1, 1],
			];

			expect(
				Gamepad.countNeighbours(field, -10, -10)
			).toEqual(0);

			expect(
				Gamepad.countNeighbours(field, 0, -1)
			).toEqual(2);
		});

		test('field 3x3, all alive', () => {
			const field = [
				[1, 1, 1],
				[1, 1, 1],
				[1, 1, 1],
			];

			expect(
				Gamepad.countNeighbours(field, 0, 0)
			).toEqual(3);

			expect(
				Gamepad.countNeighbours(field, 1, 1)
			).toEqual(8);

			expect(
				Gamepad.countNeighbours(field, 1, 0)
			).toEqual(5);
		});

		test('field 3x3, all dead', () => {
			const field = [
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0],
			];

			expect(
				Gamepad.countNeighbours(field, 0, 0)
			).toEqual(0);

			expect(
				Gamepad.countNeighbours(field, 0, 1)
			).toEqual(0);

			expect(
				Gamepad.countNeighbours(field, 1, 1)
			).toEqual(0);

			expect(
				Gamepad.countNeighbours(field, 2, 0)
			).toEqual(0);
		});

	});
});
