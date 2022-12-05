const fs = require("fs");
const readline = require("readline");

const input_path = "input.txt";
const containsArr = [];

const inputStream = fs.createReadStream(input_path);
const lineReader = readline.createInterface({
	input: inputStream,
	terminal: false,
});

lineReader.on("line", function (line) {
	HandleLines(line);
});
lineReader.on('close', function() {
	console.log(JSON.stringify(containsArr));
	console.log(containsArr.length);
});

const HandleLines = (line) => {
	const line_arr = line.split(',');
	const pair_1_arr = line_arr[0].split("-");
	const pair_2_arr = line_arr[1].split("-");
	const pair_1_contains_pair_2 = AssignmentContains(parseInt(pair_1_arr[0]), parseInt(pair_1_arr[1]), parseInt(pair_2_arr[0]), parseInt(pair_2_arr[1]));
	const pair_2_contains_pair_1 = AssignmentContains(parseInt(pair_2_arr[0]), parseInt(pair_2_arr[1]), parseInt(pair_1_arr[0]), parseInt(pair_1_arr[1]));

	//console.log(pair_1_arr, pair_2_arr, pair_1_contains_pair_2, pair_2_contains_pair_1);
	
	if (pair_1_contains_pair_2) {
		containsArr.push(line);
	}
	else if (pair_2_contains_pair_1) {
		containsArr.push(line);
	}
};

const AssignmentContains = (pair_1_start, pair_1_end, pair_2_start, pair_2_end) => {
	/*if (pair_1_start == 7 || pair_2_start == 7)
		console.log(pair_1_start, pair_1_end, pair_2_start, pair_2_end, pair_1_start <= pair_2_start, pair_1_end >= pair_2_end)*/
	return pair_1_start <= pair_2_start && pair_1_end >= pair_2_end || pair_1_start >= pair_2_start && pair_2_start <= pair_1_end && pair_1_start <= pair_2_end && pair_2_end <= pair_1_end;
};