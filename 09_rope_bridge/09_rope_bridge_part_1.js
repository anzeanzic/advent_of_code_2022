const fs = require("fs");
const readline = require("readline");

const input_path = "input.txt";
let headPos = {
	x: 0,
	y: 0
};
let tailPos = {
	x: 0,
	y: 0
};
const tailVisitedCoordinates = [{ x: 0, y: 0}];

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
	for (let i = 0; i < value; i++) {
		switch (direction) {
			case 'U':
				headPos.y = headPos.y - 1;
				break;
			case 'D':
				headPos.y = headPos.y + 1;
				break;
			case 'L':
				headPos.x = headPos.x - 1;
				break;
			case 'R':
				headPos.x = headPos.x + 1;
				break;
		}

		const isAdjacent = CheckIfAdjacent();

		if (!isAdjacent) {
			switch (direction) {
				case 'U':
					tailPos.y = tailPos.y - 1;
					tailPos.x = headPos.x;
					break;
				case 'D':
					tailPos.y = tailPos.y + 1;
					tailPos.x = headPos.x;
					break;
				case 'L':
					tailPos.x = tailPos.x - 1;
					tailPos.y = headPos.y;
					break;
				case 'R':
					tailPos.x = tailPos.x + 1;
					tailPos.y = headPos.y;
					break;
			}

			const newTailCoordinates = { x: tailPos.x, y: tailPos.y };
			const coordinateVisited = CheckIfCoordinateIsVisited(newTailCoordinates);

			if (!coordinateVisited) {
				tailVisitedCoordinates.push(newTailCoordinates);
			}
		}
	}
};

const CheckIfAdjacent = () => {
	return [-1, 0, 1].includes(headPos.x - tailPos.x) && [-1, 0, 1].includes(headPos.y - tailPos.y);
};

const CheckIfCoordinateIsVisited = (newTailCoordinates) => {
	for (let i = 0; i < tailVisitedCoordinates.length; i++) {
		if (newTailCoordinates.x === tailVisitedCoordinates[i].x && newTailCoordinates.y === tailVisitedCoordinates[i].y) {
			return true;
		}
	}

	return false;
};