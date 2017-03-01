var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var APP_DIR = path.resolve(__dirname + '/app');
var BUILD_DIR = path.resolve(__dirname + '/lib/app/public');

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

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
				include: APP_DIR,
        use: [{
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015']
          }
        }]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
				include: APP_DIR + '/assets/styles/',
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { modules: false, sourceMaps: true } },
            { loader: 'sass-loader', options: { sourceMaps: true } }
          ],
          publicPath: '/'
        })
      },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader?name=/images/[name].[ext]' }
    ]
  },

  plugins: [
    new ExtractTextPlugin({ filename: '/styles.css', allChunks: true })
  ]

};
