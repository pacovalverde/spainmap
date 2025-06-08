import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig({
	plugins: [vue(), vueDevTools()],
	base: './',
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	build: {
		outDir: 'public', // destino: la carpeta pública servida por Laragon
		assetsDir: '',     // evita subcarpeta assets/
		rollupOptions: {
			output: {
				entryFileNames: `dist/index.js`,     // sin hash
				chunkFileNames: `dist/index.[name].js`, // opcional si usas code splitting
				assetFileNames: `dist/[name].[ext]`,
			},
		},

		emptyOutDir: false, // no borres toda la carpeta public
	},
});
