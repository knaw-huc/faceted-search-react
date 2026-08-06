import {copyFileSync} from 'node:fs';
import {defineConfig, esmExternalRequirePlugin} from 'vite';
import react, {reactCompilerPreset} from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import dts from 'unplugin-dts/vite';

// https://vite.dev/config/
export default defineConfig({
    publicDir: 'themes',
    plugins: [
        react(),
        babel({presets: [reactCompilerPreset({target: '19'})]}),
        esmExternalRequirePlugin({external: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime']}),
        tailwindcss(),
        dts({tsconfigPath: 'tsconfig.lib.json'}),
        {
            name: 'copy-tailwind-css', closeBundle() {
                copyFileSync('src/tailwind.css', 'dist/tailwind.css');
            }
        },
    ],
    build: {
        lib: {
            entry: 'src/index.ts',
            formats: ['es'],
        },
        rolldownOptions: {
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
