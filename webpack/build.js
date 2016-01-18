module.exports = function (type) {
    return {
        entry: './src/formly-transformer.js',
        output: output,
        loaders: loaders
    };

    function output() {
        return {
            filename: 'dist/formly-transformer' + (type === 'prod' ? '.min.js' : '.js'),
            libraryTarget: 'umd',
            library: 'formlyTransformer'
        }
    }

    function loaders() {
        return [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ];
    }
};
