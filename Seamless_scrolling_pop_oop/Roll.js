function Roll(id, speed) {
    var _this = this;
    this.oRollimg = document.getElementById(id);
    this.oUl = this.oRollimg.getElementsByTagName('ul')[0];
    this.aLi = this.oUl.getElementsByTagName('li');
    this.oPrev = document.getElementById('prev')?document.getElementById('prev'):'';
    this.oNext = document.getElementById('next')?document.getElementById('next'):'';
    this.speed = speed;

    this.oUl.innerHTML += this.oUl.innerHTML;
    this.oUl.style.width = this.aLi[0].offsetWidth*this.aLi.length+'px';
    
    this.oRollimg.timer = setInterval(function () {_this.move();}, 30);
    this.oRollimg.onmouseover = function () {_this.fnOver();};
    this.oRollimg.onmouseout = function () {_this.fnOut();};
    this.oPrev.onclick = function () {_this.fnPrevClick(speed);};
    this.oNext.onclick = function () {_this.fnNextClick(speed);};
};
Roll.prototype.fnNextClick = function (speed) {this.speed = speed;};
Roll.prototype.fnPrevClick = function (speed) {this.speed = -speed;};
Roll.prototype.fnOver = function () {clearInterval(this.oRollimg.timer);};
Roll.prototype.fnOut = function () {
    var _this = this;
    this.oRollimg.timer = setInterval(function () {_this.move();}, 30);
};
Roll.prototype.move = function () {
    if (this.oUl.offsetLeft < -this.aLi[0].offsetWidth*this.aLi.length/2) {
        this.oUl.style.left = '0';
    }
    if (this.oUl.offsetLeft > 0) {
        this.oUl.style.left = -this.oUl.offsetWidth/2+'px';
    }
    this.oUl.style.left = this.oUl.offsetLeft+this.speed+'px';
}