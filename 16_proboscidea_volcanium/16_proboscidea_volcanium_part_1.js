const fs = require("fs");
const readline = require("readline");

const input_path = "input_test.txt";

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
	
});

const HandleLines = (line) => {
	const line_arr = line.split(' ');
	const valveName = line_arr[1];
	const rate = parseInt(line_arr[4].split('=')[1]);
	
	const valves_arr = line.split('to valve').map((el) => el.replace('s', '').trim());
	const valves = valves_arr[1].split(',');

	console.log(valveName, rate, valves);
};

const BFS = () => {
	let graph;
	const nodes = 10;
	let visited = new Array(nodes);
};

const createGraph = (nodes) => {
	graph = new Array(nodes);
	
	for (let i = 0; i < graph.length; i++) {
		graph[i] = new Array(nodes);
	}
	for (let i = 0; i < graph.length; i++) {
		for (let j = 0; j < graph[i].length; j++) {
			graph[i][j] = 0;
		}
	}
};