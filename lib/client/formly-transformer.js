var {SetModule, Service, Inject} = angular2now;

SetModule('formlyTransformer');
@Service({
    name: 'formlyTransformer'
})
@Inject(['formlyConfig'])
    //
class formlyTransformer {

    // injectables
    formlyConfig;

    /**
     *
     * @type {array}
     * @private
     */
    _transformers = [];

    constructor(formlyConfig) {
        this.formlyConfig = formlyConfig;

        if (!angular.isArray(this.formlyConfig.extras.fieldTransform)) {
            this.formlyConfig.extras.fieldTransform = [];
        }

        // push to fieldTransform
        this.formlyConfig.extras.fieldTransform.push(
            (...formlyFieldTransformArgs) => {
                return this.run(...formlyFieldTransformArgs);
            }
        );
    }

    /**
     *
     * @param {function} transformer
     */
    register(transformer) {
        if ("function" !== typeof transformer) {
            throw this.createError(`Transformer is not a function`);
        }
        this._transformers.push(transformer);
    }

    /**
     *
     * @param fields
     * @param model
     * @param formOptions
     * @param form
     * @returns {array}
     */
    run(fields, ...formlyFieldTransformArgs) {

        // add transformers object to all fields
        if (angular.isArray(fields)) {
            fields.forEach((field) => {
                if (!field.transformers) {
                    field.transformers = {};
                }
            });
        }

        // run all transformers
        this._transformers.forEach((transformer) => {
            transformer.call({
                createError: (msg) => {
                    return this.createError(`[${key}]: ${msg}`);
                }
            }, fields, ...formlyFieldTransformArgs);
        });

        // remove transformers
        fields.forEach((field) => {
            delete field.transformers;
        });

        return fields;
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