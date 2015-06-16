var HanoiTowerView = function() {
	this.initialize();
}

HanoiTowerView.EventContext = function(instance, param) {
	this.instance = instance;
	this.param = param;
}

HanoiTowerView.prototype.initialize = function() {
	this.discs = 4;
	this.containerId = 'hanoiTower';
	this.containerElement = document.getElementById(this.containerId);
	this.hanoiTower = new HanoiTower(this.discs);

	this.renderAllPins();
	this.renderCounter();
}

HanoiTowerView.prototype.renderAllPins = function() {
	this.pins = new Array();
	this.containerElement.innerHTML = '';

	this.renderPin(1);
	this.renderPin(2);
	this.renderPin(3);
}

HanoiTowerView.prototype.renderPin = function(pin) {
	var discs = this.hanoiTower.getPin(pin);
	var pinElement = this.createPinElement(pin);

	if (discs.length) {	
		for (var i = 0; i < this.discs; i++) {
			var discLayerElement = this.createDiscLayerElement(pinElement, !discs[i]);
			if (discs[i]) {
				this.createDiscElement(discLayerElement, discs[i]);
			}
		}	
	}

	this.containerElement.appendChild(pinElement);
}

HanoiTowerView.prototype.createDiscLayerElement = function(pinElement, insertBefore) {
	var layer = document.createElement('div');
	layer.setAttribute('class', 'discLayer');
	pinElement.insertBefore(layer, insertBefore ? pinElement.childNodes[0] : undefined);

	return layer;
}

HanoiTowerView.prototype.createDiscElement = function(discLayerElement, disc) {
	var divDisc = document.createElement('div');
	var span = document.createElement('span');
	span.textContent = disc;
	divDisc.setAttribute('class', 'disc size' + disc);
	divDisc.appendChild(span);
	discLayerElement.appendChild(divDisc);
}

HanoiTowerView.prototype.createPinElement = function(pin) {
	var pinElement = document.createElement('div');
	this.pins.push(pinElement);
	pinElement.setAttribute('class', 'pin');
	this.bindClickPinElement(pinElement, pin);

	return pinElement;
}

HanoiTowerView.prototype.bindClickPinElement = function(pinElement, pin) {
	var pinClick = this.pinClick;
	var eventContext = new HanoiTowerView.EventContext(this, pin);
	pinElement.addEventListener('click', function() { pinClick(eventContext, event); });
}

HanoiTowerView.prototype.pinClick = function(eventContext, event) {
	if (!eventContext.instance.selectedPin) {
		eventContext.instance.selectPin(eventContext.param);
	}
	else if (eventContext.instance.selectedPin == eventContext.param) {
		eventContext.instance.unselectPin();
	}
	else{
		eventContext.instance.moveDisc(eventContext.instance.selectedPin, eventContext.param);
	}
}

HanoiTowerView.prototype.selectPin = function(pin) {
	this.selectedPin = pin;
	this.highlightPin(pin);
}

HanoiTowerView.prototype.unselectPin = function() {
	this.selectedPin = undefined;
	this.renderAllPins();
}

HanoiTowerView.prototype.moveDisc = function(origin, destination) {
	try {
		this.hanoiTower.move(origin, destination);
		this.renderCounter();
		this.unselectPin();
	}
	catch (e) {
		alert(e.message);
	}
}

HanoiTowerView.prototype.renderCounter = function() {
	document.getElementById('hanoiCounter').textContent = this.hanoiTower.counter + 
		' movimento(s), minimo: ' + this.hanoiTower.perfectSolving;
}

HanoiTowerView.prototype.highlightPin = function(pin) {
	this.pins[pin - 1].style.backgroundColor = 'rgba(192, 192, 192, 0.6)';
}

var view = new HanoiTowerView();