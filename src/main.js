import Game from './Game';
import Gamepad from './Gamepad';

const initialField = [
	[1, 1, 1],
	[0, 1, 0],
	[0, 0, 1],
];

const gamepad = new Gamepad({
	gamepadElem: document.getElementById('gamepad'),
	gamepadSize: 10,
	cellsMatrix: initialField,
});

const game = new Game({
	gamepad,
	dayDurationMs: 1000,
});
game.start();
