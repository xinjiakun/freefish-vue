module: {
	loaders: [{
		test: /\.js$/,
		exclude: /node_modules/,
		loader: 'babel-loader'

	}, {
		test: /\.mustache$/,
		loader: 'mustache'
	}, 
	{
		test: /\.css(\?.*)?$/,
	   
		loader: ExtractTextPlugin.extract('style', 'css?-minimize')
	},
	
	{
		test: /.scss$/,
		loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!sass-loader?sourceMap')
	}, {
		test: /\.(jpg|png|gif|eot|svg|ttf|woff(2)?)(\?.*)?$/,
		include: /\/(node_modules|libs|static)\//,
		loader: 'file',
	  
	}]
}