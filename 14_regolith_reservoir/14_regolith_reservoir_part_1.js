const fs = require("fs");
const readline = require("readline");

const input_path = "input.txt";
const paths = [];
const limits = {
	min_x: Number.MAX_VALUE,
	max_x: Number.MIN_VALUE,
	min_y: 0,
	max_y: Number.MIN_VALUE
};
const Mesh = [];

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
	//console.log(paths);
	console.log(limits);

	PrepareMesh();
	PrintMesh();

	let i = 1;

	for (;i < 700; i++) {
		const cameToRest = DrawSand();

		if (!cameToRest) {
			console.log("break");
			break;
		}
	}

	PrintMesh();
	console.log(i - 1);
});

const HandleLines = (line) => {
	const line_arr = line.split('->');
	const path = [];
	
	line_arr.forEach((coordinate) => {
		const coor_arr = coordinate.split(',').map((el) => el = parseInt(el));

		if (coor_arr[0] > limits.max_x) {
			limits.max_x = coor_arr[0];
		}
		if (coor_arr[0] < limits.min_x) {
			limits.min_x = coor_arr[0];
		}
		if (coor_arr[1] > limits.max_y) {
			limits.max_y = coor_arr[1];
		}
		if (coor_arr[1] < limits.min_y) {
			limits.min_y = coor_arr[1];
		}

		path.push({ x: coor_arr[0], y: coor_arr[1] });
	});

	paths.push(path);
};

const PrepareMesh = () => {
	const mesh_length = limits.max_x - limits.min_x + 1;
	const mesh_height = limits.max_y - limits.min_y + 1;
	console.log(mesh_length, mesh_height);

	for (let i = 0; i < mesh_height; i++) {
		Mesh[i] = new Array(mesh_length).fill('.');
	}

	let start = null,
		end = null;

	paths.forEach((coor_arr) => {
		coor_arr.forEach((coor) => {
			if (start === null) {
				start = coor;
			}
			else {
				end = coor;
			}

			if (start !== null && end !== null) {
				if (start.x === end.x) {
					const y_start = start.y < end.y ? start.y : end.y;
					const y_end = start.y < end.y ? end.y : start.y;

					for (let i = y_start; i <= y_end; i++) {
						//console.log(start, end, start.x - limits.min_x, i);
						Mesh[i][start.x - limits.min_x] = '#';
					}
				}
				else {
					const x_start = start.x < end.x ? start.x : end.x;
					const x_end = start.x < end.x ? end.x : start.x;

					for (let i = x_start; i <= x_end; i++) {
						//console.log(start, end, i - limits.min_x, start.y);
						Mesh[start.y][i - limits.min_x] = '#';
					}
				}

				start = end;
				end = null;
			}
		});

		start = null;
		end = null;
	});
};

const PrintMesh = () => {
	for (let i = 0; i < Mesh.length; i++) {
		let str = '';

		for (let j = 0; j < Mesh[i].length; j++) {
			str += Mesh[i][j];
		}

		console.log(str);
	}
};

const DrawSand = () => {
	let cameToRest = false;
	const sand_coor = { x: 500 - limits.min_x, y: 0 };

	while (true) {
		if (sand_coor.y + 1 > limits.max_y) {
			cameToRest = false;
			break;
		}
		if (sand_coor.x - 1 < 0 || sand_coor.y > limits.max_y) {
			cameToRest = false;
			break;
		}
		if (sand_coor.x > limits.max_x - limits.min_y + 1 || sand_coor.y > limits.max_y) {
			cameToRest = false;
			break;
		}

		if (Mesh[sand_coor.y + 1][sand_coor.x] === '.') {
			sand_coor.y = sand_coor.y + 1;

			/*if (sand_coor.y > limits.max_y) {
				cameToRest = false;
				break;
			}*/
		}
		// try diagonally left
		else if (Mesh[sand_coor.y + 1][sand_coor.x - 1] === '.') {
			sand_coor.x = sand_coor.x - 1;
			sand_coor.y = sand_coor.y + 1;

			/*if (sand_coor.x - 1 < 0 || sand_coor.y > limits.max_y) {
				cameToRest = false;
				break;
			}*/
		}
		// try diagonally right
		else if (Mesh[sand_coor.y + 1][sand_coor.x + 1] === '.') {
			sand_coor.x = sand_coor.x + 1;
			sand_coor.y = sand_coor.y + 1;

			/*if (sand_coor.x > limits.max_x - limits.min_y + 1 || sand_coor.y > limits.max_y) {
				cameToRest = false;
				break;
			}*/
		}
		else {
			Mesh[sand_coor.y][sand_coor.x] = "o";
			cameToRest = true;
			break;
		}
	}

	return cameToRest;
};