import WriteFiles from "../utils/write-files";

const projects = require("./projects");

const COST_DIVIDER = 1000000;

const mappedProjects = projects
	.map(item => ({
		name: item.fields.ia130,
		description: item.fields.ia158,
		municipal: `${item.fields.ia138}, ${item.fields.ia139}`,
		investor: item.fields.ia135,
		cost: getCost(item.fields.ia141),
		start: item.fields.ia152,
		end: item.fields.ia153,
		x: item.geom.coordinates[0],
		y: item.geom.coordinates[1],
	}));

WriteFiles.writeJSONAndSCV("altay-projects", mappedProjects);

function getCost(cost) {
	return Math.floor(cost / COST_DIVIDER);
}
