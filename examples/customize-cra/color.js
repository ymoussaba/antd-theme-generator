const path = require('path');
const fs = require('fs');
// const { generateTheme, getLessVars } = require('../../index');
const { generateTheme, getLessVars } = require('antd-theme-generator');

const themeVariables = getLessVars(path.join(__dirname, './src/styles/vars.less'))
const defaultVars = getLessVars('./node_modules/antd/lib/style/themes/default.less')
const darkVars = { ...getLessVars('./node_modules/antd/lib/style/themes/dark.less'), '@primary-color': defaultVars['@primary-color'] };
const lightVars = { ...getLessVars('./node_modules/antd/lib/style/themes/compact.less'), '@primary-color': defaultVars['@primary-color'] };
fs.writeFileSync('./src/dark.json', JSON.stringify(darkVars));
fs.writeFileSync('./src/light.json', JSON.stringify(lightVars));
fs.writeFileSync('./src/theme.json', JSON.stringify(themeVariables));


const options = {
  stylesDir: path.join(__dirname, './src'),
  antDir: path.join(__dirname, './node_modules/antd'),
  varFile: path.join(__dirname, './src/styles/vars.less'),
  mainLessFile: path.join(__dirname, './src/styles/main.less'),
  themeVariables: Array.from(new Set([
    ...Object.keys(darkVars),
    ...Object.keys(lightVars),
    ...Object.keys(themeVariables),
  ])),
  indexFileName: 'index.html',
  outputFilePath: path.join(__dirname, './public/color.less'),
  customColorRegexArray: [/^fade\(.*\)$/]
}

generateTheme(options).then(less => {
  console.log('Theme generated successfully');
})
  .catch(error => {
    console.log('Error', error);
  });