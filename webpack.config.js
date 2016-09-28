const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
	src: path.resolve(__dirname, 'src'),
	dist: path.resolve(__dirname, 'dist')
};

module.exports = {
	entry: path.resolve(PATHS.src, 'js/main.js'),
	output: {
		path: PATHS.dist,
		filename: 'bundle.[hash].js'
	},
	module: {
		loaders: [
			{
				test: /\.(css|scss)$/,
				loader: ExtractTextPlugin.extract(['css', 'sass'])
			},
			{
				test: /\.js$/,
				loader: 'babel'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(PATHS.src, 'index.html')
		}),
		new ExtractTextPlugin('style.[hash].css'),
		new CopyWebpackPlugin([{
			from: path.resolve(PATHS.src, 'assets'), 
			to: path.resolve(PATHS.dist, 'assets')
		}])
	]
}