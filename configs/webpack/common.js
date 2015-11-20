var path = require('path');

module.exports = {
    context: path.resolve(__dirname, '../../lib/client'),
    entry: './main.js',
    output: {
        libraryTarget: 'umd'
    },
    externals: {
        "angular": "angular",
        "angular2-now": "angular2now",
        "angular-formly": {
            root: 'ngFormly',
            amd: 'angular-formly',
            commonjs2: 'angular-formly',
            commonjs: 'angular-formly'
        }
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel",
                query: {stage: 0},
                exclude: /(tests|dist|node_modules|bower_components)/
            }
        ]
    }
};