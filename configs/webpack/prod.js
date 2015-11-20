var webpack = require('webpack');

module.exports = {
    output: {
        filename: 'dist/formly-transformer.min.js'
    },
    devtool: 'source-map',
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false}
        })
    ]
};