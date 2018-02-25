const path = require('path');

const context = path.resolve(__dirname, 'application');

module.exports = {
  plugins: [
    require('postcss-import')({ path: context }),
    require('postcss-cssnext'),
  ],
};
