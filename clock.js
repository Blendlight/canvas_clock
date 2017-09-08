
//function to convert degree to radian
function degtorad(x)
{
	return Math.PI*x/180;
}
//function to convert radian to degree 
function radtodeg(x)
{
	return 180*x/Math.PI;

}

//get the canvas element for drawing
canvas = document.getElementById("game");
canvas.width = width = canvas.height = height = 400;
r = (width/2-10);

//get tool for drawing operation on canvas
//we are using 2d for our clock
ctx = canvas.getContext("2d");

//set the arc or line width to 5
ctx.lineWidth=  5;

//run the gameLoop 12 times in 1sec
setInterval(clockLoop, 1000/12);

//function for clock Loop
function clockLoop(){
	//update the time
	update();

	//draw the clock
	draw();
}

function update()
{
	//get the current time
	time = new Date();

	//get milliseconds from the time
	msec = time.getMilliseconds();
	
	//convert milli seconds to seconds
	//we will add this to seconds for smooth animation
	msec = msec/1000;
	
	//get the seconds
	sec = time.getSeconds();
	
	//add the milliseconds with the seconds
	sec  = sec+msec;
	
	//60 seconds compleate 1 revolution and 1 revolution is equal to 360degree
	// we need to find the degree for sec revolution
	/*
		60s = 360deg
		sec = deg
		
		cross multiply it
		=> 60 deg = 360 * sec
		=> deg = 360 * sec / 60
		=> deg = 6 * sec
	*/
	
	//i store the degree for the seconds in the same variable sec
	sec = sec * 6;


	//get current minutes
	min = time.getMinutes();

	//60 minutes compleate 1 revolution and 1 revolution is equal to 360degree
	// we need to find the degree for min revolution
	/*
		60m = 360deg
		min = deg
		
		cross multiply it
		=> 60 deg = 360 * min
		=> deg = 360 * min / 60
		=> deg = 6 * min
	*/
	//i store the degree for the minutes in the same variable min
	min = min*6;
	
	
	//get the current hours from the date
	hours = time.getHours();
	//12 hours compleate 1 revolution and 1 revolution is equal to 360degree
	// we need to find the degree for hours revolution
	/*
		12hours = 360deg
		hours = deg
		
		cross multiply it
		=> 12 deg = 360 * hours
		=> deg = 360 * hours / 24
		=> deg = 30 * hours
	*/
	//i store the degree for the hours in the same variable hours
	
	hours = hours * 30;


	//these variables is used for the digital clock
	msect = time.getMilliseconds();
	sect = time.getSeconds();
	mint = time.getMinutes();
	hourst =  time.getHours();


}

function draw()
{
	ctx.clearRect(0,0, width, height);
	//clock
	ctx.fillStyle = "black";
	ctx.strokeStyle = "yellow";
	ctx.beginPath();
	ctx.arc(width/2, height/2, r, degtorad(0), degtorad(360));
	ctx.stroke();
	ctx.fill();
	ctx.closePath();

	ctx.setLineDash([4, 10.6]);
	//ctx.setLineDash([1, 13.65]);

	//sec
	ctx.shadowBlur = 10	;

	ctx.shadowColor = "white";
	ctx.strokeStyle = "white";

	ctx.beginPath();
	ctx.arc(width/2, height/2, r-50, degtorad(-90+6), degtorad(sec-90+6));
	ctx.stroke();
	ctx.closePath();	
	ctx.setLineDash([0]);


	//min
	ctx.shadowBlur = 10	;
	ctx.shadowColor = "blue";
	ctx.strokeStyle = "blue";

	ctx.beginPath();
	ctx.arc(width/2, height/2, r-60, degtorad(-90), degtorad(min-90));
	ctx.stroke();
	ctx.closePath();	


	//hours
	ctx.shadowBlur = 10	;
	ctx.shadowColor = "red";
	ctx.strokeStyle = "red";
	ctx.beginPath();
	ctx.arc(width/2, height/2, r-70, degtorad(-90), degtorad(hours-90));
	ctx.stroke();
	ctx.closePath();
	ctx.setLineDash([0]);

	fsize = width/6;

	ctx.font = fsize+"px bold";
	ctx.fillStyle = "yellowgreen";
	ctx.shadowBlur = 10	;
	ctx.shadowColor = "yellowgreen";
	timet = hourst+":"+mint+":"+sect;

	twidth = ctx.measureText(timet);

	ctx.fillText(timet, width/2-twidth.width/2, height/2 +(fsize/3) )




	//draw the 12354 upto 12

	timen = ["1","2","3","4","5","6","7","8","9","10","11","12"];
	ctx.shadowBlur = 10;
	ctx.shadowColor = "red";
	for(i=0;i<12;i++)
	{
		ctx.fillStyle = "red";
		x = width/2;
		y = height/2;

		rr = r-(width/20);

		x += Math.cos(degtorad(30*i-90+30))*(rr);
		y += Math.sin(degtorad(30*i-90+30))*(rr);
		fs = 22;
		ctx.font = fs+"px bold";

		tw = ctx.measureText(timen[i]);

		ctx.fillText(timen[i], x-(tw.width/2), y+(fs/3))
	}
	ctx.shadowBlur = 0;

	for(i=0;i<60;i++)
	{
		rr = r-(width/9);

		x = width/2;
		y = height/2;

		x += Math.cos(degtorad(6*i))*(rr);
		y += Math.sin(degtorad(6*i))*(rr);
		ctx.fillStyle = "pink";
		ctx.fillRect(x-1, y-1, 2, 2)
	}
}