/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-07-08 17:16:52
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-24 22:31:38
 */
const toml = require('toml');
const paths = require('path')
const concat = require('concat-stream');
const fs = require('fs');
const prettier = require('prettier')
const preConfig = require(paths.join(__dirname, '../../.prettierrc.js'))
let appData;

fs.createReadStream(`${process.cwd()}/default.toml`, 'utf8').pipe(
  concat(function (data) {
    appData = toml.parse(data);
    const micro_apps = appData?.mock?.micro_apps;
    if (micro_apps && Array.isArray(micro_apps) && micro_apps.length) {
      const infoDta = `const info = {
          appDataInfo: ${JSON.stringify(micro_apps)}
        } \r export default info`;
      dealFile(infoDta);
    }
  })
);

const dealFile = micro_apps => {
  fs.writeFile(`${process.cwd()}/config/appDataInfo.js`, prettier.format(micro_apps, {...preConfig}), function (err) {
    if (err) {
      console.log(err, 'err');
    }
  });
};
module.exports = appData;
