const fs = require("fs");
const projectsCodes = require("./project-codes");

const codes = projectsCodes.map(item => item.code);

fs.writeFile("altay-codes.json", JSON.stringify(codes), () => (console.log("successful")));
