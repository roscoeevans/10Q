import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-plugin-tsconfig-paths'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    tsconfigPaths() // Ensures TypeScript paths are resolved correctly
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'], // Ensure TypeScript and JavaScript files are resolved, remove jsx
  },
  base: './', // Ensures correct relative paths for GitHub Pages
  esbuild: {
    loader: 'tsx', // Ensures TSX is transformed into JavaScript
    include: /src\/.*\.(tsx|ts)?$/, // Apply to all TSX/TS files in src/
  },
  build: {
    outDir: 'dist',
    assetsDir: '', // Places assets directly in dist/
    rollupOptions: {
      input: { 
        main: path.resolve(__dirname, 'src/main.tsx') // Explicitly define main.tsx as the entry point
      },
      output: {
        entryFileNames: '[name].js', // Ensures main.js is created
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    },
    emptyOutDir: true, // Clears dist/ before rebuilding
    manifest: true, // Generates a manifest.json to track built files
    sourcemap: false, // Disables sourcemaps for cleaner builds
    minify: true, // Re-enable minification for production
    target: 'esnext', // Ensures compatibility with modern JS features
    outExtension: { '.js': '.js' } // Force JS extension
  },
  server: {
    open: true, // Automatically opens browser on dev
  }
})
