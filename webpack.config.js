const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'app');
const dirAssets = path.join(__dirname, 'assets');

const appHtmlTitle = 'Webpack Boilerplate';

/**
 * Webpack Configuration
 */
module.exports = {
    entry: {
        bundle: path.join(dirApp, 'index'),
    },
    resolve: {
        modules: [
            dirNode,
            dirApp,
            dirAssets,
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: IS_DEV,
        }),

        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),
            title: appHtmlTitle,
        }),


        new StyleLintPlugin(),

        new ExtractTextPlugin({
            filename: '[name].bundle.css',
            allChunks: true,
        }),
    ],
    module: {
        rules: [
            // BABEL
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                options: {
                    compact: true,
                },
            },

            // STYLES
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV,
                        },
                    },
                ],
            },

            // CSS / SASS
            {
                test: /\.scss/,
                loader: ExtractTextPlugin.extract({fallback:'style-loader',use: [
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: IS_DEV,
                            includePaths: [dirAssets],
                        },
                    },
                ]}),
            },

            // HTML
            {
                test: /\.html$/,
                loader: 'html-loader',
            },

            // IMAGES
            {
                test: /\.(jpe*g|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            },

            // ESLINT
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
        ],
    },
};
