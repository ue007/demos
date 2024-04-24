const getWebpackConfig = require("ocular-dev-tools/config/webpack.config");
console.log(getWebpackConfig);
module.exports = env => {
  const config = getWebpackConfig(env);
  // add custom settings
  return config;
};
