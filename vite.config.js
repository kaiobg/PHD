import { defineConfig } from 'vite';
import { glob } from 'glob';
import path from 'path';
import { fileURLToPath } from 'url';

export default defineConfig({
  appType: 'mpa',
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        glob.sync('./**/*.html').map(file => {
          if(file.includes('dist') || file.includes('node_modules')) {
            return;
          }

          return [
            path.dirname(path.relative('', file)),
            fileURLToPath(new URL(file, import.meta.url)),
          ];
        }).filter(Boolean),
      ),
    },
  },
  server: {
    open: '/home/',
    rewrites: [
      { source: '/:path*', destination: '/:path*/index.html' }
    ]
  },
  preview: {
    rewrites: [
      { source: '/:path*', destination: '/:path*/index.html' }
    ]
  },
});
