const fs = require("fs");
const projects = require("./projects");

const COST_DIVIDER = 1000000;

const mappedProjects = projects
	.map(item => item.Tabs[0])
	.map(item => ({
		name: getValueFromArray(item.Areas[0].Properties, "Наименование"),
		description: getValueFromArray(item.Areas[0].Properties, "Описание"),
		municipal: getValueFromArray(item.Areas[0].Properties, "Муниципальное образование"),
		type: getValueFromArray(item.Areas[1].Properties, "Вид экономической деятельности"),
		start: getValueFromArray(item.Areas[1].Properties, "Начало реализации проекта"),
		end: getValueFromArray(item.Areas[1].Properties, "Планируемый срок окончания"),
		investor: getValueFromArray(item.Areas[1].Properties, "Компании инвесторы"),
		cost: getCost(getValueFromArray(item.Areas[1].Properties, "Запланированный объем инвестиций (руб)")),
	}))
	.filter(item => item.cost);

console.log("Length:" + mappedProjects.length);
console.log(mappedProjects[3]);
fs.writeFile("tyva-projects.json", JSON.stringify(mappedProjects), () => (console.log("successful")));

function getValueFromArray(array, key) {
	const property = array.find(prop => prop.Key === key);
	return property ? property.Value.trim() : "";
}

function getCost(cost) {
	return Math.floor(+cost.substr(0, cost.length - 3) / COST_DIVIDER);
}
