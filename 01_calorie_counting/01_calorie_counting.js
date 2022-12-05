const fs = require("fs");
const readline = require("readline");

const input_path = "input.txt";

const inputStream = fs.createReadStream(input_path);
const lineReader = readline.createInterface({
	input: inputStream,
	terminal: false,
});

lineReader.on("line", function (line) {
	HandleLines(line);
});
lineReader.on('close', function() {
	elfArray.push(sum);
	console.log(JSON.stringify(elfArray));
	FindElfWithMostCalories();
	FindTopThreeElvesWithMostCalories();
});

let elfArray = [];
let sum = 0;

const HandleLines = (line) => {
	if (line.length === 0) {
		elfArray.push(parseInt(sum));
		sum = 0;
	}
	else {
		sum += parseInt(line);
	}
};

const FindElfWithMostCalories = () => {
	let max = 0;
	
	elfArray.forEach((sum) => {
		if (sum > max) {
			max = sum;
		}
	});

	console.log(max);
};

const FindTopThreeElvesWithMostCalories = () => {
	elfArray = elfArray.sort((a, b) => b - a);

	let full_sum = 0;

	for (let i = 0; i < 3; i++) {
		full_sum += elfArray[i];
	}

	console.log(full_sum);
};