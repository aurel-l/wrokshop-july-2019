const fs = require("fs");
const process = require("process");

const faker = require("faker");

const rowGenerator = function*(num) {
  for (let i = 0; i < num; i++) {
    yield faker.fake("{{name.firstName}},{{name.lastName}},{{random.uuid}}");
  }
};

const main = async (num, fileWriteStream) => {
  fileWriteStream.write("first_name,last_name,id");
  for (const row of rowGenerator(num)) {
    // write a chunk of data to the stream
    const canGoOn = fileWriteStream.write("\n" + row);
    if (!canGoOn) {
      // wait for the stream to be available again
      await new Promise(res => {
        fileWriteStream.once("drain", res);
      });
    }
  }
};

let [, , num, file] = process.argv;
num = +num;

if (!Number.isInteger(num)) {
  throw new Error(`'${process.argv[2]}' is not an integer`);
}

const fileWriteStream = fs.createWriteStream(file, {
  flags: "w+",
  encoding: "utf8"
});

console.log(`writing ${num} rows of data in ${file}`);

main(num, fileWriteStream)
  .then(() => console.log("finished"), error => console.error(error))
  .then(() => fileWriteStream.close());
