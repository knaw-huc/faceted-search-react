import {resolve} from 'path';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';
import {libInjectCss} from 'vite-plugin-lib-inject-css';

// https://vite.dev/config/
export default defineConfig({
    publicDir: 'themes',
    plugins: [
        react(),
        tailwindcss(),
        libInjectCss(),
        dts({
            rollupTypes: true,
            tsconfigPath: 'tsconfig.lib.json',
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'lib/index.ts'),
            formats: ['es'],
        },
        rollupOptions: {
            external: ['react', 'react/jsx-runtime'],
            output: {
                entryFileNames: '[name].js',
                assetFileNames: '[name][extname]',
            }
        }
    }
});
