import {InvestProject} from "../models/investProject";
import projects from "./projects_decode.json"
import types from "./types.json"
import WriteFiles from "../utils/write-files";

interface IrkutskProject extends InvestProject {
  categoryId: number
}

const allowTypes = [46, 48, 49, 52, 55, 57, 58, 60, 62];
const mappedProjects: InvestProject[] = projects
  .map(item => ({
    name: item.title,
    cost_mln: getCost(item.investAmount),
    x: +item.geoglength,
    y: +item.geogwidth,
    categoryId: +item.categoryId,
    categoryName: types[item.categoryId],
    start: item.props["PROJECT_START"] ? item.props["PROJECT_START"].value : "",
    end: item.props["PROJECT_END"] ? item.props["PROJECT_END"].value : "",
    crs: "EPSG:4326",
  }))
  .filter((item: IrkutskProject) => allowTypes.includes(item.categoryId) && item.cost_mln);

console.log("Length:" + mappedProjects.length);
console.log(mappedProjects[2]);

WriteFiles.writeJSONAndSCV("irkutsk-projects", mappedProjects);

function getCost(costString: string): number {
  return +costString.replace(",", ".");
}
