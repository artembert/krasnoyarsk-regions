const fs = require("fs");
const projects = require("./projects_decode");
const types = require("./types");

const allowTypes = ["46", "48", "49", "52", "55", "57", "58", "60", "62"];
const filtered = projects
	.filter(item => allowTypes.includes(item.categoryId))
	.filter(item => item.props.hasOwnProperty("TOTAL_PLANDED_INVESTMENT_SIZE"))
	.filter(item => item.props.hasOwnProperty("PROJECT_START"))
	.map(item => ({
		title: item.title,
		invest: item.investAmount,
		geogwidth: item.geogwidth,
		geoglength: item.geoglength,
		categoryId: item.categoryId,
		categoryName: types[item.categoryId],
		start: item.props["PROJECT_START"].value,
		end: item.props["PROJECT_END"].value,
	}));
console.log(filtered[0]);

fs.writeFile("mappedProjects.json", JSON.stringify(filtered), () => (console.log("successful")));
