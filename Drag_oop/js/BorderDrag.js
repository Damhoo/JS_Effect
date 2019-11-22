function BorderDrag(id) {
    this.oBox = null;
    Drag.call(this, id); // 继承Drag
}
for(var i in Drag.prototype) {
    BorderDrag.prototype[i] = Drag.prototype[i];
}

BorderDrag.prototype.fnDown = function (ev) {
    var oEvent = ev || event;
    var _this = this;
    this.disX = oEvent.clientX - this.oDrag.offsetLeft;
    this.disY = oEvent.clientY - this.oDrag.offsetTop;
    this.oBox = document.createElement('div');
    this.oBox.className = 'box';

    this.oBox.style.width = this.oDrag.offsetWidth-4+'px';
    this.oBox.style.height = this.oDrag.offsetHeight-4+'px';

    this.oBox.style.left = this.oDrag.offsetLeft+'px';
    this.oBox.style.top = this.oDrag.offsetTop+'px';
    document.body.appendChild(this.oBox);

    if (_this.oDrag.setCapture) {
        _this.oDrag.onmousemove = function (ev) {_this.fnMove(ev);}
        _this.oDrag.onmouseup = function () {_this.fnUp(this);};
        _this.oDrag.setCapture();
    } else {
        document.onmousemove = function (ev) {_this.fnMove(ev);}
        document.onmouseup = function () {_this.fnUp(this);};
    }
};

BorderDrag.prototype.fnMove = function (ev) {
    var oEvent = ev || event;
    var l = oEvent.clientX - this.disX;
    var t = oEvent.clientY - this.disY;
    var iClientHeight = document.documentElement.clientHeight-this.oBox.offsetHeight;
    var iClientWidth = document.documentElement.clientWidth-this.oBox.offsetWidth;

    if (l < 10) {l = 0;}
    if (t < 10) {t = 0;}
    if (l > iClientWidth-10) {
        l = iClientWidth;
    }
    if (t > iClientHeight-10) {
        t = iClientHeight;
    }
    this.oBox.style.left = l+'px';
    this.oBox.style.top = t+'px';
}

BorderDrag.prototype.fnUp = function (obj) {
    obj.onmousemove = null;
    obj.onmouseup = null;
    if (this.oDrag.releaseCapture) {this.oDrag.releaseCapture();}
    this.oDrag.style.left = this.oBox.style.left;
    this.oDrag.style.top = this.oBox.style.top;
    document.body.removeChild(this.oBox);
};
