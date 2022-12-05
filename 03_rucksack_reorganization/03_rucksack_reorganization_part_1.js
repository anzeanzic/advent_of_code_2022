const fs = require("fs");
const readline = require("readline");

const input_path = "input.txt";
const rucksackArray = [[], []];
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
	const str1 = line.substr(0, line.length/2);
	const str2 = line.substr(line.length/2, line.length -1);

	const same = [];

	for (var i = 0; i < str1.length; i++) {
		if (str2.indexOf(str1[i]) >= 0) {
			if (!same.includes(str1[i])) {
				same.push(str1[i]);
			}
		}
	}

	console.log(str1, str2, same);

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

	//console.log(value);

	sum += value;
};