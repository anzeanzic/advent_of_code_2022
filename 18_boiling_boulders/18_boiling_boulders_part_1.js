const fs = require("fs");
const readline = require("readline");

const input_path = "input_test.txt";
const cubes = [];
const cubesSet = new Set();

const inputStream = fs.createReadStream(input_path);
const lineReader = readline.createInterface({
	input: inputStream,
	terminal: false,
});


lineReader.on("line", function (line) {
	HandleLines(line);
});
lineReader.on('close', function() {
	ScanCubes();
});

const HandleLines = (line) => {
	const line_arr = line.split(',');
	const x = parseInt(line_arr[0]);
	const y = parseInt(line_arr[1]);
	const z = parseInt(line_arr[2]);
	
	cubes.push({ x: x, y: y, z: z });
	cubesSet.add(line);
};

const ScanCubes = () => {
	let surfaceArea = 0;

	// check all sides
	cubes.forEach((coor) => {
		if (!cubesSet.has([coor.x + 1, coor.y, coor.z ].toString())) {
			surfaceArea += 1;
		}
		if (!cubesSet.has([coor.x - 1, coor.y, coor.z].toString())) {
			surfaceArea += 1;
		}
		if (!cubesSet.has([coor.x, coor.y + 1, coor.z].toString())) {
			surfaceArea += 1;
		}
		if (!cubesSet.has([coor.x, coor.y - 1, coor.z].toString())) {
			surfaceArea += 1;
		}
		if (!cubesSet.has([coor.x, coor.y, coor.z + 1].toString())) {
			surfaceArea += 1;
		}
		if (!cubesSet.has([coor.x, coor.y, coor.z - 1].toString())) {
			surfaceArea += 1;
		}
	});

	console.log(surfaceArea);
};