const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PATHS = {
	src: path.resolve(__dirname, 'src'),
	docs: path.resolve(__dirname, 'docs')
};

module.exports = {
	mode: 'development',
	entry: path.resolve(PATHS.src, 'js/main.js'),
	devServer: {
		contentBase: './docs',
	},
	module: {
		rules: [
			{
				test: /\.(css|s[ac]ss)$/i,
				use: [
					// Creates `style` nodes from JS strings
					"style-loader",
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader",
				  ]
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
				loader: "babel-loader",
				options: {
					presets: ['@babel/preset-env']
				}
				}
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
				  {
					loader: 'file-loader',
				  },
				],
			},
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(PATHS.src, 'index.html')
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(PATHS.src, 'assets'), 
					to: path.resolve(PATHS.docs, 'assets')
				},
				{
					from: "src/CNAME"
				}
			],
		}),
	],
	output: {
		path: PATHS.docs,
		filename: 'bundle.[fullhash].js'
	},
}