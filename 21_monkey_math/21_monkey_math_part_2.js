const fs = require("fs");
const readline = require("readline");

const input_path = "input_test.txt";
let monkeys = new Map();
let originalMonkeysMap = new Map();
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
	originalMonkeysMap = new Map(JSON.parse(JSON.stringify(Array.from(monkeys))));

	let humnVal = 3059111555555;

	while (monkeys.get('root') !== true) {
		humnVal++;

		monkeys = new Map(JSON.parse(JSON.stringify(Array.from(originalMonkeysMap))));
		monkeys.set('humn', humnVal);

		while (!monkeys.has('root')) {
			operations.forEach((operation, i) => {
				if (monkeys.has(operation.monkey1) && monkeys.has(operation.monkey2)) {
					const monkey1Val = monkeys.get(operation.monkey1);
					const monkey2val = monkeys.get(operation.monkey2);

					if (operation.monkey_name === 'root') {
						console.log(monkey1Val, monkey2val);
						operation.operator = '==';
					}

					const value = eval(monkey1Val + ' ' + operation.operator + ' ' + monkey2val);
					
					monkeys.set(operation.monkey_name, value);
				}
			});
		}

		console.log(humnVal, ':', monkeys.get('root'));
	}

	console.log(humnVal);
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