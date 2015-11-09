var both = ['client', 'server'];
var client = 'client';
var server = 'server';

Package.describe({
    name: "wieldo:angular-formly-transformer",
    summary: "Field configuration transformer for angular-formly",
    version: "0.0.1",

    documentation: 'README.md',
    git: 'https://github.com/kamilkisiela/angular-formly-transformer.git'
});

Package.onUse(function (api) {

    var packages = [
        'underscore@1.0.4',
        'es5-shim@4.1.14',
        'ecmascript@0.1.6',
        'angular@1.0.0',
        'pbastowski:angular2-now@0.3.13',
        'pbastowski:ecmascript-extras@0.0.2',
        'angular:angular@1.4.7'
    ];

    api.versionsFrom("METEOR@1.0");

    api.use(packages);

    api.imply(packages);

    api.addFiles([
        'lib/client/main.js'
    ], client);

});