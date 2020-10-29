module.exports = {
  devServer: {
    port: process.env.PORT || 8888
  },
  publicPath: process.env.BASE_URL || "/",
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'IGSN Editor',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  configureWebpack: {
    performance: { hints: false },
    devtool: 'source-map'
  }
}