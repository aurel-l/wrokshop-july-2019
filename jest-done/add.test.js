const add = require("./add.js");

describe("Add function", () => {
  it("should add two numbers", () => {
    expect(add(10, 20)).toBe(30);
  });
});
