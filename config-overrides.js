const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = (config, env) => {
  config.externals = {
    react: 'React',
    moment: 'moment',
    antd: 'antd',
    echarts: 'echarts',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter'
  };

  if (env === 'production') {
    const index = config.plugins.findIndex(plugin => plugin instanceof SWPrecacheWebpackPlugin);
    const {options} = config.plugins[index];
    options.navigateFallbackWhitelist = [/^(?!\/(__|tutorial)).*/];
    options.runtimeCaching = [
      {
        handler: 'cacheFirst',
        urlPattern: /at\.alicdn\.com|cdn\.bootcss\.com|thirdqq\.qlogo\.cn/
      }
    ];
    config.plugins.splice(index, 1, new SWPrecacheWebpackPlugin(options));
  }

  return config;
};
