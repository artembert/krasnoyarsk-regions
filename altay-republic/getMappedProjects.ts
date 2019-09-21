import projects from "./projects.json"
import projectsPoints from "./projects-points.json"
import WriteFiles from "../utils/write-files";
import {InvestProject} from "../models/investProject";

const COST_DIVIDER = 1000000;

const mappedProjects: InvestProject[] = projects
  .map(item => item.Tabs[0])
  .map(item => {
    return {
      name: getValueFromArray(item.Areas[0].Properties, "Наименование"),
      description: getValueFromArray(item.Areas[0].Properties, "Описание"),
      municipal: getValueFromArray(item.Areas[0].Properties, "Муниципальное образование"),
      type: getValueFromArray(item.Areas[1].Properties, "Вид экономической деятельности"),
      start: getValueFromArray(item.Areas[1].Properties, "Начало реализации проекта"),
      end: getValueFromArray(item.Areas[1].Properties, "Планируемый срок окончания"),
      investor: getValueFromArray(item.Areas[1].Properties, "Компании инвесторы"),
      cost: getCost(getValueFromArray(item.Areas[1].Properties, "Запланированный объем инвестиций (руб)")),
    }
  });
  // .filter(item => item.cost);

console.log("Length:" + mappedProjects.length);
console.log(mappedProjects[3]);

WriteFiles.writeJSONAndSCV("altay-republic-projects", mappedProjects);

function getValueFromArray(array, key) {
	const property = array.find(prop => prop.Key === key);
	return property ? property.Value.trim() : "";
}

function getCost(cost) {
	return Math.floor(+cost.substr(0, cost.length - 3) / COST_DIVIDER);
}

function getCoordinates(id: number): object {
  return projectsPoints
    .filter(industry => industry.Objects
      .filter(project => project.ID === id))
}
