require('angular');
const {SetModule} = require('angular2-now');

// set module
SetModule('formlyTransformer', [require('angular-formly')]);

// load service
require('./formly-transformer');
