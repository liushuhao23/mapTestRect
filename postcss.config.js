/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-06-07 09:27:08
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-07-05 14:09:55
 */
module.exports = {
    plugins: [
      'postcss-import',
      'tailwindcss/nesting',
      'tailwindcss',
      'postcss-flexbugs-fixes',
      [
        'postcss-preset-env',
        {
          autoprefixer: {
            flexbox: 'no-2009',
          },
          // features: {
          //   'nesting-rules': true,
          // },
          stage: 3,
        },
      ],
    ],
  };
  