import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
        tailwindcss(),
        {
            name: 'fix-rollup-input',
            configResolved(config) {
                if (config.build) {
                    config.build.rollupOptions = config.build.rollupOptions || {};
                    if (config.build.rolldownOptions && config.build.rolldownOptions.input) {
                        config.build.rollupOptions.input = config.build.rolldownOptions.input;
                    }
                }
            }
        }
    ],
server: {
        cors: true,
        host: '0.0.0.0',
        hmr: {
            host: 'localhost',
        },
    },
});
