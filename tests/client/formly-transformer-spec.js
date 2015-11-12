describe('formlyTransformer', function () {
    var formlyTransformer;

    beforeEach(function () {
        module('formlyTransformer');
        inject(function (_formlyTransformer_) {
            formlyTransformer = _formlyTransformer_;
        });
    });

    it('should be empty on start', function () {
        expect(formlyTransformer._transformers).toBeDefined();
        expect(formlyTransformer._transformers.length).toEqual(0);
        expect(formlyTransformer._transformers).toEqual([]);
    });

    it('should have createError method which returns Error with prefixed message', function () {
        var errorMsg = "[formlyTransformer] test";
        
        expect(function () {
            throw formlyTransformer.createError('test');
        }).toThrowError(Error, errorMsg);
    });

    it('should pass only functions', function () {
        var errorMsg = "[formlyTransformer] Transformer is not a function";
        var values = [undefined, false, true, 1, 0, -1, 's', '1', '0', '-1', 'true', 'false', {}, null, ['s']];

        expect(function () {
            formlyTransformer.register(function () {
            });
        }).not.toThrowError(errorMsg);

        _.each(values, function (value) {
            expect(function () {
                formlyTransformer.register(value);
            }).toThrowError(errorMsg);
        });
    });

    it('should run registered transformers', function () {
        var spy = jasmine.createSpy('spy');
        var transformer = function (fields) {
            spy(fields);
        };
        var transformed;
        var expected = [
            {
                key: 'test-1'
            },
            {
                key: 'test-2'
            }
        ];
        var fields = [
            {
                key: 'test-1',
                transformers: {
                    test: true
                }
            },
            {
                key: 'test-2',
                transformers: {
                    test: false
                }
            }
        ];
        
        formlyTransformer.register(transformer);
        transformed = formlyTransformer.run(fields, {}, {}, {});

        expect(spy).toHaveBeenCalled();
        expect(transformed).toEqual(expected);

    });
});