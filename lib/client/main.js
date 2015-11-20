require('angular');
require('angular-formly');
angular2now = require('angular2-now');

const {SetModule} = require('angular2-now');
SetModule('formlyTransformer', ['formly']);

require('./formly-transformer');
