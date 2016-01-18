module.exports = {
  stats: {
    colors: true,
    reasons: true
  },
  resolve: {
    extensions: ["", ".js"]
  },
  externals: {
    "angular": "angular",
    "angular2-now": "angular2now",
    "angular-formly": {
      root: 'ngFormly',
      amd: 'angular-formly',
      commonjs2: 'angular-formly',
      commonjs: 'angular-formly'
    }
  }
};
