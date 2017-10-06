var size = 3;
var interval = 2;
var counter = 0;
var currentCell = -1;
var timeLimit = 10;
var score = 0;
var high_score = 0;
var timerFunction;

drawLayout(size);

function selectSize(selectedSize){
	size = selectedSize;
	if(size && size > 0){
		drawLayout(size);
	}else{
		alert('Select size');
	}
}

function drawLayout(size){
	var grid = document.getElementById('grid');
	while (grid.hasChildNodes()) {
    	grid.removeChild(grid.lastChild);
	}
	for(var i=0; i<size; i++){
		var row = document.createElement('div');
		row.classList.add('row');
		for(var j=0; j<size; j++){
			var cell = document.createElement('div');
			cell.classList.add('cell');
			cell.id = 'cell_' + (size*i+j);
			cell.addEventListener('click', cellClicked);
			row.appendChild(cell);
		}
		grid.appendChild(row);
	}
	startGame(timeLimit);
}

function cellClicked(event){
	if(event.target.classList.contains('highlighted')){
		score++;
		document.getElementById('score').textContent = score;
		if(score > high_score){
			setHighScore(score);
		}
	}
}

function setHighScore(newScore){
	high_score = score;
	localStorage.setItem('high_score', high_score);
	document.getElementById('high_score').textContent = high_score;
}


function setTimer(limit){
	var time = limit;
	timerFunction = setInterval(function(){
		time--;
		document.getElementById('timer').textContent = time;
		counter = (counter+1)%interval;
		if(time == 0){
			clearInterval(timerFunction);
			clearSelection();
			if (size < 5 && window.confirm('Level completed. Do you want to proceed to next level?')) { 
				size++;
				drawLayout(size);
			}else{
				alert('Game Over.. You have finished the final level !!!');
				// document.getElementById('timer').textContent = 'Game Over !!!';	
			}
		}else if(counter === 0){
			highlightCell();
		}
	}, 1000);
}

function highlightCell(){
	clearSelection();
	var newCell = getRandomCell();
	document.getElementById('cell_' + newCell).classList.add('highlighted');
}

function getRandomCell(){
	var randomCellId = Math.floor(Math.random()*size*size);
	if(randomCellId === currentCell){
		return getRandomCell();
	}
	currentCell = randomCellId;
	return randomCellId;
}

function clearSelection(){
	var currentHighlighted = document.getElementsByClassName('highlighted')
	if(currentHighlighted.length){
		currentHighlighted[0].classList.remove('highlighted');
	}
}

function startGame(limit){
	clearInterval(timerFunction);
	score = 0;
	timeLimit = limit;
	counter = 0;
	document.getElementById('score').textContent = score;
	high_score = localStorage.getItem('high_score') || 0;
	document.getElementById('high_score').textContent = high_score;
	highlightCell();
	document.getElementById('timer').textContent = limit;
	setTimer(limit);
}