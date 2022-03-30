const program = require("commander");

const helpOptions = () => {
  //增加个人options
  program.option('-r --rain", "a rain cli');
  program.option(
    "-d --dest <dest>",
    "a destination folder,例如: -d /src/components"
  );
  program.on("--help", function () {
    console.log("");
    console.log("晨哥出品");
    console.log("必属精品");
  });
};

module.exports = helpOptions;
