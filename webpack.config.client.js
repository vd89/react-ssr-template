const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = {
	name: 'client',
	entry: {
		client: path.resolve(__dirname, 'client/client.tsx')
	},
	mode: 'production',
	output: {
		path: path.resolve(__dirname + '/dist/static'),
		filename: '[name].[contenthash].js',
		publicPath: ''
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							babelrc: true,
							plugins: ['react-hot-loader/babel']
						}
					},
					{
						loader: 'ts-loader',
						options: {
							compilerOptions: {
								module: 'esnext',
								target: 'esnext'
							},
							configFile: 'tsconfig.client.json'
						}
					}
				]
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					'style-loader',
					'css-loader',
					'less-loader',
					{
						loader: 'sass-loader',
						options: {
							implementation: require('sass')
						}
					}
				]
			}
		]
	},
	target: 'web',
	plugins: [
		new CleanWebpackPlugin(),
		new WebpackManifestPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	]
};
