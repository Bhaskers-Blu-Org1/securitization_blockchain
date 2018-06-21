const path = require('path');
const webpack = require('webpack');

//target for using npm run [target] in the terminal
//const TARGET = process.env.npm_lifecycle_event;

//process.env.BABEL_ENV = TARGET;

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'public'),
  lib: path.join(__dirname, 'lib')
}

module.exports = {
  entry:{
    app: PATHS.app
  },
  resolve: {
    extensions: ['','.js','.jsx']
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module:{
    loaders:[
      {
        //use regex to test for js and jsx
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        //only include files in the PATHS.app path
        include: PATHS.app
      },
      {
        test: /\.css$/,
        loaders: ['style','css'],
        include: [PATHS.app,PATHS.lib]
      }
    ]
  },
  devTool: 'eval-source-map',
  devServer: {
    contentBase: PATHS.build,
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    stats: 'errors-only',
    host: "0.0.0.0", //process.env.HOST,
    port: process.env.PORT,
    disableHostCheck: true,
    proxy: {
      "/chaincode": "http://localhost:3001/chaincode",
      "/init_hfc_client": "http://localhost:3001/init_hfc_client"
    },
    setup: function (app) { app.use(require('body-parser').json()); }
  },

  plugins:[
    new webpack.HotModuleReplacementPlugin()
  ]
}

devServer.setup = function (app) { app.use(require('body-parser').json()); }
