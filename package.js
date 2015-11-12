var both = ['client', 'server'];
var client = 'client';
var server = 'server';

Package.describe({
    name: "wieldo:angular-formly-transformer",
    summary: "Automate configuration of fields in Angular-Formly",
    version: "1.0.0",

    documentation: 'README.md',
    git: 'https://github.com/wieldo/angular-formly-transformer.git'
});

Package.onUse(function (api) {

    var packages = {
        use: [
            'underscore@1.0.4',
            'es5-shim@4.1.13',
            'pbastowski:angular-babel@1.0.2',
            'pbastowski:angular2-now@0.3.13',
            'wieldo:angular-formly@7.3.2'
        ],
        imply: [
            'angular@1.0.0',
            'angular:angular@1.4.7',
            'wieldo:angular-formly@7.3.2'
        ]
    };

    api.versionsFrom("METEOR@1.0");

    api.use(packages.use);

    api.imply(packages.imply);

    api.addFiles([
        'lib/client/main.js',
        'lib/client/formly-transformer.js'
    ], client);

});

Package.onTest(function(api) {
    api.use([
        'sanjo:jasmine@0.20.2',
        'velocity:helpers',
        'velocity:html-reporter',
        'angular:angular-mocks@1.4.7',
        'wieldo:angular-formly-transformer@1.0.0'
    ]);
    
    api.addFiles([
        'tests/client/formly-transformer-spec.js'
    ], client);
});