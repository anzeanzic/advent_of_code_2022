const fs = require("fs");
const readline = require("readline");

const input_path = "input_test.txt";
const tailVisitedCoordinates = [{ x: 0, y: 0}];
const KNOTS_COUNT = 10;
const knots = [];

for (let i = 0; i < KNOTS_COUNT; i++) {
	knots.push({ x: 0, y: 0 });
}

// 2602

const inputStream = fs.createReadStream(input_path);
const lineReader = readline.createInterface({
	input: inputStream,
	terminal: false,
});

lineReader.on("line", function (line) {
	HandleLines(line);
});
lineReader.on('close', function() {
	console.log(tailVisitedCoordinates);
	console.log(tailVisitedCoordinates.length);
});

const HandleLines = (line) => {
	const line_arr = line.split(' ');
	const direction = line_arr[0];
	const value = parseInt(line_arr[1]);

	MoveHead(direction, value);
};

const MoveHead = (direction, value) => {
	console.log("COMMAND");
	for (let i = 0; i < value; i++) {

		switch (direction) {
			case 'U':
				knots[0].y = knots[0].y - 1;
				break;
			case 'D':
				knots[0].y = knots[0].y + 1;
				break;
			case 'L':
				knots[0].x = knots[0].x - 1;
				break;
			case 'R':
				knots[0].x = knots[0].x + 1;
				break;
		}

		//console.log(knots[0]);
		//console.log("-----------");

		for (let k = 1; k < KNOTS_COUNT; k++) {
			MoveTail(direction, k - 1, k);

			// the last knot is the tail
			if (k === KNOTS_COUNT - 1) {
				const newTailCoordinates = { x: knots[k].x, y: knots[k].y };
				const coordinateVisited = CheckIfCoordinateIsVisited(newTailCoordinates);

				if (!coordinateVisited) {
					//console.log(newTailCoordinates);
					tailVisitedCoordinates.push(newTailCoordinates);
				}
			}
		}
	}
	console.log(knots);
};

const MoveTail = (direction, previous_ndx, current_ndx) => {
	const isAdjacent = CheckIfAdjacent(previous_ndx, current_ndx);

	if (!isAdjacent) {
		switch (direction) {
			case 'U':
				knots[current_ndx].y = knots[current_ndx].y - 1;
				knots[current_ndx].x = knots[previous_ndx].x;
				break;
			case 'D':
				knots[current_ndx].y = knots[current_ndx].y + 1;
				knots[current_ndx].x = knots[previous_ndx].x;
				break;
			case 'L':
				knots[current_ndx].x = knots[current_ndx].x - 1;
				knots[current_ndx].y = knots[previous_ndx].y;
				break;
			case 'R':
				knots[current_ndx].x = knots[current_ndx].x + 1;
				knots[current_ndx].y = knots[previous_ndx].y;
				break;
		}
	}
};

const CheckIfAdjacent = (previous_ndx, current_ndx) => {
	return [-1, 0, 1].includes(knots[previous_ndx].x - knots[current_ndx].x) && [-1, 0, 1].includes(knots[previous_ndx].y - knots[current_ndx].y);
};

const CheckIfCoordinateIsVisited = (newTailCoordinates) => {
	for (let i = 0; i < tailVisitedCoordinates.length; i++) {
		if (newTailCoordinates.x === tailVisitedCoordinates[i].x && newTailCoordinates.y === tailVisitedCoordinates[i].y) {
			return true;
		}
	}

	return false;
};