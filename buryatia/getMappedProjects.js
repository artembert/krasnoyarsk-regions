const fs = require("fs");
const projects = require("./projects");

const LOCATION_PREFIX = "Республика Бурятия, ";

const commonArray = [].concat(...projects.map(item => item.features));

const mappedProjects = commonArray
	.map(item => item.attributes)
	.map(item => ({
		name: item.upname,
		description: item.manager,
		municipal: getLocation(item.resume),
		type: item.status,
		cost: item.cost,
	}));

console.log("Length:" + mappedProjects.length);
console.log(mappedProjects[2]);
fs.writeFile("buryatia-projects.json", JSON.stringify(mappedProjects, null, 2), () => (console.log("successful")));

function getLocation(address) {
	if (address && address.includes(LOCATION_PREFIX)) {
		return address.substring(LOCATION_PREFIX.length - 1).trim();
	}
	return address;
}
