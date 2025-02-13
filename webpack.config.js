'use strict';

const path = require('path');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');

module.exports = {
    experiments: {
        outputModule: true,
    },
    resolve: {
        alias: {
            'ckeditor5/src/enter': '/src/cke-translator-enter.js',
            'ckeditor5/src/engine': '/src/cke-translator-engine.js',
            'ckeditor5/src/core': '/src/cke-translator-core.js',
            'ckeditor5/src/ui': '/src/cke-translator-ui.js',
            'ckeditor5/src/utils': '/src/cke-translator-utils.js'
        },
        fallback: {
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "buffer": require.resolve("buffer")
        }
    },
    externals: {
        '@typo3/ckeditor5-bundle.js': '@typo3/ckeditor5-bundle.js'
    },
    //entry: './node_modules/@ckeditor/ckeditor5-font/src/font.js',
    // Another example: enty to convert the code-block-plugin
    entry: './node_modules/ckeditor5-heading-with-id/src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'cke-hwi.js',
        library: {
            type: 'module',
        },
    },
    module: {
        rules: [
            {
                test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,

                use: ['raw-loader']
            },
            {
                test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,

                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            injectType: 'singletonStyleTag',
                            attributes: {
                                'data-cke': true
                            }
                        }
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: styles.getPostCssConfig({
                                themeImporter: {
                                    themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
                                },
                                minify: true
                            })
                        }
                    }
                ]
            }
        ]
    },

    // Useful for debugging.
    devtool: 'source-map',

    // By default webpack logs warnings if the bundle is bigger than 200kb.
    performance: { hints: false }

};