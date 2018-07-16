var numSquares = 6;
var colors = generateRandomColors(numSquares);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#resetButton");
var modeBtns = document.querySelectorAll(".mode");

init();

resetButton.addEventListener("click", function() {
	reset();
});

function init() {
	setUpModeButtons();
	setUpSquares();
	reset();
}

function setUpSquares() {
	for(var i = 0; i < squares.length; i++) {
		squares[i].addEventListener("click", function() {
			var clickedColor = this.style.backgroundColor;
			if(modeBtns[2].classList.contains("selected")) {
				clickedColor = clickedColor.rgbToHex();
			} else {}
			console.log(clickedColor);
			if(clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct";
				changeColor(clickedColor);
				h1.style.backgroundColor = clickedColor;
				resetButton.textContent = "Play Again?";
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}

function setUpModeButtons() {
	for(var i = 0; i < modeBtns.length; i++) {
		modeBtns[i].addEventListener("click", function() {
			modeBtns[0].classList.remove("selected");
			modeBtns[1].classList.remove("selected");
			modeBtns[2].classList.remove("selected");
			this.classList.add("selected");
			
			//this.textContent === "Easy" ? numSquares = 3: numSquares = 6
			if(this.textContent === "Easy") {
				numSquares = 3;
			} else if(this.textContent === "Hard") {
				numSquares = 6;
			} else {
				numSquares = 6;
				colors = generateRandomColors(numSquares, "hex");
				pickedColor = pickColor();
			}
			reset();
		});
	}
}

function reset() {
	if(modeBtns[2].classList.contains("selected")) {
		setColors(numSquares, "hex");
	} else {
		setColors(numSquares, "rgb");
	}
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	h1.style.backgroundColor = "steelblue";
	messageDisplay.textContent = "";
	for(var i = 0; i < squares.length; i++) {
		if(colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
}

function changeColor(color) {
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	var random = Math.floor(Math.random()*colors.length);
	return colors[random];
}

function generateRandomColors(num, colorCode) {
	var arr = [];
	for(var i = 0; i < num; i++) {
		arr.push(randomColor(colorCode));
	}
	return arr;
}

function randomColor(colorType) {
	var r = Math.floor(Math.random()*256);
	var g = Math.floor(Math.random()*256);
	var b = Math.floor(Math.random()*256);
	var rgb = "rgb("+ r + ", " + g + ", " + b + ")";
	
	var rr = numToHex(r);
	var gg = numToHex(g);
	var bb = numToHex(b);
	var hex = "#" + rr + gg + bb;

	if(rgb === "rgb(35, 35, 35)") {
		randomColor(colorType);
	} else {
		if(colorType === "rgb") {
			return rgb;
		} else {
			return hex;
		}
	}
}

function setColors(num, colorType){
	colors = generateRandomColors(num, colorType);
	pickedColor = pickColor();
}

function numToHex(num) {
	var hexArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
	var sixteens = "" + hexArr[Math.floor(num / 16)];
	var ones = "" + hexArr[num % 16];
	var hex = sixteens + ones;
	return hex;
}

String.prototype.rgbToHex = function() {
	var r = Number(this.split("b(")[1].split(", ")[0]);
	var g = Number(this.split("b(")[1].split(", ")[1]);
	var b = Number(this.split("b(")[1].split(", ")[2].split(")")[0]);
	var hex = "#" + numToHex(r) + numToHex(g) + numToHex(b);
	return hex;
}
