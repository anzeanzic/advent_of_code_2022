const fs = require("fs");
const readline = require("readline");

const input_path = "input_test.txt";
const leftArr = [];
const rightArr = [];
let isLeftPacket = true;
const indicesInRightOrder = [];

const inputStream = fs.createReadStream(input_path);
const lineReader = readline.createInterface({
	input: inputStream,
	terminal: false,
});

// 8734 - to high

lineReader.on("line", function (line) {
	HandleLines(line);
});
lineReader.on('close', function() {
	console.log(leftArr, rightArr);

	CompareArr();

	let sum = 0;

	// Running the for loop
	for (let i = 0; i < indicesInRightOrder.length; i++) {
		sum += indicesInRightOrder[i];
	}

	console.log(sum);
});

const HandleLines = (line) => {
	if (line.trim().length > 0) {
		if (isLeftPacket) {
			leftArr.push(JSON.parse(line));
			isLeftPacket = false;
		}
		else {
			rightArr.push(JSON.parse(line));
		}
	}
	else {
		isLeftPacket = true;
	}
};

const CompareArr = () => {
	console.log(leftArr.length);

	// iterate over all pairs
	for (let i = 0; i < leftArr.length; i++) {
		console.log("------ PAIR " + (i + 1) + " ------");
		const leftPacket = leftArr[i];
		const rightPacket = rightArr[i];
		
		//console.log(leftPacket, rightPacket,);
		
		/*if (leftPacket.length === 0 && rightPacket.length > 0) {
			indicesInRightOrder.push(i + 1);
			continue;
		}*/

		// iterate over packet
		const result = Compare(leftPacket, rightPacket, i, false);
		if (result === 1) {
			indicesInRightOrder.push(i + 1);
			console.log('RIGHT ORDER');
		}
	}
};

const Compare = (leftPacket, rightPacket, i, isSub) => {
	const len = leftPacket.length > rightArr.length ? leftPacket.length : rightArr.length;

	for (let p = 0; p < len; p++) {
		console.log('Compare ' + JSON.stringify(leftPacket[p]) + ' vs ' + JSON.stringify(rightPacket[p]), p, isSub, leftPacket.length, rightPacket.length);

		if (leftPacket[p] == undefined && rightPacket[p] != undefined) return 1;
		else if (leftPacket[p] != undefined && rightPacket[p] == undefined) return -1;
		else if (!Array.isArray(leftPacket[p]) && !Array.isArray(rightPacket[p])) {
			console.log("num");
			if (leftPacket[p] < rightPacket[p]) return 1;
			else if (leftPacket[p] > rightPacket[p]) return -1;
		}
		else if (Array.isArray(leftPacket[p]) && Array.isArray(rightPacket[p])) {
			console.log("array");
			const result = Compare(leftPacket[p], rightPacket[p], i, true);
			if (result !== 0) return result;
		}
		/*else {
			console.log("mixed");

			if (Array.isArray(leftPacket[p]) && !isNaN(rightPacket[p])) {
				const result = Compare(leftPacket[p], [ rightPacket[p] ], i);
				if (result !== 0) return result;
			}
			else if (!isNaN(leftPacket[p]) && Array.isArray(rightPacket[p])) {
				const result = Compare([ leftPacket[p] ], rightPacket[p], i);
				if (result !== 0) return result;
			}
		}*/
	}

	return 0;
};

/*const Compare = (leftPacket, rightPacket, i, p) => {
	console.log('Compare ' + leftPacket[p] + ' vs ' + rightPacket[p]);

	if (!Array.isArray(leftPacket[p]) && !Array.isArray(rightPacket[p])) {
		const result = IntegerComparison(leftPacket[p], rightPacket[p], i);
		return result;
	}
	else if (Array.isArray(leftPacket[p]) && Array.isArray(rightPacket[p])) {
		console.log("isArray", leftPacket[p], rightPacket[p]);
		const len = leftPacket[p].length > rightArr[p].length ? leftPacket[p].length : rightArr[p].length;

		for (let a = 0; a < len; a++) {
			if (leftPacket[p][a] == undefined && rightPacket[p][a] != undefined) {
				indicesInRightOrder.push(i + 1);
				return true;
			}

			const result = IntegerComparison(leftPacket[p][a], rightPacket[p][a], i);

			if (result) {
				return result;
			}
		}
	}
	else {
		console.log("isMixed");
		// mixed types
		if (Array.isArray(leftPacket[p]) && !isNaN(rightPacket[p]) || !isNaN(leftPacket[p]) && Array.isArray(rightPacket[p])) {
			if (!Array.isArray(leftPacket[p])) {
				leftPacket[p] = [ leftPacket[p] ];
			}
			else if (!Array.isArray(rightPacket[p])) {
				rightPacket[p] = [ rightPacket[p] ];
			}

			const result = Compare(leftPacket, rightPacket, i, p);
			return result;
		}
	}
};*/