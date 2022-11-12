import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import analyze from 'rollup-plugin-analyzer';
import { externals } from 'shared-base';
import p from './package.json';

export default defineConfig({
    plugins: [
        dts({
            insertTypesEntry: true,
        }),
    ],
    build: {
        sourcemap: true,
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'Dnd',
            formats: ['es', 'umd'],
            fileName: (format) => `dnd.${format}.js`,
        },
        rollupOptions: {
            plugins: [analyze()],
            ...externals({
                react: '',
                'react-dom': '',
                'react/jsx-runtime': '',
                ...p.dependencies,
            }),
        },
    },
});
