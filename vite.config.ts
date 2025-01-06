import {sveltekit} from '@sveltejs/kit/vite';
import {defineConfig} from 'vite';
import { config } from 'dotenv';

export default defineConfig(({mode}) => {
  config({ path: `.env.${mode}` });


  return ({
    plugins: [sveltekit()],
    define: {
      'process.env': process.env,
    },
    resolve: {
      conditions: mode === 'test' ? ['browser'] : [],
    },
    test: {
      globals: true,
      environment: 'jsdom',
      include: ['src/**/*.{test,spec}.{js,ts}'],
      setupFiles: ['./src/setup-tests.ts'],
    }
  });
});
