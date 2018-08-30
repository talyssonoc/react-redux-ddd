const { dirname } = require('path');

module.exports = function override(config, env) {
  const rule = config.module.rules[1].oneOf[1];

  const originalInclude = rule.include;

  rule.include = [
    originalInclude,
    dirname(require.resolve('@rw-ddd/core'))
  ];

  rule.exclude = /node_modules\/(?!(@rw\-ddd\/core))/;

  return config;
};
