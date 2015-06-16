var HanoiTower = function(discs) {
	this.discs = discs;
	this.pins = [[], [], []];
	this.initialize();
	this.counter = 0;
	this.perfectSolving = Math.pow(2, this.discs) - 1;
	console.log(this.perfectSolving);
};

HanoiTower.HanoiTowerException = function(message) {
	this.name = 'HanoiTowerException';
	this.message = message;
	this.htmlMessage = message;
	this.level = "Show Stopper";
	this.toString = function() { return this.name + ': ' + this.message; };
}

HanoiTower.exceptions = {
	insufficientDiscs: new HanoiTower.HanoiTowerException('So eh possivel criar torres com pelo dois discos.'),
	emptyOriginPin: new HanoiTower.HanoiTowerException('Nao existem discos para serem movidos a partir do pino de origem.'),
	largerPinOverSmallerPin: new HanoiTower.HanoiTowerException('Nao eh possivel colocar um disco maior sobre um menor.'),
	invalidPin: new HanoiTower.HanoiTowerException('Nao eh possivel realizar o movimento pois pelo menos um dos pinos nao existe.') 
}

HanoiTower.prototype.throwException = function(exception) {
	throw exception;
}

HanoiTower.prototype.initialize = function() {
	(this.discs >= 2) || this.throwException(HanoiTower.exceptions.insufficientDiscs);

	for (var i = 1; i <= this.discs; i++) {
		this.pins[0].push(i);
	};
}

HanoiTower.prototype.getTopDisc = function(pin) {
	return this.pins[pin-1][0];
}

HanoiTower.prototype.getPin = function(pin) {
	return this.pins[pin-1];
}

HanoiTower.prototype.move = function(origin, destination) {
	(origin >= 1 && destination >= 1 && origin <= 3 && destination <= 3) || this.throwException(HanoiTower.exceptions.invalidPin);
	(this.getTopDisc(origin)) || this.throwException(HanoiTower.exceptions.emptyOriginPin);
	(!this.getPin(destination).length || this.getTopDisc(origin) <= this.getTopDisc(destination)) || this.throwException(HanoiTower.exceptions.largerPinOverSmallerPin);

	this.getPin(destination).unshift(this.getPin(origin).shift());
	this.counter += 1;
}