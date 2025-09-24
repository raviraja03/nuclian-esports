import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [tailwindcss(), react()],
    server: {
      port: parseInt(env.VITE_PORT) || 3000,
      host: true, // allows external access
      allowedHosts: ['www.tribexesports.com'], // whitelist your host
    },
    preview: {
      port: parseInt(env.VITE_PORT) || 5000,
      host: true,
    },
    base: "/", // Set base to root for proper routing
  };
});
