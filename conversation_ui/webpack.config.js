// output.pathに絶対パスを指定する必要があるため、pathモジュールを読み込んでおく
var path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  // エントリーポイントの設定
  entry: './src/js/index.js',
  // 出力の設定
  output: {
    // 出力するファイル名
    filename: 'bundle.js',
    // 出力先のパス（v2系以降は絶対パスを指定する必要がある）
    path: path.join(__dirname, 'public/js')
  },
  
　module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: 'babel-loader',
        include: path.join(__dirname, 'src')
      }
    ]
  }
};


// module.exports = [{
//   // context: path.join(__dirname, 'src/css'),
//     entry: {
//         style: './src/css/style.scss'
//     },
//     output: {
//         path: path.join(__dirname, 'public/css'),
//         filename: '[name].css'
//     },
//     module: {
//         loaders: [
//             {
//                 test: /\.scss$/,
//                 loader: ExtractTextPlugin.extract('style-loader', 'css-loader?-url&minimize&sourceMap!sass-loader')
//             }
//         ]
//     },
//     devtool: 'source-map',
//     plugins: [
//         new ExtractTextPlugin('[name].css')
//     ]
//}];