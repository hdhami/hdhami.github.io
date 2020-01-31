import webpack, { DefinePlugin } from 'webpack';
import merge from 'webpack-merge';
import path from 'path';
import fs from 'fs';
import fse from 'fs-extra';
import getDevModeConfig from './webpack.config.dev-server';

const TerserPlugin = require('terser-webpack-plugin');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const defineEnvPlugin = IS_PRODUCTION
    ? [new DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } })]
    : [new DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('development') } })];

const commonPlugins = defineEnvPlugin.concat([]);

let configuration = {
    mode: IS_PRODUCTION ? 'production' : 'development',
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                extractComments: false,
                terserOptions: {
                    ecma: undefined,
                    warnings: false,
                    parse: {},
                    compress: {},
                    module: false,
                    output: {
                        comments: false
                    },
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_classnames: undefined,
                    keep_fnames: false,
                    safari10: false
                }
            })
        ]
    },
    plugins: commonPlugins,
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css', '.png'],
        alias: {
            config: path.resolve(__dirname, '../../../app/config')
        }
    },
    module: {
        rules: []
    }
};

if (!IS_PRODUCTION) {
    const devServerConfig = getDevModeConfig({ path, webpack });
    configuration = merge(configuration, devServerConfig);
}
const baseConfiguraton = configuration;
export { baseConfiguraton, path, fs, fse, webpack, IS_PRODUCTION, merge };
