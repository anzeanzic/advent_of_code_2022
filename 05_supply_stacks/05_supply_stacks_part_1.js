const fs = require("fs");
const readline = require("readline");

const input_path = "input.txt";
const stack = [];
const instructions = [];
let parsingInstructions = false;

const inputStream = fs.createReadStream(input_path);
const lineReader = readline.createInterface({
	input: inputStream,
	terminal: false,
});

lineReader.on("line", function (line) {
	HandleLines(line);
});
lineReader.on('close', function() {
	// reverse the arrays
	stack.forEach((stack_arr) => {
		stack_arr = stack_arr.reverse();
	});

	console.log(stack);
	console.log(instructions);
	Rearrange();
	GetLastChars();
});

const HandleLines = (line) => {
	//console.log(line);

	if (line.trim().length === 0) {
		parsingInstructions = true;
		return;
	}

	if (parsingInstructions) {
		const line_arr = line.split(' ');
		const move = parseInt(line_arr[1]);
		const from = parseInt(line_arr[3]);
		const to = parseInt(line_arr[5]);

		instructions.push({ move: move, from: from, to: to });
	}
	else {
		if (line[0].trim() === '1') return;

		let i = 0;

		while (i < line.length) {
			const substring = line.substring(i, i + 3);
			const crate = substring.trim();

			if (stack[i / 4] === undefined) {
				stack.push([]);
			}

			// detect empty column
			if (crate[0] === '[') {
				stack[i / 4].push(crate);
			}
			
			// increment to the next crate
			if (i + 4 < line.length) {
				i = i + 4;
			}
			else {
				i = i + 3;
			}
		}
	}
};

const Rearrange = () => {
	instructions.forEach((instruction) => {
		for (let i = 0; i < instruction.move; i++) {
			const crate = stack[instruction.from - 1].pop();
			stack[instruction.to - 1].push(crate);
		}

		console.log(stack);
	});
};

const GetLastChars = () => {
	let word = '';

	stack.forEach((stack_arr) => {
		word += stack_arr[stack_arr.length - 1];
	});

	word = word.replaceAll('[', '');
	word = word.replaceAll(']', '');

	console.log(word);
}