// set up time limit
var timeLimit = 10;
var cntr = timeLimit;
var randomlad;
var totalscores;
var tally;
var num1 = 0;
var num2 = 0;
var answer = 0;
var timeOutVar;
var checkAnswer;
var stopwatchstart = 0;
var stopwatch = 0;
var stopwatchmins = 0;
var stopwatchsecs = 0;

// set score board variables
var svgWidth = 220;
var svgHeight = 220;
var scoreWidth = 20;

// set up scoretracker
var tracker = [];




function tt_btn() {
	// Get the selected game type and time limit from the index page
	var gameType = document.getElementById("gameType").value;  // e.g., "2s", "all", "allExpert", etc.
	var gameTime = document.getElementById("gameTime").value;    // e.g., "10", "5", "3"
	timeLimit = parseInt(gameTime); // update timeLimit based on selection
  
	// Build the tracker array based on game type selection:
	if (gameType === "all") {
	  // All times tables: each cell weighted 2
	  tracker = [];
	  for (var i = 0; i < 11; i++) {
		var row = [];
		for (var j = 0; j < 11; j++) {
		  row.push(2);
		}
		tracker.push(row);
	  }
	} else if (gameType === "allExpert") {
	  // All times tables at expert level: lower weight (e.g., 1) for each cell
	  tracker = [];
	  for (var i = 0; i < 11; i++) {
		var row = [];
		for (var j = 0; j < 11; j++) {
		  row.push(1);
		}
		tracker.push(row);
	  }
	} else {
	  // For a specific times table, like "2s", "3s", etc.
	  var timesTable = parseInt(gameType); 
	  tracker = [];
	  for (var i = 0; i < 11; i++) {
		var row = [];
		for (var j = 0; j < 11; j++) {
		  // Highlight both the row AND column for timesTable
		  if (i === (timesTable - 2) || j === (timesTable - 2)) {
			row.push(2);
		  } else {
			row.push(0);
		  }
		}
		tracker.push(row);
	  }
	}
  
	// Clear the build area and initialize UI elements
	d3.select("#buildArea").html("");
	d3.select("#buildArea").append("p").text("GO!").attr("id", "timer");
	d3.select("#buildArea").append("p").attr("id", "question");
	d3.select("#buildArea").append("input").attr("id", "answer").attr("size", 3);
	d3.select("#buildArea").append("div").attr("id", "scoreboardcontainer");
  
	// Build the scoreboard and start the game
	build();
	askQuestion();
	stopwatchstart = Date.now();
  
	// Add listener to answer input
	d3.select("#answer").on("keydown", function() {
	  if (d3.event.keyCode === 13) {
		checkAnswer();
	  }
	});
  }


// ask a question
function askQuestion() {

	totalscores = 0;

	for (var i = 0; i < 11; i++) {
		for (var j = 0; j < 11; j++)  {
    		totalscores = totalscores + tracker[i][j];
		}
	}

	if (totalscores == 0) {
		stopwatch = (Date.now() - stopwatchstart)/1000;
		stopwatchmins = Math.floor(stopwatch / 60);
		stopwatchsecs = Math.floor(stopwatch - stopwatchmins * 60);
		d3.select("#timer").text("You did it in " + stopwatchmins + " minutes and " + stopwatchsecs + " seconds!");
		d3.select("#question").remove();
		d3.select("#answer").remove();
		d3.select("scoreboardcontainer").remove();
		d3.select("svg").remove();
	
	} else {

		myStopFunction();	//stop the current timer
		cntr = timeLimit;	//reset timer
		countDown(cntr);	// call count down



		randomlad = Math.random();

		tally = 0;
		num2 = 2;
		num1 = 2;

		for (var i = 0; i < 11; i++) {
			for (var j = 0; j < 11; j++)  {

				tally = tally + tracker[i][j]/totalscores;
	    		num1 = i+2;
	    		num2 = j+2;
		   		if (tally > randomlad) {break;}
	    
			}
	    	if (tally > randomlad) {break;}
		}


		correctANS = num1 * num2;

		d3.select("#question").text(num1 + " x " + num2);
		d3.select("#answer").node().focus();
	
	}

}


// check answer
function checkAnswer() {
	myStopFunction();	//stop the current timer
	answer = d3.select("#answer").property("value");

	if (answer == correctANS && d3.select("#timer").text() == "Answer = " + correctANS)	{
		tracker[num1-2][num2-2] = tracker[num1-2][num2-2] + 4;
		d3.select("#timer").text("Go!");
		askQuestion();
	}

	else if (answer == correctANS) {

		// update scoreboard
		tracker[num1-2][num2-2] = tracker[num1-2][num2-2] - 2;

		d3.select("#timer").text("Go!");
		askQuestion();
	} else {
		// update scoreboard
		tracker[num1-2][num2-2] = tracker[num1-2][num2-2] + 4;
		
		d3.select("#timer").text("Answer = " + correctANS);
	}

	// clear input
	document.getElementById("answer").value = "";
	build();

}

// count down timer funtion
function countDown(cntr) {
 	timeOutVar = setTimeout(function() {
    	d3.select("#timer").text(cntr);          
    	if (cntr-- > 0) {
    		countDown(cntr);
    	} else {
    		d3.select("#timer").text("Answer = " + correctANS);
    	}
	}, 1000)
}

// end the timer function

function myStopFunction() {
  clearTimeout(timeOutVar);
}



// scoreboard builder function
function build() {
	d3.select("svg").remove();
	// create SVG element:
	var svg = d3.select("#scoreboardcontainer").append("svg").attr("width", svgWidth + "px").attr("height", svgHeight + "px");
	var i=0;
	// rows
	while (i < 11) {
		var j=0;
		while (j < 11) {
			
			if (tracker[i][j]==0) {
				getcolour = 'green';
			} else if (tracker[i][j]==2) {
				getcolour = 'orange';
			} else {
				getcolour = 'red';
			}


			svg.append('rect')
				.attr('x', j*scoreWidth)
				.attr('y', i*scoreWidth)
				.attr('width', scoreWidth)
				.attr('height', scoreWidth)
				.attr('stroke', 'black')
				.attr('fill', getcolour);
			j++;
		};
		i++;
	}
}