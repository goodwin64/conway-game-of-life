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

			test('medium field, no neighbours, in center', () => {
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

			test('medium field, no neighbours, near the edge', () => {
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

			test('large field, no neighbours for each alive cell', () => {
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

			test('small field, 1 neighbour', () => {
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

		});
	});

	describe('countNeighbours() method', () => {
		test('field 1x1', () => {
			const fieldBefore = [
				[1]
			];

			expect(
				Gamepad.countNeighbours(fieldBefore, 0, 0)
			).toEqual(0);
		});

		test('field 2x2, alone', () => {
			const fieldBefore = [
				[1, 0],
				[0, 0],
			];

			expect(
				Gamepad.countNeighbours(fieldBefore, 0, 0)
			).toEqual(0);
		});

		test('field 2x2, with 1 neighbour', () => {
			const fieldBefore = [
				[1, 0],
				[0, 1],
			];

			expect(
				Gamepad.countNeighbours(fieldBefore, 0, 0)
			).toEqual(1);
		});

		test('field 2x2, all alive', () => {
			const fieldBefore = [
				[1, 1],
				[1, 1],
			];

			expect(
				Gamepad.countNeighbours(fieldBefore, 0, 0)
			).toEqual(3);
		});

		test('field 2x2, beyond the edge', () => {
			const fieldBefore = [
				[1, 1],
				[1, 1],
			];

			expect(
				Gamepad.countNeighbours(fieldBefore, 0, 0)
			).toEqual(3);
		});

	});
});
