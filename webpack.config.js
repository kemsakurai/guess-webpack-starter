const Webpack = require("webpack");
const { GuessPlugin } = require('guess-webpack');

module.exports = {
    mode : "development",
    context: __dirname + '/src',
    entry: {
        bundle: ["./index.js"]
    },
    output: {
        filename: 'guess-bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        ]
    },
    plugins: [
        new GuessPlugin(
            { GA: '103185238',
              debug: true,
              runtime: {
                basePath: '',
                // true > PrefetchPlugin 、false > PrefetchAotPlugin の切替を行う
                delegate: true,
                // 回線ごとの閾値の指定
                prefetchConfig: {
                    '4g': 0.15,
                    '3g': 0.25,
                    '2g': 0.45,
                    'slow-2g': 0.6
                }
              }
            })
    ]
}
