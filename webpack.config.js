const path = require('path')
const fs = require('fs')

const PATH_SRC = path.resolve(__dirname, 'src')
const PATH_PAGE = path.resolve(PATH_SRC, 'page')
const PATH_DIST = path.resolve(__dirname, 'dist')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const getHtmlPluginArr = function (dir, from) {
  const files = fs.readdirSync(dir)
  const ret = []
  const pages = files.forEach((file) => {
    const p = path.resolve(dir, file)
    if (fs.lstatSync(p).isDirectory()) {
      const d = getHtmlPluginArr(p, from)
      if (d && d.length) {
        ret.push(...d)
      }
    } else if (file.substr(-5) === '.html') {
      // html
      ret.push(
        new HtmlWebpackPlugin({
          title: file,
          filename: from ? path.relative(from, p) : p,
          template: p,
          minify: false,
          inject: 'body',
          chunks: ['common'],
        })
      )
    }
  })

  return ret
}

module.exports = (env, argv) => {
  const isDevMode = argv.mode === 'development'

  const config = {
    entry: {
      // select: {
      //   filename: 'js/select-ui.js',
      //   import: path.resolve(PATH_SRC, 'js/select-ui.js'),
      // },
      common: {
        filename: 'js/common-ui.js',
        import: path.resolve(PATH_SRC, 'js/common-ui.js'),
      },
      // style: {
      //   import: path.resolve(PATH_SRC, 'css/common.scss'),
      // },
    },
    output: {
      path: PATH_DIST,
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.(html|hbs)$/,
          use: [
            {
              loader: 'handlebars-loader',
              options: {
                helperDirs: [path.resolve(__dirname, 'src/_helpers')],
                partialDirs: [path.resolve(__dirname, 'src/_partials/common'), path.resolve(__dirname, 'src/_partials')]
              }
            }
          ],
        },
        {
          test:/\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false,
                sourceMap: true,
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                  postcssOptions: {
                      plugins: [
                          [
                            'autoprefixer'
                          ],
                      ],
                  },
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              }
            }
          ],
        },
      ],
    },
    plugins: [
      // 단순 복사
      new CopyWebpackPlugin ({
        patterns: [
          // lib
          {
            from: './src/js/lib/**/*',
            to({ absoluteFilename }) {
              return path.relative(PATH_SRC, absoluteFilename)
            },
          },
          // img
          {
            from: './src/img/**/*',
            to({ absoluteFilename }) {
              return path.relative(PATH_SRC, absoluteFilename)
            },
          },
          // normalize.css
          {
            from: './src/css/normalize.css',
            to: './css/'
          },
          // font
          {
            from: './src/fonts/**/*',
            to({ absoluteFilename }) {
              return path.relative(PATH_SRC, absoluteFilename)
            },
          },
        ],
      }),
      // index.html
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
        minify: false,
        inject: false,
      }),
      // page
      ...getHtmlPluginArr(PATH_PAGE, PATH_SRC),
      // css
      new MiniCssExtractPlugin({
        linkType: false,
        filename: 'css/style.css',
      }),
    ],
    optimization: {
      minimize: false,
    }
  }

  // development
  if(isDevMode) {
    config['devtool'] = 'source-map'
    config['devServer'] = {
      static: {
        directory: path.join(__dirname, 'src'),
      },
      compress: false,
      port: 9000,
      hot: true,
      open: true,
    }
  }

  return config
}


