require('babel/register');
require('argv-set-env')();
var _ = require('lodash');

module.exports = config();

function config() {
    var config;
    var configCommon = require('./configs/webpack/common');

    switch (process.env.NODE_ENV) {
        case 'development':
            config = _.merge(configCommon, require('./configs/webpack/dist'));
            break;
        case 'production':
            config = _.merge(configCommon, require('./configs/webpack/prod'));
            break;
        case 'test':
            config = _.merge(configCommon, require('./configs/webpack/dist'));
            break;
        default:
            throw new Error('NODE_ENV is invalid');
    }
    return config;
}