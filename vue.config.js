
module.exports = {
  chainWebpack: (config) => {
    config.entry('app')
      .clear()
      .add('./example/src/main.ts')
      .end()

    config.plugin('html')
      .tap(args => {
        args[0].template = './example/public/index.html'
        return args
      })
      .end()

 
  },
  css: {
    loaderOptions: {
      sass: {
        sourceMap:true
      },
      css: {
        sourceMap: true
      },
      postcss:{
        sourceMap: true
      }
    }
  },
  lintOnSave: true
}
