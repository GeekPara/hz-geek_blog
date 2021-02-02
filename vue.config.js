const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
  productionSourceMap: false,
  devServer: {
    host: '0.0.0.0',
    port: 233,
    disableHostCheck: true
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  },
  /*
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.mode = 'production'
      return {
        plugins: [new CompressionPlugin({
          test: /\.js$|\.html$|\.css/,
          threshold: 10240,
          deleteOriginalAssets: false
        })]
      }
    }
  },*/
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: false,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  }
}
