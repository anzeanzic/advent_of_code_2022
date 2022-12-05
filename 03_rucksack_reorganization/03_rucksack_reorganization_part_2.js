const fs = require("fs");
const readline = require("readline");

const input_path = "input.txt";
const rows = [];
const rucksackArray = [];
let sum = 0;

const inputStream = fs.createReadStream(input_path);
const lineReader = readline.createInterface({
	input: inputStream,
	terminal: false,
});

lineReader.on("line", function (line) {
	rows.push(line);
});
lineReader.on('close', function() {
	HandleLines();
	console.log(sum);
});

const HandleLines = () => {
	let temp = [];

	rows.forEach((row) => {
		temp.push(row);

		if (temp.length === 3) {
			rucksackArray.push(temp)
			temp = [];
		}
	});

	if (temp.length !== 0) {
		rucksackArray.push(temp);
	}

	const same = [];
	let map = new Map();

	rucksackArray.forEach((arr) => {
		arr.forEach((line) => {
			for (var i = 0; i < line.length; i++) {
				if (line.substr(0, i).indexOf(line[i]) === -1) {
					if (map.has(line[i])) {
						map.set(line[i], map.get(line[i]) + 1);
					}
					else {
						map.set(line[i], 1);
					}
				}
			}
		});

		for (let [key, value] of map) {
			if (value === arr.length) {
				//if (!same.includes(key)) {
					same.push(key);
				//}
			}
		}

		map = new Map();
	});

	console.log(same);

	console.log(rows.length, rucksackArray.length, same.length);

	same.forEach((char) => {
		GetCharNumber(char);
	});
};

const GetCharNumber = (char) => {
	const code = char.charCodeAt(0);
	let value = 0;

	if (code >= 97) {
		value = code - 96;
	}
	else {
		value = code - 65 + 27;
	}

	sum += value;
};