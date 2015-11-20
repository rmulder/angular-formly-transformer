require('babel/register');
require('argv-set-env')();
var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');

module.exports = config();

function config() {
    var config;
    var configCommon = commonConfig();

    switch (process.env.NODE_ENV) {
        case 'development':
            config = _.merge(configCommon, devConfig());
            break;
        case 'production':
            config = _.merge(configCommon, prodConfig());
            break;
        case 'test':
            config = _.merge(configCommon, devConfig());
            break;
        default:
            throw new Error('NODE_ENV is invalid');
    }
    return config;
}

function commonConfig() {
    return {
        context: path.resolve(__dirname, 'lib/client'),
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
    }
}

function devConfig() {
    return {
        output: {
            filename: 'dist/formly-transformer.js'
        }
    }
}

function prodConfig() {
    return {
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
    }
}