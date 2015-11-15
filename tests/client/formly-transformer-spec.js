describe('formlyTransformer', () => {
    //
    // vars
    //

    let formlyTransformer;

    //
    // tests
    //

    beforeEach(() => {
        module('formlyTransformer');
        inject(function (_formlyTransformer_) {
            formlyTransformer = _formlyTransformer_;
        });
    });

    it('should be empty on start', () => {
        expect(formlyTransformer._transformers).toBeDefined();
        expect(formlyTransformer._transformers.length).toEqual(0);
        expect(formlyTransformer._transformers).toEqual([]);
    });

    it('should have createError method which returns Error with prefixed message', () => {
        const errorMsg = "[formlyTransformer] test";

        expect(() => {
            throw formlyTransformer.createError('test');
        }).toThrowError(Error, errorMsg);
    });

    it('should pass only functions', () => {
        const errorMsg = "[formlyTransformer] Transformer is not a function";
        const values = [undefined, false, true, 1, 0, -1, 's', '1', '0', '-1', 'true', 'false', {}, null, ['s']];

        expect(() => {
            formlyTransformer.register(() => {
            });
        }).not.toThrowError(errorMsg);

        values.forEach((value) => {
            expect(() => {
                formlyTransformer.register(value);
            }).toThrowError(errorMsg);
        });
    });

    it('should run registered transformers', () => {
        const spy = jasmine.createSpy('spy');
        const transformer = (fields) => spy(fields);
        let transformed;
        const expected = [
            {
                key: 'test-1'
            },
            {
                key: 'test-2'
            }
        ];
        const fields = [
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

    it('should have createError method in transformer context', () => {
        formlyTransformer.register(function () {
            throw this.createError('test');
        });

        expect(() => {
            formlyTransformer.run([{}, {}], {}, {}, {});
        }).toThrowError(Error, "[formlyTransformer] test");
    });
});
