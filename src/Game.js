export default class Game {
	constructor({ gamepad, dayDurationMs }) {
		this.gamepad = gamepad;
		this.dayDurationMs = dayDurationMs;
	}

	start() {
		this.gamepad.render(this.gamepad.field);
		setTimeout(() => {
			this.nextTick();
		}, this.dayDurationMs);
	}

	nextTick() {
		setInterval(() => {
			this.gamepad.nextTick();
		}, this.dayDurationMs);
	}
}
