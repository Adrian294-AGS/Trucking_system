import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    host: true, // allow IP access
    port: 3000,

    proxy: {
      "/api": {
        target: "http://192.168.100.90:5000", // your backend port
        changeOrigin: true,
        secure: false,
      },
      "/socket.io": {
        target: "http://192.168.100.90:5000",
        changeOrigin: true,
        ws: true, // important: enables WebSocket proxying
      },
    },
  },

  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
