//util内置模块中的方法，将回调的函数转成promise函数
const { promisify } = require("util");
//path模块
const path = require("path");

//从git拉取代码的模块
const download = promisify(require("download-git-repo"));
//打开浏览器方法
const open = require("open");

//模版git仓库
const { vueRepo } = require("../config/repo-config");
//终端子进程操作命令
const { commandSpawn } = require("../utils/terminal");
//指令操作文件目录过程，解析、写入
const { compile, writeToFile, createDirSync } = require("../utils/utils");

//一、创建项目指令执行内容
//callback -> promisify -> promise -> async await
const createProjectAction = async (project) => {
  console.log("rain helps you create your project~");

  //1、clone项目
  await download(vueRepo, project, { clone: true });

  //这里的cwd是执行node命令时的文件地址，也就是拉取后的目录地址
  //2、执行npm install
  const command = process.platform === "win32" ? "npm.cmd" : "npm";
  await commandSpawn(command, ["install"], { cwd: `./${project}` });

  //3、运行npm run serve
  commandSpawn(command, ["run", "serve"], { cwd: `./${project}` });

  //4、打开浏览器(默认打开8080)
  open("http://localhost:8080/");
};

//二、添加组件
const addComponentAction = async (name, dest) => {
  // 1.编译ejs模板 result
  const result = await compile("vue-component.ejs", {
    name,
    lowerName: name.toLowerCase(),
  });

  // 2.写入文件的操作
  const targetPath = path.resolve(dest, `${name}.vue`);
  console.log(targetPath);
  writeToFile(targetPath, result);
};

//三、添加页面和路由
const addPageAndRouteAction = async (name, dest) => {
  // 1.编译ejs模板
  const data = { name, lowerName: name.toLowerCase() };
  const pageResult = await compile("vue-component.ejs", data);
  const routeResult = await compile("vue-router.ejs", data);

  // 3.写入文件
  const targetDest = path.resolve(dest, name.toLowerCase());
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `${name}.vue`);
    const targetRoutePath = path.resolve(targetDest, "router.js");
    writeToFile(targetPagePath, pageResult);
    writeToFile(targetRoutePath, routeResult);
  }
};

//四、添加vuex模块
const addStoreAction = async (name, dest) => {
  // 1.遍历的过程
  const storeResult = await compile("vue-store.ejs", {});
  const typesResult = await compile("vue-types.ejs", {});

  // 2.创建文件
  const targetDest = path.resolve(dest, name.toLowerCase());
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `${name}.js`);
    const targetRoutePath = path.resolve(targetDest, "types.js");
    writeToFile(targetPagePath, storeResult);
    writeToFile(targetRoutePath, typesResult);
  }
};

module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAndRouteAction,
  addStoreAction,
};
