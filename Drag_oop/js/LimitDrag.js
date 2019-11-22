function LimitDrag(id) {
	Drag.call(this, id); // 继承Drag
}
for(var i in Drag.prototype) {
	LimitDrag.prototype[i] = Drag.prototype[i];
}

LimitDrag.prototype.fnMove = function (ev) {
	var oEvent = ev || event;
	var l = oEvent.clientX - this.disX;
	var t = oEvent.clientY - this.disY;
	var iClientHeight = document.documentElement.clientHeight-this.oDrag.offsetHeight;
	var iClientWidth = document.documentElement.clientWidth-this.oDrag.offsetWidth;
	if (l < 10) {l = 0;}
	if (t < 10) {t = 0;}
	if (l > iClientWidth-10) {
		l = iClientWidth;
	}
	if (t > iClientHeight-10) {
		t = iClientHeight;
	}
	this.oDrag.style.left = l+'px';
	this.oDrag.style.top = t+'px';
}