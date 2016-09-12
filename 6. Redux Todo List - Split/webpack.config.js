var path = require('path');
var webpack = require('webpack');

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

module.exports = {
    devtool: '#eval-source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/index'
    ],
    debug: true,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: 'http://localhost:3000/dist/'
    },
    historyApiFallback: true,
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            __DEVTOOLS__: true,
            __SHOW_DEVTOOLS__: false
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: "style-loader!css-loader"},
            {test: /\.less$/, loader: "style-loader!css-loader!less-loader"},
            {test: /\.gif$/, loader: "url-loader?mimetype=image/png"},
            {test: /\.png$/, loader: "url-loader?mimetype=image/png"},
            {test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff"},
            {test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=[name].[ext]"},
            {
                test: /\.jsx?$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            }
        ]
    }
};
