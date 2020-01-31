import buildConfig from './build-config';

const PORT_SERVER = 3000;
const getDevModeConfig = ({ path, webpack }) => {
    const {
        paths: { outputBasePath }
    } = buildConfig();

    return {
        devtool: 'sourcemap',
        devServer: {
            hot: true,
            open: true,
            inline: true,
            compress: true,
            host: 'localhost', // Defaults to localhost
            openPage: '',
            port: buildConfig().PORT,
            contentBase: path.join(__dirname, outputBasePath),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
            },
            proxy: {
                '/': {
                    target: `https://localhost:${PORT_SERVER}/`,
                    secure: false
                }
            }
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                }
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin({
                multiStep: false
            })
        ]
    };
};

export default getDevModeConfig;
