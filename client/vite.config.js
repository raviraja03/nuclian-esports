import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // removes console.log/error/warn in prod
      },
    },
  },

  base: "/", // Set base to root for proper routing
});
