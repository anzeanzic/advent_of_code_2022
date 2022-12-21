const fs = require("fs");
const readline = require("readline");

const input_path = "input.txt";
let encryptedFile = [];
let moved = [];

const inputStream = fs.createReadStream(input_path);
const lineReader = readline.createInterface({
	input: inputStream,
	terminal: false,
});

lineReader.on("line", function (line) {
	HandleLines(line);
});
lineReader.on('close', function() {
	Mix();
	
	const val1 = findValueAt(1000, encryptedFile);
	const val2 = findValueAt(2000, encryptedFile);
	const val3 = findValueAt(3000, encryptedFile);

	console.log(val1, val2, val3, "sum: " + (val1 + val2 + val3));
});

const HandleLines = (line) => {
	const number = parseInt(line);

	encryptedFile.push(number);
	moved.push(false);
};

const Mix = () => {
	let i = 0;

	while (i < encryptedFile.length) {
		const currentNum = encryptedFile[i];

		console.log(currentNum);

		if (i === 4) {
			break;
		}

		let newIndex = i + currentNum;
		//console.log("--------------");
		//console.log(currentNum, i, newIndex);

		if (newIndex === 0) {
			newIndex = encryptedFile.length - 1;
		}
		else if (newIndex > encryptedFile.length) {
			//newIndex = newIndex % encryptedFile.length + 1;
			newIndex = newIndex % (encryptedFile.length - 1);
		}
		

		encryptedFile = arrayMove(encryptedFile, i, newIndex, currentNum);
		moved[i] = true;
		moved = arrayMove(moved, i, newIndex, true);

		//console.log(encryptedFile.toString());
		//console.log(moved.toString());

		const newI = FindUnsortedBeforeI(i);

		if (newI !== -1) {
			i = newI;
		}
		else {
			i = encryptedFile.length;
			console.log(encryptedFile.toString())
		}
	}
};

const arrayMove = (arr, fromIndex, toIndex, val) => {
	const newArr = [...arr];
	newArr.splice(toIndex, 0, newArr.splice(fromIndex, 1)[0]);
	//arr.splice(fromIndex, 1)
	//arr.splice(toIndex, 0, val);

	return newArr;
};

const FindUnsortedBeforeI = () => {
	return moved.findIndex((el) => el === false);
}

const findValueAt = (index, arr) => {
    const arrLength = arr.length
    const indexOfZero = arr.findIndex(val => val === 0)
    index = (indexOfZero + index) % arrLength

    return arr[index]
}