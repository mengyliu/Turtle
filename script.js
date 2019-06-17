$(document).ready(function() {
    console.log( "ready!" );
    init()
});

var color = '#FF0000'
function init() {
	var paint = true;
	canvas = document.getElementById('canvas')
	canvas.setAttribute("width", window.innerWidth * 0.8)
    canvas.setAttribute("height", window.innerHeight * 0.8)
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;

    canvas.addEventListener("mouseover", function (e) {
	    if (paint) {
	        currX = e.clientX - canvas.offsetLeft;
	        currY = e.clientY - canvas.offsetTop;
	        draw()
	    }
	});

    canvas.addEventListener("mousemove", function (e) {
        if (paint) {
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw()
        }
    });

        // on mobile phone
    canvas.addEventListener("touchover", function (e) {
        if (paint) {
            prevX = currX;
            prevY = currY;
            currX = e.touches[0].clientX - canvas.offsetLeft;
            currY = e.touches[0].clientY - canvas.offsetTop;
            draw()
        }
    });

    canvas.addEventListener("touchmove", function (e) {
        if (paint) {
            currX = e.touches[0].clientX - canvas.offsetLeft;
            currY = e.touches[0].clientY - canvas.offsetTop;
            draw()
        }
    });


    document.addEventListener("keypress", function (e) {
    	switch (e.code) {
    		case "Space":
    			erase();
    			break;
    		case "KeyB":
    			color = "#0000FF";
    			break;
    		case "KeyG":
    			color = "#008000";
    			break;
    		case "KeyR":
    			color = "#FF0000";
    			break;
    		case "KeyY":
    			color = "#FFFF00";
    			break;
    	}
        document.getElementById("picker").value = color;
    });

    document.onkeydown = function(e) {
        e = e || window.event;
        if (e.keyCode == '38') {
            paint = false;
        }
        // down arrow
        else if (e.keyCode == '40') {
            paint = true;
        }
    }

    document.getElementById('picker').addEventListener("input", function(e) {
        color = this.value;
    })

    window.addEventListener("orientationchange", function() {
        var w = screen.width;
        var h = screen.height;
        canvas.width =  w*0.8;
        canvas.height = h*0.8;
        erase();
    });
}
function draw() {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect(currX-15, currY-15, 30, 30); 
    ctx.fill();
} 

function erase() {
    ctx.clearRect(0, 0, w, h);
}