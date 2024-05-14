import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
        host: "localhost",
    },
    plugins: [
        laravel({
            input: ["resources/js/app.tsx", "resources/css/app.css"],
            ssr: "resources/js/ssr.tsx",
            refresh: true,
        }),
        react(),
    ],
});
