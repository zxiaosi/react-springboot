import { resolve } from "path";

// 配置详解 https://taro-docs.jd.com/docs/config
const config = {
  projectName: 'weapp',
  date: '2023-7-24',
  designWidth: 750,
  deviceRatio: { // 设计稿尺寸换算规则
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: { // 全局变量设置
  },
  copy: { // 文件 copy 配置 https://taro.redwoodjs.cn/docs/config-detail#copy
    patterns: [
      // { from: 'src/views/subEcharts/wxecharts/', to: 'dist/views/subEcharts/wxecharts/' }, // 指定需要 copy 的文件夹
      { from: 'src/views/subEcharts/wxecharts/echarts.js', to: 'dist/views/subEcharts/wxecharts/echarts.js' }, // 指定需要 copy 的文件
      { from: 'src/views/subEcharts/wxecharts/ec-canvas.wxml', to: 'dist/views/subEcharts/wxecharts/ec-canvas.wxml' }, // 指定需要 copy 的文件
    ],
    options: {
    }
  },
  alias: {
    "@": resolve(__dirname, "..", "src"),
  },
  framework: 'react',
  compiler: { // https://github.com/NervJS/taro/issues/12553#issuecomment-1408347454
    type: "webpack5",
    prebundle: {
      // enable: true, // 是否开启依赖预编译
      // force: true // 是否强行弃用缓存
    }
  },
  cache: {
    enable: true // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  mini: {
    postcss: {
      pxtransform: { // px 自动转为 rpx
        enable: true,
        config: {

        }
      },
      url: { // 小程序端样式引用本地资源内联配置
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限, 单位为 b,(图片超过这个大小 不会 转为base64)
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    compile: { // 编译过程的相关配置 https://taro.redwoodjs.cn/docs/config-detail#minicompile
      exclude: [ // 排除某个文件
        resolve(__dirname, '..', 'src/views/subEcharts/wxecharts/echarts.js')
      ],
    },
    optimizeMainPackage: {
      enable: true,
      exclude: [
        resolve(__dirname, '..', 'src/views/subEcharts/wxecharts/echarts.js')
      ],
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
