const fs = require("fs");
const readline = require("readline");

const input_path = "input_test.txt";
const sensors = [];
const sensorMesh = [];
const limits = {
	x_min: Number.MAX_VALUE,
	x_max: Number.MIN_VALUE,
	y_min: Number.MAX_VALUE,
	y_max: Number.MIN_VALUE
}

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
	console.log(sensors);
	CreateSensorMesh();
	PrintMesh();
});

const HandleLines = (line) => {
	const line_arr = line.split(' ');
	const sx = parseInt(line_arr[2].split('=')[1]);
	const sy = parseInt(line_arr[3].split('=')[1]);
	const bx = parseInt(line_arr[8].split('=')[1]);
	const by = parseInt(line_arr[9].split('=')[1]);

	const sensor = {
		sx: sx,
		sy: sy,
		bx: bx,
		by: by
	};
	sensors.push(sensor);

	if (sx < limits.x_min) {
		limits.x_min = sx;
	}
	if (bx < limits.x_min) {
		limits.x_min = bx;
	}
	if (sx > limits.x_max) {
		limits.x_max = sx;
	}
	if (bx > limits.x_max) {
		limits.x_max = bx;
	}
	if (sy < limits.y_min) {
		limits.y_min = sy;
	}
	if (by < limits.y_min) {
		limits.y_min = by;
	}
	if (sy > limits.y_max) {
		limits.y_max = sy;
	}
	if (by > limits.y_max) {
		limits.y_max = by;
	}
};

const CreateSensorMesh = () => {
	for (let i = limits.y_min; i <= limits.y_max; i++) {
		sensorMesh[i] = new Array(limits.x_max - limits.x_min + 1).fill('.');
	}

	sensors.forEach((sensor) => {
		sensorMesh[sensor.sy][sensor.sx] = 'S';
		sensorMesh[sensor.by][sensor.bx] = 'B';
	});
};

const PrintMesh = () => {
	for (let i = 0; i < sensorMesh.length; i++) {
		let str = '';

		for (let j = 0; j < sensorMesh[i].length; j++) {
			str += sensorMesh[i][j];
		}

		console.log(str);
	}
};