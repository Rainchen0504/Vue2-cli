/**
 * 执行终端命令代码
 */

//开启子进程
const { spawn } = require("child_process");

// npm install
const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args);
    //显示子进程输出流
    //保准输出流
    childProcess.stdout.pipe(process.stdout);
    //标准错误流
    childProcess.stderr.pipe(process.stderr);
    childProcess.on("close", () => {
      resolve();
    });
  });
};

module.exports = {
  commandSpawn,
};
