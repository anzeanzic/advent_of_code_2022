const fs = require("fs");
const readline = require("readline");

const input_path = "input.txt";
let x = 1;
let cycle = 1;
let sum = 0;

const inputStream = fs.createReadStream(input_path);
const lineReader = readline.createInterface({
	input: inputStream,
	terminal: false,
});

lineReader.on("line", function (line) {
	HandleLines(line);
});
lineReader.on('close', function() {
	console.log(sum);
});

const HandleLines = (line) => {
	const line_arr = line.split(' ');
	const instruction = line_arr[0];
	let value = null;

	if (instruction !== 'noop') {
		value = parseInt(line_arr[1]);
		cycle++;
		CheckCycle();
		x += value;
		cycle++;
		CheckCycle();
	}
	else {
		cycle++;
		CheckCycle();
	}

	//console.log(instruction, value);
};

const CheckCycle = () => {
	switch (cycle) {
		case 20:
			console.log(x, 20);
			sum += x * cycle;
			break;
		case 60:
			console.log(x, 60);
			sum += x * cycle;
			break;
		case 100:
			console.log(x, 100);
			sum += x * cycle;
			break;
		case 140:
			console.log(x, 140);
			sum += x * cycle;
			break;
		case 180:
			console.log(x, 180);
			sum += x * cycle;
			break;
		case 220:
			console.log(x, 220);
			sum += x * cycle;
			break;
	}
};