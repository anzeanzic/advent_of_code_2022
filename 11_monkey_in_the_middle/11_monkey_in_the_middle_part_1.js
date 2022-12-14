const fs = require("fs");
const readline = require("readline");

const input_path = "input.txt";
const monkey_arr = [];
const inspectionCounters = [];
let currentMonkeyNdx = -1;

const inputStream = fs.createReadStream(input_path);
const lineReader = readline.createInterface({
	input: inputStream,
	terminal: false,
});

lineReader.on("line", function (line) {
	HandleLines(line);
});
lineReader.on('close', function() {
	console.log(monkey_arr);
	
	for (let i = 0; i < 20; i++) {
		Round();
		console.log(monkey_arr);
	}

	console.log(inspectionCounters);

	const sorted = inspectionCounters.sort((a,b) => b-a);
	console.log(sorted[0] * sorted[1]);
});

const HandleLines = (line) => {
	if (line.indexOf('Monkey') >= 0) {
		const line_arr = line.split(' ');
		const ndx = parseInt(line_arr[1].replace(':', '').trim());
		AddMonkey(ndx);
	}
	else if (line.indexOf('Starting items') >= 0) {
		const line_arr = line.split(':');
		const starting_items = line_arr[1].split(',').map((el) => parseInt(el));
		monkey_arr[currentMonkeyNdx].starting_items = starting_items;
	}
	else if (line.indexOf('Operation') >= 0) {
		const line_arr = line.split(':');
		
		if (line_arr[1].indexOf('*') >= 0) {
			const sign = '*';
			const operation_arr = line_arr[1].split('*');
			const operator = operation_arr[1].trim() === 'old' ? 'old' : parseInt(operation_arr[1]);
			monkey_arr[currentMonkeyNdx].operation.sign = sign;
			monkey_arr[currentMonkeyNdx].operation.operator = operator;
		}
		else if (line_arr[1].indexOf('+') >= 0) {
			const sign = '+';
			const operation_arr = line_arr[1].split('+');
			const operator = parseInt(operation_arr[1]);
			monkey_arr[currentMonkeyNdx].operation.sign = sign;
			monkey_arr[currentMonkeyNdx].operation.operator = operator;
		}
	}
	else if (line.indexOf('Test') >= 0) {
		const line_arr = line.split('divisible by');
		const test = parseInt(line_arr[1]);
		monkey_arr[currentMonkeyNdx].test = test;
	}
	else if (line.indexOf('If true') >= 0) {
		const line_arr = line.split('monkey');
		const monkey_ndx = parseInt(line_arr[1]);
		monkey_arr[currentMonkeyNdx].condition.push(monkey_ndx);
	}
	else if (line.indexOf('If false') >= 0) {
		const line_arr = line.split('monkey');
		const monkey_ndx = parseInt(line_arr[1]);
		monkey_arr[currentMonkeyNdx].condition.push(monkey_ndx);
	}
};

const AddMonkey = (ndx) => {
	monkey_arr[ndx] = {
		starting_items: [],
		operation: {
			sign: null,
			operator: null
		},
		test: 0,
		condition: []
	};
	inspectionCounters[ndx] = 0;

	currentMonkeyNdx = ndx;
};

const Round = () => {
	monkey_arr.forEach((monkey, monkey_ndx) => {
		if (monkey.starting_items.length > 0) {
			let itemsToDelete = [];

			monkey.starting_items.forEach((item, ndx) => {
				let newValue = item;

				switch (monkey.operation.sign) {
					case '*':
						newValue = item * ((monkey.operation.operator === 'old') ? item : monkey.operation.operator);
						break;
					case '+':
						newValue = item + ((monkey.operation.operator === 'old') ? item : monkey.operation.operator); 
						break;
				}

				// divide worry level
				newValue = parseInt(newValue / 3);

				if (newValue % monkey.test === 0) {
					monkey_arr[monkey.condition[0]].starting_items.push(newValue);
				}
				else {
					monkey_arr[monkey.condition[1]].starting_items.push(newValue);
				}

				itemsToDelete.push(ndx);
				inspectionCounters[monkey_ndx]++;
			});

			itemsToDelete = itemsToDelete.sort((a,b) => b-a);

			itemsToDelete.forEach((ndx) => {
				monkey.starting_items.splice(ndx, 1);
			});
		}
	});
};