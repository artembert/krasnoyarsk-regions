import projects from "./projects.json"
import projectsPoints from "./projects-points.json"
import WriteFiles from "../utils/write-files";
import {InvestProject} from "../models/investProject";

const COST_DIVIDER = 1000000;

const mappedProjects: InvestProject[] = projects
  .map(item => {
    const id = item.ID;
    return {
      name: getValueFromArray(item.Tabs[0].Areas[0].Properties, "Наименование"),
      description: getValueFromArray(
        item.Tabs[0].Areas[0].Properties, "Описание"),
      municipal: getValueFromArray(
        item.Tabs[0].Areas[0].Properties, "Муниципальное образование"),
      type: getValueFromArray(
        item.Tabs[0].Areas[1].Properties, "Вид экономической деятельности"),
      start: getValueFromArray(
        item.Tabs[0].Areas[1].Properties, "Начало реализации проекта"),
      end: getValueFromArray(
        item.Tabs[0].Areas[1].Properties, "Планируемый срок окончания"),
      investor: getValueFromArray(
        item.Tabs[0].Areas[1].Properties, "Компании инвесторы"),
      cost: getCost(getValueFromArray(
        item.Tabs[0].Areas[1].Properties, "Запланированный объем инвестиций (руб)")),
      id,
      x: getCoordinates(id)[0],
      y: getCoordinates(id)[1],
      crs: "EPSG:4326"
    }
  })
  .filter(item => item.cost);

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
   const industry = projectsPoints
    .find(industry => industry.Objects
      .find(project => project.ID === id));
  return industry.Objects
     .find(item => item.ID === id).Disposition.coordinates;
}
