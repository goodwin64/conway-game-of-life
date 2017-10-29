import Gamepad from './Gamepad';
import Cell from "./Cell";

describe('Gamepad', () => {
	describe('getNextDayField() method', () => {
		describe('Die from exposure (underpopulation)', () => {
			test('field 1x1 (primitives)', () => {
				const fieldBefore = [
					[1]
				];
				const fieldAfter = [
					[0]
				];

				expect(
					Gamepad.getNextDayField(fieldBefore)
				).toEqual(
					Gamepad.primitivesToCells(fieldAfter)
				);
			});
			test.skip('field 1x1 (Cells)', () => { // TODO: fix
				const fieldBefore = Gamepad.primitivesToCells([
					[1]
				]);
				const fieldAfter = Gamepad.primitivesToCells([
					[0]
				]);

				expect(
					Gamepad.getNextDayField(fieldBefore)
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
					Gamepad.cellsToPrimitives(Gamepad.getNextDayField(fieldBefore))
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
					Gamepad.cellsToPrimitives(Gamepad.getNextDayField(fieldBefore))
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
					Gamepad.cellsToPrimitives(Gamepad.getNextDayField(fieldBefore))
				).toEqual(
					fieldAfter
				);
			});

			test('small field, 1 neighbour -> all dead (primitives)', () => {
				const fieldBefore = [
					[1, 0],
					[0, 1],
				];
				const fieldAfter = [
					[0, 0],
					[0, 0],
				];

				expect(
					Gamepad.cellsToPrimitives(Gamepad.getNextDayField(fieldBefore))
				).toEqual(
					fieldAfter
				);
			});
			test.skip('small field, 1 neighbour -> all dead (Cells)', () => { // TODO: fix
				const fieldBefore = Gamepad.primitivesToCells([
					[1, 0],
					[0, 1],
				]);
				const fieldAfter = Gamepad.primitivesToCells([
					[0, 0],
					[0, 0],
				]);

				expect(
					Gamepad.getNextDayField(fieldBefore)
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
					Gamepad.cellsToPrimitives(Gamepad.getNextDayField(fieldBefore))
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
					Gamepad.cellsToPrimitives(Gamepad.getNextDayField(fieldBefore))
				).toEqual(
					fieldAfter
				);
			});

			test.skip('central cell: exactly 2 neighbours, plain row', () => { // TODO: fix
				const fieldBefore = [
					[1, 1, 1],
				];
				const fieldAfter = [
					[0, 1, 0],
				];

				expect(
					Gamepad.getNextDayField(fieldBefore)
				).toEqual(
					Gamepad.primitivesToCells(fieldAfter)
				);
			});

			test.skip('central cell: exactly 2 neighbours, matrix', () => { // TODO: fix
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
					Gamepad.getNextDayField(fieldBefore)
				).toEqual(
					Gamepad.primitivesToCells(fieldAfter)
				);
			});

			test.skip('central cell: exactly 3 neighbours', () => { // TODO: fix
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
					Gamepad.cellsToPrimitives(Gamepad.getNextDayField(fieldBefore))
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
					Gamepad.cellsToPrimitives(Gamepad.getNextDayField(fieldBefore))
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

	describe('cellsToPrimitives() method', () => {
		test('should parse Cells to primitives (1/0)', () => {
			const fieldFromCells = [
				[new Cell(1), new Cell(0)],
				[new Cell(0), new Cell(1)],
			];
			const fieldFromPrimitives = [
				[1, 0],
				[0, 1],
			];

			expect(
				Gamepad.cellsToPrimitives(fieldFromCells)
			).toEqual(
				fieldFromPrimitives
			);
		});

		test('primitivesToCells <-> cellsToPrimitives methods opposite', () => {
			const fieldFromCells = [
				[new Cell(1), new Cell(0)],
				[new Cell(0), new Cell(1)],
			];

			expect(
				Gamepad.primitivesToCells(Gamepad.cellsToPrimitives(fieldFromCells))
			).toEqual(
				fieldFromCells
			);
		});
	});

	describe('primitivesToCells() method', () => {
		test('should parse primitives (1/0) to Cells', () => {
			const fieldFromPrimitives = [
				[1, 0],
				[0, 1],
			];
			const fieldFromCells = [
				[new Cell(1), new Cell(0)],
				[new Cell(0), new Cell(1)],
			];

			expect(
				Gamepad.primitivesToCells(fieldFromPrimitives)
			).toEqual(
				fieldFromCells
			);
		});

		test('primitivesToCells <-> cellsToPrimitives methods opposite', () => {
			const fieldFromPrimitives = [
				[1, 0],
				[0, 1],
			];

			expect(
				Gamepad.cellsToPrimitives(Gamepad.primitivesToCells(fieldFromPrimitives))
			).toEqual(
				fieldFromPrimitives
			);
		});
	});

});
