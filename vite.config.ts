import {resolve} from 'path';
import {defineConfig} from 'vite';
import react, {reactCompilerPreset} from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
    publicDir: 'themes',
    plugins: [
        react(),
        babel({presets: [reactCompilerPreset()]}),
        tailwindcss(),
        dts({tsconfigPath: 'tsconfig.lib.json'}),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'lib/index.ts'),
            formats: ['es'],
        },
        rolldownOptions: {
            external: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime'],
            output: {
                entryFileNames: '[name].js',
                assetFileNames: '[name][extname]',
                minify: {
                    compress: true,
                    mangle: false
                }
            }
        }
    },
    resolve: {
        tsconfigPaths: true
    }
});
