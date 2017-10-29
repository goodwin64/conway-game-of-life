export default class Game {
	constructor({ gamepad, dayDurationMs }) {
		this.gamepad = gamepad;
		this.dayDurationMs = dayDurationMs;
	}

	start() {
		this.gamepad.initialRender();
		this.nextTick();
	}

	nextTick() {
		setInterval(() => {
			this.gamepad.nextTick();
		}, this.dayDurationMs);
	}
}
