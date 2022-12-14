const fs = require("fs");
const readline = require("readline");

const input_path = "input.txt";
let x = 1;
let cycle = 1;
let stdoutline = [];

const inputStream = fs.createReadStream(input_path);
const lineReader = readline.createInterface({
	input: inputStream,
	terminal: false,
});

lineReader.on("line", function (line) {
	HandleLines(line);
});
lineReader.on('close', function() {});

const HandleLines = (line) => {
	const line_arr = line.split(' ');
	const instruction = line_arr[0];
	let value = null;

	if (instruction !== 'noop') {
		value = parseInt(line_arr[1]);

		DrawPixel();
		cycle++;
		CheckCycle();
		DrawPixel();
		cycle++;
		x += value;
		CheckCycle();
	}
	else {
		DrawPixel();
		cycle++;
		CheckCycle();
	}
};

const DrawPixel = () => {
	if (cycle >= 40 && cycle <= 60) {
		//console.log(cycle, [x, x + 1, x + 2], [x, x + 1, x + 2].includes(cycle));
		//console.log(stdoutline);
	}

	if ([x, x + 1, x + 2].includes(cycle)) {
		stdoutline.push("#");
	}
	else {
		stdoutline.push(".");
	}
};

const CheckCycle = () => {
	//console.log(cycle, x);

	switch (cycle) {
		case 41:
		case 81:
		case 121:
		case 161:
		case 201:
		case 241:
			console.log(...stdoutline);
			stdoutline = [];
			cycle = 1;
	}

	/*if (cycle >= 20 && cycle <= 40) {
		console.log(cycle, x);
	}*/
};