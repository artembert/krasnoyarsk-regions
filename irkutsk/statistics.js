const list = require("./projects_decode");
const types = require("./types");
const typeEntries = list.reduce((accum, item) => {
		accum[item.categoryId] += 1;
		return accum;
	},
	{
		46: 0,
		47: 0,
		48: 0,
		49: 0,
		50: 0,
		51: 0,
		52: 0,
		53: 0,
		54: 0,
		55: 0,
		56: 0,
		57: 0,
		58: 0,
		59: 0,
		60: 0,
		61: 0,
		62: 0,
		63: 0,
		160: 0,
	});
const labels = Object.assign(
	{},
	...Object.keys(typeEntries).map(key => ({[types[key]]: typeEntries[key]}))
);
console.log(typeEntries);
console.log(labels);
