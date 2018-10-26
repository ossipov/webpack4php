process.traceDeprecation = false;

var fs  = require('fs');

const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssoWebpackPlugin = require('csso-webpack-plugin').default;
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');


module.exports = ( env, options ) => {
  return {
    entry: [
      './src/js/app.js', 
      './src/sass/app.sass'
    ],

    output: {
      path: path.resolve(__dirname, "public"),
      filename: 'assets/js/app.[contenthash].js',
      //publicPath: "/public"
    },

    devtool: false,

    watchOptions: {
      aggregateTimeout: 100,
      ignored: /node_modules/
    },

    module: {
      rules: [

      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src/js'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },

      {
        test: /\.(sa|sc|c)ss$/,
        include: path.resolve(__dirname, 'src/sass'),
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              sourceMap: ( options.mode == 'production' ? false : true ), 
              importLoader: 2,
              publicPath: './public/assets/css'
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: ( options.mode == 'production' ? false : true ),
              importLoaders: 2,
              modules: false
            }
          },
          { 
            loader: 'postcss-loader', 
            options: { 
              sourceMap: ( options.mode == 'production' ? false : true ),
              ident: 'postcss',
              plugins: (loader) => [
                require('autoprefixer')({
                  browsers: ['last 10 versions']
                }),
                require('postcss-modules')({
                  generateScopedName: ( options.mode == 'production' ? '[hash:base64:4]' : '[local]' ), // [emoji][hash:base64:4]
                  getJSON: function(cssFileName, json, outputFileName) {
                    var path      = require('path');
                    var cssName     = path.basename(cssFileName);
                    var jsonFileName  = path.resolve('./src/sass/' + cssName + '.json');
                    fs.writeFileSync(jsonFileName, JSON.stringify(json));
                  }
                })
              ]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: ( options.mode == 'production' ? false : true )
            }
          }
        ]
      },
    ]
    },

    // performance: {
    //   hints: "warning", // enum  
    //   maxAssetSize: 200000, // int (in bytes),
    //   maxEntrypointSize: 400000, // int (in bytes)
    //   assetFilter: function(assetFilename) {
    //     // Function predicate that provides asset filenames
    //     return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    //   }
    // },

    plugins: [
      (options.mode == 'production' ? new CssoWebpackPlugin() : null),

      (options.mode == 'production' ? null : new LiveReloadPlugin() ),

      (options.mode == 'production' ? null : new webpack.SourceMapDevToolPlugin({
        filename: "[file].map",
        exclude: ["/vendor/"]
      })),

      new ExtraWatchWebpackPlugin({
        files: [ 'public/*.php' ] //'public/assets/css/*.css', 'public/assets/js/*.js', 
        //dirs: [ 'path/to/dir' ],
      }),

      new MiniCssExtractPlugin({
        filename: 'assets/css/style.[contenthash].css'
      }),

      (options.mode == 'production' ? new PurifyCSSPlugin({
        paths: glob.sync(path.join(__dirname, 'public/*.php')),
      }) : null),
   
      new FaviconsWebpackPlugin({
        logo: './src/favicon/logo.png',
        prefix: 'assets/favicons/',
        emitStats: true,
        statsFilename: '../src/favicon/favicons.json',
        inject: false,
      }),

      new AssetsPlugin({
        filename: 'src/assets.json',
        fileTypes: ['js', 'css'],
      }),

    ].filter((x) => { return (x !== null); })
  }
};