import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// The site is served from the root of https://zahid.greyfabric.store/
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
});

