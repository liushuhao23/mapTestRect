/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-05-28 20:59:44
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-06-13 14:58:04
 */
const typography = require('@tailwindcss/typography');
module.exports = {
  content: ['./src/**/*.tsx', './src/**/*.html', './public/index.html'],
  darkMode: 'class',
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        'dark-grey': 'rgb(157, 170, 194)'
      }
    },
  },
  plugins: [typography],
};
