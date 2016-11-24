var webpack = require("webpack");
module.exports = {
	entry: './js/main.js',
	output: {
		filename: './build/js/main.min.js'
	},
  module: {
    loaders: [
    {
     test: /\.js$/,
     loader: 'babel',
     query: {
      presets: ['es2015']
    }
  }, {
   test: /\.scss$/,
   loaders: ["style", "css", "sass?sourceMap"]
 },{
  test: /\.css$/,
  loaders: ["style", "css?"]  

},{
  test: /\.(eot|svg|ttf|woff|woff2)$/,
  loader: 'file?name=public/fonts/[name].[ext]'
}, {
 test: /\.(jpe?g|png)$/,
 loader: 'file'
}]	
},
devServer: {
   		// watch:true,
   		inline: true,
   		host: '0.0.0.0',
   		port: '3005',
   		watchOptions: {
   			aggregateTimeout: 300,
   			poll: true
   		}
   	}

   };