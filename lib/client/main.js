var {SetModule, Service, Inject} = angular2now;

SetModule('formlyTransformer', []);
@Service({
    name: 'formlyTransformer'
})
//@Inject(['$translate'])
    //
class formlyTransformer {

    // injectables
    //$translate;

    /**
     *
     * @type {Object}
     * @private
     */
    _transformers = {};

    constructor() {
        //this.$translate = $translate;
        //this.validation = Validation;
    }

    /**
     *
     * @param {Object[]} fields
     * @param {Object} config
     * @returns {Object[]}
     */
    transform(fields, config) {
        if (!angular.isArray(fields)) {
            throw this.createError('Fields has to be an array');
        }
        // loop all fields
        fields.forEach(field => {
            // to use transformField on each one
            if (!field.key) {
                return;
            }
            this.transformField(field, this.getFieldConfig(field.key, config));
        });
        
        return fields;
    }

    /**
     * Add transform function
     *
     * @example
     * this.register('required', function(field, value) { ... }
     *
     * @param {string} name
     * @param {function} transformer
     */
    register(name, transformer) {
        if (this._transformers[name]) {
            throw this.createError(`Transformer ${name} is already registered`);
        }
        if ("function" !== typeof transformer) {
            throw this.createError(`Transformer ${name} is not a function`);
        }
        this._transformers[name] = transformer;
    }

    /**
     *
     * @param {object} field
     * @param {object} fieldConfig
     */
    transformField(field, fieldConfig) {

        if ("object" !== typeof field) {
            throw this.createError('Field has to be an object');
        }

        if (!field.key) {
            return;
        }

        let transformers = this.getFieldConfigTransformers(fieldConfig);

        transformers.forEach(transformer => {
            let tr = this._transformers[transformer.name];
            if (!tr) {
                throw this.createError(`Transformer ${transformer.name} is not registered`);
            }
            tr.call(this, field, transformer.value);
        });
    }

    /**
     *
     * @param {string} fieldKey
     * @param {object} config
     * @returns {Object|undefined}
     */
    getFieldConfig(fieldKey, config) {
        return config[fieldKey];
    }

    /**
     *
     * @param {object} config
     * @returns {Array}
     */
    getFieldConfigTransformers(config) {
        let transformers = [];
        _.each(config, (value, name) => {
            transformers.push({
                name: name,
                value: value
            });
        });
        return transformers;
    }

    //
    // helpers
    //

    /**
     *
     * @param {string} msg
     * @returns {Error}
     */
    createError(msg) {
        return new Error(`[formlyTransformer] ${msg}`);
    }
}