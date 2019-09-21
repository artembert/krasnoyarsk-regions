import {InvestProject} from "../models/investProject";
import projects from "./projects.json"
import WriteFiles from "../utils/write-files";

const LOCATION_PREFIX = "Республика Бурятия, ";

const commonArray = [].concat(...projects.map(item => item.features));

const mappedProjects: InvestProject[] = commonArray
	.map(item => ({
		name: item.attributes.upname,
		description: item.attributes.manager,
		municipal: getLocation(item.attributes.resume),
		type: item.attributes.status,
		cost_mln: "",
    cost_string: item.attributes.cost,
    x: item.geometry.x,
    y: item.geometry.y,
    crs: "3857"
	}));

console.log("Length:" + mappedProjects.length);
console.log(mappedProjects[2]);

WriteFiles.writeJSONAndSCV("buryatia-projects", mappedProjects);

function getLocation(address) {
	if (address && address.includes(LOCATION_PREFIX)) {
		return address.substring(LOCATION_PREFIX.length - 1).trim();
	}
	return address;
}
