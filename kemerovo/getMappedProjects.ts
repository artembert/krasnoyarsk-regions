import {InvestProject} from "../models/investProject";
import projects from "./projects.json"
import WriteFiles from "../utils/write-files";

const COST_DIVIDER = 1000000;
const allowTypes = [
  "Добыча полезных ископаемых",
  "Транспорт и связь",
  "Строительство"
];

const mappedProjects: InvestProject[] = projects
	.map(item => ({
		name: item.clusterCaption,
		description: item.balloonContent,
		municipal: item.properties.address,
    start: "",
		type: item.properties.branch_id[0],
		cost_mln: getCost(item.properties.total_cost),
    x: item.geometry.coordinates[0],
    y: item.geometry.coordinates[1],
    crs: "",
	}))
  .filter(item => item.cost_mln && allowTypes.includes(item.type));

console.log("Length:" + mappedProjects.length);
console.log(mappedProjects[2]);

WriteFiles.writeJSONAndSCV("kemerovo-projects", mappedProjects);

function getCost(cost): number {
  return cost ? Math.floor(+cost / COST_DIVIDER) : 0;
}
