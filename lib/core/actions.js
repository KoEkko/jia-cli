const { promisify } = require("util");
const download = promisify(require("download-git-repo"));
const { VUE_REPO } = require("../config/repo");
const { execCommand } = require("../utils/exec-command");
const compilerEjs = require("../utils/compile-ejs");
const writeFile = require("../utils/file");
const { program } = require('commander')

async function createProjectAction(project) {
  // 1.从编写的项目模板中clone下来项目
  try {
    await download(VUE_REPO, project, { clone: true });

    // 创建项目后，给予提示
    // console.log(`cd ${project}`);
    // console.log(`pnpm install`);
    // console.log(`pnpm run dev`);

    // 帮助执行 npm install
    const commandName = process.platform === "win32" ? "npm.cmd" : "npm";
    await execCommand(commandName, ["install"], { cwd: `./${project}` });
    // 帮助执行 npm run dev
    await execCommand(commandName, ["run", "dev"], { cwd: `./${project}` });
  } catch (error) {
    console.log(`github连接失败,请稍后重试`);
  }
}

async function addComponentAction(cpnname) {
  const result = await compilerEjs("component.vue.ejs", {
    name: cpnname,
    lowername: cpnname.toLowerCase(),
  });
  
  // 将result 写入文件中
  try {
    const dest = program.opts().dest || "src/components"
    await writeFile(`${dest}/${cpnname}.vue`, result)
  } catch (error) {
    console.log(error);
  }
  console.log(`创建模板成功`);
}

module.exports = {
  createProjectAction,
  addComponentAction,
};
