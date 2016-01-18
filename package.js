Package.describe({
    name: 'wieldo:angular-formly-transformer',
    summary: 'Automate configuration of fields in Angular-Formly',
    version: '1.3.0',

    documentation: 'README.md',
    git: 'https://github.com/wieldo/angular-formly-transformer.git'
});

Npm.depends({
  'angular-formly-transformer': '1.3.0'
});

Package.onUse(function (api) {
    var packages = {
        use: [
            'angular:angular@1.4.0',
            'formly:angular-formly@7.3.9_3'
        ],
        imply: [
            'formly:angular-formly'
        ]
    };

    api.versionsFrom('METEOR@1.0');

    api.use(packages.use);
    api.imply(packages.imply);

    api.addFiles([
      '.npm/package/node_modules/angular-formly-transformer/dist/formly-transformer.js'
    ], 'client', {
      transpile: false
    });

});
