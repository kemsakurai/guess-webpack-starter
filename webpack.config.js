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
        new GuessPlugin({ GA: '103185238' }),
    ]
}
