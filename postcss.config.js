const path = require('path');

const context = path.resolve(__dirname, 'src');

module.exports = {
  plugins: [
    require('postcss-import')({ path: context }),
    require('postcss-cssnext'),
    require('postcss-inline-svg'),
  ],
};
