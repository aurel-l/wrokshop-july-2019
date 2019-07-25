const fs = require("fs");
const process = require("process");
const readline = require("readline");
const { promisify } = require("util");

const main = async fileReadStream => {
  const lineReader = readline.createInterface({
    input: fileReadStream
  });

  let headers;
  let rows = [];
  const firstNames = new Set();
  let getter;

  lineReader.on("line", line => {
    const row = line
      .trim()
      .split(",")
      .map(cell => cell.trim() || null);
    if (!headers) {
      headers = row;
      getter = (header, row) => {
        const index = headers.indexOf(header);
        if (index === -1)
          throw new Error(`'${header}' is not a valid header name`);
        return row[index];
      };
    } else {
      firstNames.add(getter("first_name", row));
    }
  });
  await new Promise(res => {
    lineReader.on("close", res);
  });

  console.log(`${firstNames.size} unique first names in the data set`);
};

const [, , filename] = process.argv;

const fileReadStream = fs.createReadStream(filename, { encoding: "utf8" });

main(fileReadStream).then(
  () => console.log("finished"),
  error => console.error(error)
);
