const fs = require("fs");
const readline = require("readline");

const input_path = "input.txt";
const monkeys = new Map();
const operations = [];

const inputStream = fs.createReadStream(input_path);
const lineReader = readline.createInterface({
	input: inputStream,
	terminal: false,
});

lineReader.on("line", function (line) {
	HandleLines(line);
});
lineReader.on('close', function() {
	console.log(operations);

	while (!monkeys.has('root')) {
		operations.forEach((operation) => {
			if (monkeys.has(operation.monkey1) && monkeys.has(operation.monkey2)) {
				const monkey1Val = monkeys.get(operation.monkey1);
				const monkey2val = monkeys.get(operation.monkey2);
				const value = eval(monkey1Val + operation.operator + monkey2val);
				//console.log(value);
				
				monkeys.set(operation.monkey_name, value);
			}
		});
	}

	console.log(monkeys.get('root'));
});

const HandleLines = (line) => {
	const line_arr = line.split(':');
	const monkeyName = line_arr[0].trim();

	if (line_arr[1].indexOf('+') >= 0) {
		const operation_arr = line_arr[1].split('+');
		const monkeyName1 = operation_arr[0].trim();
		const monkeyName2 = operation_arr[1].trim();

		operations.push({ monkey_name: monkeyName, monkey1: monkeyName1, monkey2: monkeyName2, operator: '+' });
	}
	else if (line_arr[1].indexOf('-') >= 0) {
		const operation_arr = line_arr[1].split('-');
		const monkeyName1 = operation_arr[0].trim();
		const monkeyName2 = operation_arr[1].trim();

		operations.push({ monkey_name: monkeyName, monkey1: monkeyName1, monkey2: monkeyName2, operator: '-' });
	}
	else if (line_arr[1].indexOf('*') >= 0) {
		const operation_arr = line_arr[1].split('*');
		const monkeyName1 = operation_arr[0].trim();
		const monkeyName2 = operation_arr[1].trim();

		operations.push({ monkey_name: monkeyName, monkey1: monkeyName1, monkey2: monkeyName2, operator: '*' });
	}
	else if (line_arr[1].indexOf('/') >= 0) {
		const operation_arr = line_arr[1].split('/');
		const monkeyName1 = operation_arr[0].trim();
		const monkeyName2 = operation_arr[1].trim();

		operations.push({ monkey_name: monkeyName, monkey1: monkeyName1, monkey2: monkeyName2, operator: '/' });
	}
	else {
		number = parseInt(line_arr[1]);
		monkeys.set(monkeyName, number);
	}
};