describe('formlyTransformer', function () {
    var formlyTransformer;
    
    beforeEach(function () {
        module('formlyTransformer');
        inject(function(_formlyTransformer_) {
            formlyTransformer = _formlyTransformer_;
        });
    });
    
    it('should be empty on start', function() {
        expect(formlyTransformer._transformers).toBeDefined();
        expect(formlyTransformer._transformers.length).toEqual(0);
        expect(formlyTransformer._transformers).toEqual([]);
    });
});