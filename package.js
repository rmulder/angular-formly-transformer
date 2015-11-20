var client = 'client';

Package.describe({
    name: "wieldo:angular-formly-transformer",
    summary: "Automate configuration of fields in Angular-Formly",
    version: "1.2.0",

    documentation: 'README.md',
    git: 'https://github.com/wieldo/angular-formly-transformer.git'
});

Package.onUse(function (api) {

    var packages = {
        use: [
            'angular@1.0.0',
            'angular:angular@1.4.7',
            'underscore@1.0.4',
            'pbastowski:angular-babel@1.0.2',
            'pbastowski:angular2-now@0.3.13',
            'wieldo:angular-formly@7.3.2'
        ],
        imply: [
            'wieldo:angular-formly'
        ]
    };

    api.versionsFrom("METEOR@1.0");

    api.use(packages.use);

    api.imply(packages.imply);

    api.addFiles([
        'dist/formly-transformer.js'
    ], client);

});

Package.onTest(function(api) {
    api.use([
        'pbastowski:angular-babel@1.0.2',
        'pbastowski:angular2-now@0.3.13',
        'sanjo:jasmine@0.20.2',
        'velocity:helpers',
        'velocity:console-reporter',
        'angular:angular-mocks@1.4.7',
        'wieldo:angular-formly-transformer'
    ]);
    
    api.addFiles([
        'tests/client/formly-transformer-spec.js'
    ], client);
});