/*! angular-formly-transformer v1.3.0 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["formlyTransformer"] = factory();
	else
		root["formlyTransformer"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var formlyTransformer = (function () {
	  function formlyTransformer(formlyConfig) {
	    var _this = this;

	    _classCallCheck(this, formlyTransformer);

	    this.formlyConfig = formlyConfig;
	    this._transformers = [];

	    if (!angular.isArray(this.formlyConfig.extras.fieldTransform)) {
	      this.formlyConfig.extras.fieldTransform = [];
	    }

	    // push to fieldTransform
	    this.formlyConfig.extras.fieldTransform.push(function () {
	      return _this.run.apply(_this, arguments);
	    });
	  }

	  /**
	   * Register transformer
	   *
	   * @method formlyTransformer.register
	   *
	   * @param {function} transformer - modification function (see formlyConfig.extras.fieldTransform)
	   */

	  _createClass(formlyTransformer, [{
	    key: 'register',
	    value: function register(transformer) {
	      if ("function" !== typeof transformer) {
	        throw this.createError('Transformer is not a function');
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
	  }, {
	    key: 'run',
	    value: function run(fields) {
	      var _this2 = this;

	      for (var _len = arguments.length, formlyFieldTransformArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        formlyFieldTransformArgs[_key - 1] = arguments[_key];
	      }

	      // add transformers object to all fields
	      if (angular.isArray(fields)) {
	        fields.forEach(function (field) {
	          if (!field.transformers) {
	            field.transformers = {};
	          }
	        });
	      }

	      // run all transformers
	      this._transformers.forEach(function (transformer) {
	        transformer.call.apply(transformer, [{
	          createError: function createError(msg) {
	            return _this2.createError(msg);
	          }
	        }, fields].concat(formlyFieldTransformArgs));
	      });

	      // remove transformers
	      fields.forEach(function (field) {
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
	  }, {
	    key: 'createError',
	    value: function createError(msg) {
	      return new Error('[formlyTransformer] ' + msg);
	    }
	  }]);

	  return formlyTransformer;
	})();

	formlyTransformer.$inject = ['formlyConfig'];

	angular.module('formlyTransformer', ['formly']).service('formlyTransformer', formlyTransformer);

/***/ }
/******/ ])
});
;