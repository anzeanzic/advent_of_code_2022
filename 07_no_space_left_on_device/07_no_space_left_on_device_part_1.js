const fs = require("fs");
const readline = require("readline");

const input_path = "input.txt";
const filesystem = {};
let target = filesystem;
let isLSOutput = true;
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
	console.log(filesystem);
	console.log("---------------");
	GoIntoDir(filesystem['/']);
	console.log(filesystem);
	console.log("---------------");
	console.log(sum);
});

const GoIntoDir = (dir) => {
	let dirSum = 0;

	for (const key in dir) {
		if (key != 'files' && key != 'parent' && key != 'size') {
			dirSum = GoIntoDir(dir[key]);
			dir.size += dirSum;
		}
	}
	
	if (dir.size <= 100000) {
		sum += dir.size;
	}

	return dir.size;
};

const HandleLines = (line) => {
	// a command
	if (line[0] === '$') {
		isLSOutput = false;
		const line_arr = line.split(' ');
		const command = line_arr[1];

		switch (command) {
			case 'cd':
				const arg = line_arr[2];

				if (arg === '..') {
					target = target.parent;
				}
				else {
					CreateNewFolder(arg, target);
					target = target[arg];
				}
				break;
			case 'ls':
				isLSOutput = true;
				break;
		}
	}
	// output
	else if (isLSOutput) {
		const file_arr = line.split(' ');
		const filesize = file_arr[0];

		if (filesize === 'dir') {
			CreateNewFolder(file_arr[1], target);
		}
		else {
			target.files.push({ size: parseInt(file_arr[0]), name: file_arr[1] });
			target.size += parseInt(file_arr[0]);
		}
	}
};

const CreateNewFolder = (arg, parent) => {
	target[arg] = {
		files: [],
		parent: parent,
		size: 0
	};
};