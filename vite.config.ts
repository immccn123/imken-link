import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite'

// import 'dotenv/config'

export default defineConfig({
	plugins: [
		sveltekit(), Icons({
			compiler: 'svelte',
		})
	]
});
