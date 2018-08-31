module.exports = {
  plugins: [
    '@babel/plugin-transform-flow-strip-types',
    '@babel/plugin-syntax-flow',
    '@babel/plugin-proposal-class-properties'
  ],
  presets: [
    ['@vue/app', {
      useBuiltIns: 'entry'
    }]
  ]
};
