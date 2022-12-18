const fs = require("fs");
const readline = require("readline");

const input_path = "input_test.txt";
const cubes = [];
const cubesSet = new Set();
const visited = new Set();
const toVisit = [];

const limits = {
	min_x: Number.MAX_VALUE,
	max_x: Number.MIN_VALUE,
	min_y: Number.MAX_VALUE,
	max_y: Number.MIN_VALUE,
	min_z: Number.MAX_VALUE,
	max_z: Number.MIN_VALUE
};

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
	
	cubes.push([x, y, z ]);
	cubesSet.add([x, y, z ].toString());
};

const ScanCubes = () => {
	let minCoor = cubes.reduce((accu, curr) => [ Math.min(accu[0], curr[0]), Math.min(accu[1], curr[1]), Math.min(accu[2], curr[2])], cubes[0]);
	let maxCoor = cubes.reduce((accu, curr) => [ Math.max(accu[0], curr[0]), Math.max(accu[1], curr[1]), Math.max(accu[2], curr[2])], cubes[0]);

	minCoor = minCoor.map((axis) => axis - 1);
	maxCoor = maxCoor.map((axis) => axis + 1);
	
	console.log(minCoor, maxCoor);
	
	toVisit.push(minCoor);
	let surfaceArea = 0;

	/*while (toVisit.length > 0) {
		const currentNode = toVisit.shift();

		if (!visited.has(currentNode.toString())) {
			console.log(currentNode)
			const neighbours = GetAllNeighbours(currentNode).filter((cn) => CoorInBounds(cn, minCoor, maxCoor));

			neighbours.forEach((el) => {
				if (cubesSet.has(el.toString())) {
					surfaceArea++;
				}
				else {
					toVisit.push(el);
				}
			});

			visited.add(currentNode.toString());
		}
	}*/
	let outside = new Set();

	while (toVisit.length > 0) {
		const currentNode = toVisit.shift();
		outside.add(currentNode);

		const neighbours = GetAllNeighbours(currentNode)
			.filter((cn) => CoorInBounds(cn, minCoor, maxCoor))
			.filter((cn) => !visited.has(cn.toString()))
			.filter(cn => visited.add(cn.toString()))
			.filter(cn => !cubesSet.has(cn.toString()))

		neighbours.forEach((el) => {
			toVisit.push(el)
		});

		console.log(neighbours);
		break;

		visited.add(currentNode.toString());
	}

	console.log(outside.size)
	console.log(surfaceArea);
};

const GetAllNeighbours = (coor) => {
	return [
		[coor[0] + 1, coor[1], coor[2]],
		[coor[0] - 1, coor[1], coor[2]],
		[coor[0], coor[1] + 1, coor[2]],
		[coor[0], coor[1] - 1, coor[2]],
		[coor[0], coor[1], coor[2] + 1],
		[coor[0], coor[1], coor[2] - 1]
	];
};

const CoorInBounds = (coor, min, max) => {
	return coor[0] >= min[0] - 1 && coor[0] <= max[0] + 1 && coor[1] >= min[1] - 1 && coor[1] <= max[1] + 1 && coor[2] >= min[2] - 1 && coor[2] <= min[2] + 1;
};