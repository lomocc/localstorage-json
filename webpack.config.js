var webpack = require('webpack');
var assign = require('object-assign');
var path = require('path');
var packageJson = require('./package.json');
function getConf(filename, conf) {
  var baseConf = {
    entry: './src/index.js',
    output: {
      path: path.resolve('dist/'),
      filename: filename,
      libraryTarget: 'umd'
    },
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }]
    }
  };
  return assign(baseConf, conf);
}
var es5Conf = getConf(`${packageJson.name}.js`, {
});
var es5MinConf = getConf(`${packageJson.name}.min.js`, {
  plugins:[new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  })]
});
module.exports = [es5Conf, es5MinConf];
