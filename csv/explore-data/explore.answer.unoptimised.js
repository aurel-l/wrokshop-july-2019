const fs = require("fs");
const process = require("process");
const { promisify } = require("util");

const asyncReadFile = promisify(fs.readFile);

const main = async filename => {
  const content = await asyncReadFile(filename, { encoding: "utf8" });
  const [headers, ...rows] = content
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => line.split(",").map(cell => cell.trim() || null));

  const getter = (header, row) => {
    const index = headers.indexOf(header);
    if (index === -1) throw new Error(`'${header}' is not a valid header name`);
    return row[index];
  };

  const firstNames = new Set(rows.map(row => getter("first_name", row)));
  console.log(`${firstNames.size} unique first names in the data set`);
};

const [, , filename] = process.argv;

main(filename).then(
  () => console.log("finished"),
  error => console.error(error)
);
