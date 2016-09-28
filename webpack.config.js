const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
	src: path.resolve(__dirname, 'src'),
	dist: path.resolve(__dirname, 'dist')
};

module.exports = {
	entry: path.resolve(PATHS.src, 'js/main.js'),
	output: {
		path: PATHS.dist,
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass']
			},
			{
				test: /\.js$/,
				loader: 'babel'
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			template: path.resolve(PATHS.src, 'index.html')
		})
	]
}