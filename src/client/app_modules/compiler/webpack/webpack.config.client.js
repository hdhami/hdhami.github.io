import { baseConfiguraton, path, IS_PRODUCTION, merge } from './webpack.config.base';
import getConfig from './build-config';
import { getEntries } from './entry-builder';

const config = getConfig();

const clientConfiguration = merge(baseConfiguraton, {
    entry: getEntries(IS_PRODUCTION, path, path.join(__dirname, config.paths.rootPathRelativeToCompiler)),
    target: 'web',
    output: {
        path: path.join(__dirname, config.paths.outputBasePath),
        publicPath: IS_PRODUCTION ? config.paths.publicPath : '/',
        chunkFilename: IS_PRODUCTION ? 'chunks/[name].[hash].min.js' : 'chunks/[name].[hash].js',
        filename: IS_PRODUCTION ? '[name].min.js' : '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            components: path.join(
                __dirname,
                config.paths.rootPathRelativeToCompiler,
                config.paths.componentsPathFromRoot
            )
        }
    },
    module: {
        rules: [
            {
                test: /\.(woff2|woff|eot|svg|ttf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]',
                            useRelativePath: false
                        }
                    }
                ]
            },
            {
                enforce: 'pre',
                test: /.js?$/,
                exclude: /node_modules|abcd/,
                use: [
                    {
                        loader: 'eslint-loader',
                        options: {
                            ignorePath: path.join(__dirname, config.paths.rootPathRelativeToCompiler, '.eslintignore')
                        }
                    }
                ]
            },
            {
                test: /.js?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            comments: true
                        }
                    }
                ]
            }
        ]
    }
});

export default clientConfiguration;
