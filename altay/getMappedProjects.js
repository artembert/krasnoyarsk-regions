const fs = require("fs");
const projects = require("./projects");

const COST_DIVIDER = 1000000;

const mappedProjects = projects
	.map(item => ({
		name: item.fields.ia130,
		description: item.fields.ia158,
		municipal: `${item.fields.ia138}, ${item.fields.ia139}`,
		investor: item.fields.ia135,
		cost: getCost(item.fields.ia141),
	}));

console.log("Length:" + mappedProjects.length);
console.log(mappedProjects[3]);
fs.writeFile("altay-projects.json", JSON.stringify(mappedProjects), () => (console.log("successful")));

function getCost(cost) {
	return Math.floor(cost / COST_DIVIDER);
}
