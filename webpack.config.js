var path = require('path');

var APP_DIR = path.resolve(__dirname + '/app');
var BUILD_DIR = path.resolve(__dirname + '/build');

module.exports = {
	context: APP_DIR,

	entry: './App.js',

  resolve: {
    extensions: ['.js', '.jsx']
  },

  output: {
		path: BUILD_DIR,
    filename: 'bundle.js',
		publicPath: '/'
  },

	devtool: 'source-map',

	devServer: {
		inline: true,
		contentBase: BUILD_DIR,
		port: 3333
	},

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
				include: APP_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
}
