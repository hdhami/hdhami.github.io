import react from 'react';
import reactDom from 'react-dom';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/pagination.js',
    output: {
        file: 'dist/pagination.js',
        format: 'iife'
    },
    plugins: [
        resolve({
            extensions: ['.js', '.jsx']
        }),
        babel(),
        commonjs({
            extensions: ['.js', '.jsx'],
            include: 'node_modules/**',
            namedExports: {
                react: Object.keys(react),
                'react-dom': Object.keys(reactDom)
            }
        }),
        terser()
    ]
};
