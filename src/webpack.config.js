const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const exec = require('child_process').exec;
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const BrotliPlugin = require('brotli-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const MODE = process.env.MODE;
const ANALYZER = process.env.ANALYZER;

global.MY1_SERVER = true;
global.window = {
  MY1_SERVER,
  MODE: MODE || 'development',
  addEventListener() {},
};

const {
  PATH_TO_BUNDLE,
  PATH_TO_SHARED,
  PATH_TO_SCREENS,
  PATH_TO_REDUSERS,
  PATH_TO_LIBS,
  PATH_TO_TEMP,
} = require('./globals');

global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};

exec(`rm -fr ${PATH_TO_BUNDLE}/*`, (err, stdout, stderr) => {
  if (err) {
    console.err(err);
    return;
  }
  console.log(stdout);
});

function CreateWebpackConfig(type, options) {
  let folder = type === 'js' ? 'scripts' : 'assets';
  let ext = (type === 'js' && 'js') || (type === 'scss' && 'css');

  this.mode = MODE || 'development';

  this.plugins = [];

  this.plugins.push(
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
      ROOTDIR: JSON.stringify(__dirname),
      MODE: JSON.stringify(MODE || 'development'),
    })
  );

  this.plugins.push(
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.(js|css)$/,
      minRatio: 0.8,
    })
  );

  this.plugins.push(
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|gif)$/,
    })
  );

  if (ANALYZER) {
    this.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        generateStatsFile: true,
        statsOptions: { source: false },
      })
    );
  }

  this.devtool = MODE === 'production' ? '' : 'inline-source-map';

  this.module = {
    rules: [],
  };

  this.resolve = {
    extensions: ['.', '.json', `.${type}`],
    alias: {
      root: __dirname,
      comp: PATH_TO_SCREENS,
      lib: PATH_TO_LIBS,
      shared: PATH_TO_SHARED,
      reducers: PATH_TO_REDUSERS,
      glb$: path.resolve(__dirname, 'globals.js'),
    },
  };

  this.entry = {};

  //custom files input
  if (type === 'js') {
    this.entry['index'] = path.join(__dirname, folder, 'index');
    //this.entry['login'] = path.join(__dirname, folder, 'login');
  } else if (type === 'scss') {
    this.entry['index'] = path.join(__dirname, folder, 'index');
    //this.entry['files'] = path.join(__dirname, folder, 'files');
    //this.entry['login'] = path.join(__dirname, folder, 'login');

    this.plugins.push(
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, folder, 'index.html'),
        inject: false,
        SET: options.SET,
        minify: {
          html5: true,
          collapseWhitespace: MODE === 'production' ? true : false,
        },
      })
    );
  }

  this.output = {
    filename: '[name].' + ext,
    path: PATH_TO_BUNDLE,
    publicPath: '',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  }; //publicPath !!

  if (type === 'js') {
    this.module.rules.push({
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: /(node_modules|bower_components)/,
    });
  } else if (type === 'scss') {
    this.module.rules.push({
      test: /\.(sass|scss)$/,
      exclude: /node_modules/,

      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            query: {
              minimize: options.ENV == 'production' ? true : false,
              modules: true, // enables CSS Modules spec
              sourceMap: options.ENV == 'production' ? false : true,
              importLoaders: 1, // will import previous amount of loaders,
              localIdentName: '[local]',
            },
          },
          {
            loader: 'sass-loader',
            query: {
              sourceMap: options.ENV == 'production' ? false : true,
              sourceMapContents: options.ENV == 'production' ? false : true,
            },
          },
        ],
      }),
    });

    this.module.rules.push({
      test: /\.(jpe?g|png|gif|svg|ttf|eot|woff|woff2)$/i,
      use: {
        loader: 'file-loader',
        query: {
          name: '[path][name].[ext]',
        },
      },
    });

    this.plugins.push(
      new ExtractTextPlugin({
        filename: `[name].${ext}`,
        disable: false,
        allChunks: true,
      })
    );

    /*if (MODE == "production") {
            this.plugins.push(new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: cssnano,
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }],
                },
                canPrint: true
            }));
        }*/
  }
}

module.exports = function(options = {}) {
  console.log('options', options);
  return [new CreateWebpackConfig('js', options), new CreateWebpackConfig('scss', options)];
};
