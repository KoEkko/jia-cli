const path = require("path");
const ejs = require('ejs')
function compilerEjs(tempName, data) {
  // 1.获取当前模板的路径
  const tempPath = `../template/${tempName}`;
  const absolutePath = path.resolve(__dirname, tempPath);
  // 2.使用ejs引擎编译模板
  return new Promise((resolve, reject) => {
    ejs.renderFile(absolutePath, data, (err, result) => {
      if (err) {
        console.log(`编译模板失败`, err);
        return;
      }
      resolve(result)
    });
  });
}

module.exports = compilerEjs;
