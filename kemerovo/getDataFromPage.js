const list = [...document.querySelectorAll("body>li .block_hovered")];

const projects = list.map(project => ({
	title: project.querySelector(".reg").innerText,
	cost: project.querySelector(".row_block span").innerText
}));
console.log(JSON.stringify(projects));
