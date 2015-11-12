FormlyTransformer [![Build Status](https://travis-ci.org/wieldo/angular-formly-transformer.svg)](https://travis-ci.org/wieldo/angular-formly-transformer)
==========

Better way of field transformation in [Angular-Formly].

## Install

```
meteor add wieldo:angular-formly-transformer
```


## Getting Started

1. Add package using `meteor add` (see above)
2. Add angular-formly files to your project
3. Add the following dependencies to your AngularJS module:

```javascript
angular.module('myApp', [
    'formly',
    'formlyTransformer'
  ])
```

## How to use it

### Register transformer

Each transformer has four arguments: fields, model, formOptions, and form.

See fieldTransform in [formlyConfig] for details.

Transformer is basically the same as fieldTransform method.
formlyTransform service just wraps all functions into one place.

```javascript
formlyTransformer.register(function(fields, model, form, formOptions) {
    // ...
});
```

### Special space in formly field configuration (formlyconfig)

formlyTransformer creates property with "transformers" key and empty object as value.

Special space is removed after all the transformers are executed.

So basically, you can put there all your transformation methods which are based on custom property.

## Example

```javascript
angular.module('myAppName', [
    'formly',
    'formlyTransformer'
  ])
  .run(runApp)
  .controller('demoCtrl', demoCtrl);
  
  function runApp(formlyTransformer) {
        // label upperCaseLabel transformer
        formlyTransformer.register(function(fields) {
            fields.forEach((field) => {
                if(field.transformers.upperCaseLabel && field.templateOptions && field.templateOptions.label) {
                    field.templateOptions.label = field.templateOptions.label.toUpperCase();
                }
            });
        });
  }
  
  function demoCtrl(formlyTransformer) {
        var vm = this;
        
        vm.fields = [
            key: 'firstName',
            type: 'input',
            templateOptions: {
                label: 'First name'
            },
            transformers: {
                upperCaseLabel: true
            }
        ];
        
        console.log(vm.fields[0].templateOptions.label); // FIRST NAME
  }
```

[Angular-Formly]: http://angular-formly.com
[formlyConfig]: http://docs.angular-formly.com/v7.2.3/docs/formlyconfig

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/wieldo/angular-formly-transformer/trend.png)](https://bitdeli.com/free "Bitdeli Badge")