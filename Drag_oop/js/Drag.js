function Drag(id) {
	var _this = this;
	this.disX = 0;
	this.disY = 0;
	this.oDrag = document.getElementById(id);
	this.oDrag.onmousedown = function (ev) {
		_this.fnDown(ev);
		return false;
	};
}
Drag.prototype.fnDown = function (ev) {
	var oEvent = ev || event;
	var _this = this;
	this.disX = oEvent.clientX - this.oDrag.offsetLeft;
	this.disY = oEvent.clientY - this.oDrag.offsetTop;
	if (_this.oDrag.setCapture) {
		_this.oDrag.onmousemove = function (ev) {_this.fnMove(ev);}
		_this.oDrag.onmouseup = function () {_this.fnUp(this);};
		_this.oDrag.setCapture();
	} else {
		document.onmousemove = function (ev) {_this.fnMove(ev);}
		document.onmouseup = function () {_this.fnUp(this);};
	}
};
Drag.prototype.fnMove = function (ev) {
	var oEvent = ev || event;
	this.oDrag.style.left = oEvent.clientX - this.disX+'px';
	this.oDrag.style.top = oEvent.clientY - this.disY+'px';
};
Drag.prototype.fnUp = function (obj) {
	obj.onmousemove = null;
	obj.onmouseup = null;
	if (this.oDrag.releaseCapture) {this.oDrag.releaseCapture();}
};