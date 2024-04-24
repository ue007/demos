// babel.config.js
const getBabelConfig = require("ocular-dev-tools/config/babel.config");

module.exports = api => {
  const config = getBabelConfig(api);
  // add custom settings
  return config;
};
