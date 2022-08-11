/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-08-03 11:10:35
 * @LastEditTime: 2022-08-05 16:48:34
 */

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import htmlPlugin from 'vite-plugin-index-html';
import vueJsx from "@vitejs/plugin-vue-jsx";
import * as path from "path";
import getEnvConfig from "./getEnvConfig"
import { viteMockServe } from "vite-plugin-mock";

const env = getEnvConfig();
export default defineConfig({
  plugins: [vue(), vueJsx(),
  viteMockServe({ supportTs: true }),
  htmlPlugin({
    input: './src/main.ts',
    preserveEntrySignatures: 'exports-only',
  })
  ],
  base: './',
  server: {
    hmr: true,
    host: "0.0.0.0",
    port: 9001,
    // proxy: {
    //   [env.VITE_APP_BASE_API]: {
    //     target: env.VITE_APP_PEOXY_TARGET,
    //     changeOrigin: true,
    //     // rewrite: (path) => path.replace(new RegExp("^\\" + env.VITE_APP_IMAGES_BASE), '')
    //   },
    // }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@root": path.resolve(__dirname, "./"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@views": path.resolve(__dirname, "./src/views"),
    },
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
} as any);

