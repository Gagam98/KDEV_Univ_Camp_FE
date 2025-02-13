import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "@@", replacement: "/src/routes/pages" },
      { find: "@pages", replacement: "/src/routes/pages" },
    ],
  },
});
