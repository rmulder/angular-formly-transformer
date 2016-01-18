class formlyTransformer {
  constructor(formlyConfig) {
    this.formlyConfig = formlyConfig;
    this._transformers = [];

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
   * Register transformer
   *
   * @method formlyTransformer.register
   *
   * @param {function} transformer - modification function (see formlyConfig.extras.fieldTransform)
   */
  register(transformer) {
    if ("function" !== typeof transformer) {
      throw this.createError(`Transformer is not a function`);
    }
    this._transformers.push(transformer);
  }

  /**
   *  Runs all registered transformers and returns the modified fields array.
   *  You can use it manually and with custom arguments but it is being triggered automatically by angular-formly module
   *
   * @method formlyTransformer.run
   * @param {array} fields - see formlyConfig.extras.fieldTransform
   * @param {object} model - see formlyConfig.extras.fieldTransform
   * @param {object} form - see formlyConfig.extras.fieldTransform
   * @param {object} formOptions - see formlyConfig.extras.fieldTransform
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
          return this.createError(msg);
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
   * Create Error object with prefixed message
   *
   * @method formlyTransformer.createError
   *
   * @param {string} msg - error message
   * @returns {Error}
   */
  createError(msg) {
    return new Error(`[formlyTransformer] ${msg}`);
  }
}

formlyTransformer.$inject = ['formlyConfig'];

angular.module('formlyTransformer', [
    'formly'
  ])
  .service('formlyTransformer', formlyTransformer);
