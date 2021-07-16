const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	name: 'server',
	entry: {
		server: path.resolve(__dirname, 'server', 'server.ts')
	},
	mode: 'production',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	externals: [nodeExternals()],
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					'babel-loader',
					{
						loader: 'ts-loader',
						options: {
							module: 'esnext',
							target: 'esnext',
							configFile: 'tsconfig.server.json'
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: ['css-loader']
			}
		]
	},
	target: 'node',
	node: {
		__dirname: false,
		__filename: false
	},
	plugins: [
		new CopyPlugin({
			patterns: [{ context: 'server', from: 'views', to: 'views' }]
		}),
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1
		})
	]
};
