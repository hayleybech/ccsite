import {defineConfig, loadEnv} from 'vite';
import laravel from 'laravel-vite-plugin';
// import vue2 from '@vitejs/plugin-vue2';


export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), ['VITE_', 'APP_']);
    const appUrl = env.APP_URL ? env.APP_URL.replace(/https?:\/\//, '') : 'localhost';

    return {
        plugins: [
            laravel({
                input: [
                    'resources/css/site.css',
                    'resources/js/site.js',

                    // Control Panel assets.
                    // https://statamic.dev/extending/control-panel#adding-css-and-js-assets
                    // 'resources/css/cp.css',
                    // 'resources/js/cp.js',
                ],
                refresh: true,
            }),
            // vue2(),
        ],
        server: {
            cors: true,
            port: 5173,
            host: '0.0.0.0',
            hmr: {
                host: appUrl,
            },
        },
    }
});
