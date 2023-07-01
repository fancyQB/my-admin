const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

const cliDefaultConfig = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    module: {
      // 忽略 Critical dependency: require function is used in a way in which dependencies cannot be statically extracted 警告
      unknownContextCritical: false
    },
    plugins: [new NodePolyfillPlugin()]
  }
})

const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

// https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F

module.exports = {
  ...cliDefaultConfig,
  devServer: {
    // 配置反向代理
    proxy: {
      // 当地址中有/api的时候会触发代理机制
      '/api': {
        // 要代理的服务器地址  这里不用写 api
        target: 'https://api.imooc-admin.lgdsunday.club/',
        changeOrigin: true // 是否跨域
      }
    },
    // 忽略全屏覆盖 ResizeObserver loop limit exceeded 警告
    client: {
      overlay: {
        runtimeErrors: (error) => {
          // 忽略 点击headerSearch图标后 报错
          if (error.message.includes('ResizeObserver loop limit exceeded')) {
            return false
          }
        }
      }
    }
  },
  chainWebpack(config) {
    // 设置 svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
