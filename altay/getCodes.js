const fs = require("fs");
const projectsCodes = require("./project-codes");

const codes = projectsCodes.map(item => item.code);

fs.writeFile("altay-codes.json", JSON.stringify(codes, null, 2), () => (console.log("successful")));
