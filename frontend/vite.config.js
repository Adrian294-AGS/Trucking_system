import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // ✅ Manually load env variables in vite.config.js
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],

    server: {
      host: true,
      port: 3000,

      proxy: {
        "/api": {
          target: env.VITE_API_URL, // ✅ use env from loadEnv
          changeOrigin: true,
          secure: false,
        },
        "/socket.io": {
          target: env.VITE_API_URL, // ✅ same here
          changeOrigin: true,
          ws: true,
        },
      },
    },

    resolve: {
      alias: {
        "@": "/src",
      },
    },
  };
});