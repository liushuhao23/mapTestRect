/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-05-28 20:59:44
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-09-28 23:26:26
 */
const typography = require('@tailwindcss/typography');
module.exports = {
  content: ['./src/**/*.tsx', './src/**/*.html', './public/index.html'],
  darkMode: 'class',
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {},
  },
  plugins: [typography],
};
