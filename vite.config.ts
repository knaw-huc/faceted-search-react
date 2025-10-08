import {resolve} from 'path';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
    publicDir: 'themes',
    plugins: [
        tsconfigPaths(),
        react(),
        tailwindcss(),
        dts({tsconfigPath: 'tsconfig.lib.json'}),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'lib/index.ts'),
            formats: ['es'],
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime'],
            output: {
                entryFileNames: '[name].js',
                assetFileNames: '[name][extname]',
            }
        }
    },
    esbuild: {
        minifyIdentifiers: false
    }
});
