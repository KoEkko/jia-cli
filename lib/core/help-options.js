const { program } = require('commander')

function helpOptions() {
  // 处理 --version 的操作
  const version = require("../../package.json").version;
  program.version(version, "-v --version");

  // 增强其他的options的操作
  program.option("-d --dest <dest>", "a destination folder");

}

module.exports = helpOptions