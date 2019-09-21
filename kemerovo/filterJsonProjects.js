const fs = require("fs");
const projects = require("./geojson.json");
const COST_DIVIDER = 1000000;

const filteredProjects = projects.features
	.map(project => ({
		name: project.properties.name,
		type: project.properties.branch_id,
		cost: getCost(project.properties.need_for_investment),
		description: project.properties.description,
		address: project.properties.address,
		production: project.properties.production,
		start: getDate(project.properties.c_at),
		end: getDate(project.properties.u_at),
	}))
	.filter(project => project.cost);

console.log("Length:" + filteredProjects.length);
console.log(filteredProjects[6]);
fs.writeFile("kemerovo-projects-all.json", JSON.stringify(filteredProjects, null, 2), () => (console.log("successful")));


function getDate(date) {
	if (date) {
		return new Date(date).getFullYear()
	} else {
		return ""
	}
}

function getCost(roubles) {
	return Math.floor(roubles / COST_DIVIDER);
}
