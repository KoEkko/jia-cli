#!/usr/bin/env node
// 告知操作系统这个JS文件由usr的环境变量中的node 来执行

const { program } = require("commander");
const helpOptions = require("./core/help-options");
const { createProjectAction, addComponentAction } = require("./core/actions");

// 配置所有的options
helpOptions();

// 增加具体的功能
program
  .command("create <project> [...others]")
  .description("create vue project into a folder")
  .action(createProjectAction);

program
  .command("addcpn <cpnname> [...others]")
  .description("add vue component into a folder")
  .action(addComponentAction);
// 让commander 解析process.argv参数
program.parse(process.argv);

// 获取命令行额外传递的参数
// console.log(program.opts().dest);
