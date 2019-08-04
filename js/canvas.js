
////////////////////////////////////////////////////////////
//              FUNCIONES DE CANVAS
////////////////////////////////////////////////////////////


// Genera el canvas
function loadCanvas(id) {
    
    let canvas;
    let div = document.getElementById(id); 
    
    if (document.getElementById('CanvasLayer') === null)
    {
	    canvas = document.createElement('canvas');
        canvas.id = "CanvasLayer";
        canvas.setAttribute('class', 'canvasLayer');
	    div.appendChild(canvas);
    }
    else
       canvas = document.getElementById('CanvasLayer');
    
    canvas.width  = (estilo < 0 ) ? 1280 : posEstilos[estilo].back.h;
    canvas.height = (estilo < 0 ) ? 800 : posEstilos[estilo].back.w;
    canvas.style.zIndex   = 8;
    //canvas.style.border   = "1px solid";
    canvas.context = canvas.getContext("2d");
    
	return canvas;
}

function cleanCanvas() {
    let canvas1=document.getElementById('CanvasLayer');
    let ctx=canvas1.getContext("2d");
    //ctx.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx.clearRect(0, 0, myCanvasArea.width, myCanvasArea.height);

}



// Carga un componente en el canvas
function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }else {
	    //this.image = new Image();
        this.image = color;
	}
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myCanvasArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        }else if (type == "file") 
		{
			ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
		}
		else{
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };
}


/**
 * Draws a rounded rectangle using the current state of the canvas. 
 * If you omit the last three params, it will draw a rectangle 
 * outline with a 5 pixel border radius 
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate 
 * @param {Number} width The width of the rectangle 
 * @param {Number} height The height of the rectangle
 * @param {Number} radius The corner radius. Defaults to 5;
 * @param {Boolean} fill Whether to fill the rectangle. Defaults to false.
 * @param {Boolean} stroke Whether to stroke the rectangle. Defaults to true.
 */

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke == "undefined" ) {
      stroke = true;
    }
    if (typeof radius === "undefined") {
      radius = 5;
    }
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (stroke) {
      ctx.strokeStyle = '#00FF00';
      ctx.lineWidth = 10;
      ctx.stroke();
      
    }
    if (fill) {
      ctx.fill();
    }        
    ctx.clip();
  }
  
  
  function diaRect(ctx, x, y, width, height,  stroke, direction) {
    if (typeof stroke == "undefined" ) {
      stroke = true;
    }
    if (typeof stroke == "undefined" ) {
      direction = 1;
    }
    ctx.beginPath();
     
    if (direction == 1){
      desvio = width/2;
      ctx.moveTo(x, y);
      ctx.lineTo(x - desvio, y - height);
      ctx.lineTo(x - desvio + width, y - height);
      ctx.lineTo(x + width, y);
      ctx.lineTo(x, y);
     
    }else {
      console.log('dentro');
      desvio = width/2;
      ctx.moveTo(x, y);
      ctx.lineTo(x + desvio, y - height);
      ctx.lineTo(x + desvio + width, y - height);
      ctx.lineTo(x + width, y);
      ctx.lineTo(x, y);
     
    }
    
    ctx.closePath();
    if (stroke) {
      ctx.strokeStyle = '#00FF00';
      ctx.lineWidth = 10;
      ctx.stroke();
      
    }
    ctx.clip();
  }
  