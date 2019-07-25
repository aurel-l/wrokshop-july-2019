const fs = require("fs");
const process = require("process");
const { promisify } = require("util");

const faker = require("faker");

asyncWriteFile = promisify(fs.writeFile);

const main = async (num, filename) => {
  // will contain the whole file as a string
  let content = "first_name,last_name,id";
  for (let i = 0; i < num; i++) {
    // concatenate all the rows
    content +=
      "\n" + faker.fake("{{name.firstName}},{{name.lastName}},{{random.uuid}}");
  }
  // wait for the whole file to be written in one go
  await asyncWriteFile(filename, content, { encoding: "utf8", flag: "w+" });
};

let [, , num, file] = process.argv;
num = +num;

if (!Number.isInteger(num)) {
  throw new Error(`'${process.argv[2]}' is not an integer`);
}

console.log(`writing ${num} rows of data in ${file}`);

main(num, file).then(
  () => console.log("finished"),
  error => console.error(error)
);
