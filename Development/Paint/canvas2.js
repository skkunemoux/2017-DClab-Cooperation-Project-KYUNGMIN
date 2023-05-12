var pos2 = {
	drawable: false,
	x:-1,
	y:-1
};
var canvas2, ctx2;

window.onload=function(){
	canvas2=document.getElementById("canvas2");
	ctx2 = canvas2.getContext("2d");

	canvas2.addEventListener("mousedown",listener);
	canvas2.addEventListener("mousemove",listener);
	canvas2.addEventListener("mouseup",listener);
	canvas2.addEventListener("mouseout",listener);
}

function listener(event){
	switch(event.type){
		case "mousedown":
			initDraw(event);
			break;

		case "mousemove":
			if(pos2.drawable)
				draw(event);
			break;
		case "mouseout":
		case "mouseup":
			finishDraw();
			break;
	}
}

function initDraw(event){
	ctx2.beginPath();
	pos2.drawable = true;
	var coors = getPosition(event);
	pos2.X=coors.X;
	pos2.Y=coors.Y;
	ctx2.moveTo(pos2.X,pos2.Y);
}
function draw(event){
	var coors=getPosition(event);
	ctx2.lineTo(coors.X,coors.Y);
	pos2.X=coors.X;
	pos2.Y=coors.Y;
	ctx2.stroke();
}
function finishDraw(){
	pos2.drawable=false;
	pos2.X=-1;
	pos2.Y=-1;
}
function getPosition(event){
	var x=event.pageX - canvas2.offsetLeft;
	var y=event.pageY - canvas2.offsetTop;
	return {X: x, Y: y};
}

function send2(jscolor) {
    // 'jscolor' instance can be used as a string
    console.log(jscolor);
    ctx2.strokeStyle='#' + jscolor;

}