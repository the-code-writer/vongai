import path from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh';

const SRC_DIR = path.resolve(__dirname, './src');
const PUBLIC_DIR = path.resolve(__dirname, './public');
const BUILD_DIR = path.resolve(__dirname, './www');

require("dotenv").config();

const $envPrefix = `VNG_`;

const viteEnv = {}

Object.keys(process.env).forEach((key) => {
  if (key.startsWith($envPrefix)) {
    viteEnv[`import.meta.env.${key}`] = process.env[key];
  }
});

//console.warn("::: VITE ENV :::", viteEnv);

export default {
  //define: viteEnv,
  plugins: [
    reactRefresh(),
  ],
  root: SRC_DIR,
  base: '',
  publicDir: PUBLIC_DIR,
  build: {
    outDir: BUILD_DIR,
    assetsInlineLimit: 0,
    emptyOutDir: true,
    rollupOptions: {
      treeshake: false,
      format: 'umd',
    },
  },
  resolve: {
    alias: {
      '@': SRC_DIR,
    },
  },
  server: {
    host: true,
  },
  worker: {
    format: "es",
    fileName: (filename, format) => `${filename}-worker.${format === "es" ? "mjs" : "js"}`
  },
  envDir: "/",
  envPrefix: $envPrefix,
};
