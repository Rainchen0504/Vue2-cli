const program = require("commander");

const {
  createProjectAction,
  addComponentAction,
  addPageAndRouteAction,
  addStoreAction,
} = require("./actions");

const createCommands = () => {
  //create指令
  program
    .command("create <project> [others...]")
    .description("clone a repository into a folder")
    .action(createProjectAction);

  //创建组件指令
  program
    .command("addcpn <name>")
    .description(
      "add vue component, 例如: rain addcpn HelloWorld [-d src/components]"
    )
    .action((name) => {
      addComponentAction(name, program.dest || "src/components");
    });

  //创建页面组件
  program
    .command("addpage <page>")
    .description(
      "add vue page and router config, 例如: rain addpage Home [-d src/pages]"
    )
    .action((page) => {
      addPageAndRouteAction(page, program.dest || "src/pages");
    });

  //创建store组件
  program
    .command("addstore <store>")
    .description("add vue store, 例如: rain addstore favor [-d dest]")
    .action((store) => {
      addStoreAction(store, program.dest || "src/store/modules");
    });
};

module.exports = createCommands;
