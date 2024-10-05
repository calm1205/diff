import path from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(
        path.dirname(fileURLToPath(new URL(import.meta.url))),
        "./src",
      ),
    },
  },
})
