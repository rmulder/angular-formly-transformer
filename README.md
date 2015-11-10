FormlyTransformer
==========

Automate configuration of fields in [Angular-Formly].

## Add Angular Formly

There is no official [Angular-Formly] package in Atmosphere so you have to add it manually.

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

Each transform function has two arguments.

- **field** - formly field object
- **config** - transform configuration for field

```javascript
formlyTransformer.register('transformerName', function(field, config) {
    // field - formly configuration for field
    // config - transformer configuration for field
});
```

### Use transformer

You have to specify two arguments. Array of fields and configuration.

Configuration structure is simple.  
Use field's key as property key.  
Then specify transformers as transformer name-config pairs.

```javascript
formlyTransformer.transform(vm.fields, {
    fieldKey: {
        transformerName: transformerConfig
    }
});
```


## Example

```javascript
angular.module('myAppName', [
    'formly',
    'formlyTransformer'
  ])
  .controller('demoCtrl', demoCtrl);
  
  function demoCtrl(formlyTransformer) {
        var vm = this;
        
        // register upperCaseLabel transformer
        formlyTransformer.register('upperCaseLabel', function(field, config) {
            // there is no label!
            if (!field.templateOptions && !field.templateOptions.label) {
                return;
            }
            // yes, there is!
            if(config === true) {
                field.templateOptions.label = field.templateOptions.label.toUpperCase();
            }
        });
        
        vm.fields = [
            key: 'firstName',
            type: 'input',
            templateOptions: {
                label: 'First name'
            }
        ];
        
        console.log('before', vm.fields[0].templateOptions.label); // First name
        
        formlyTransformer.transform(vm.fields, {
            firstName: {
                upperCaseLabel: true
            }
        });
        
        console.log('after', vm.fields[0].templateOptions.label); // FIRST NAME
  }
```

[Angular-Formly]: http://angular-formly.com