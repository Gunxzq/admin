import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { viteMockServe } from 'vite-plugin-mock';
import Inspect from 'vite-plugin-inspect';
import { visualizer } from 'rollup-plugin-visualizer';
export default defineConfig((command, mode) => {
  const env = loadEnv(mode, process.cwd());
  return {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        // 开发环境使用mock
        enable: true,
        // enable:command=='serve',
        mockPath: 'mock',
      }),
      Inspect(),
      // eslintPlugin({
      //   include:['src/**/*.ts','src/**/*.vue','src/*.js','src/*.vue']
      // }),
      visualizer({
        emitFile: false,
        file: 'stats.html',
        open: true,
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
      postcss: {
        plugins: [],
      },
    },
    // server: {
    //   [env.VITE_APP_BASE_API]: {
    //     target: env,
    //     // 跨域设置
    //     changeOriger: true,
    //     // 去掉路径中的字段
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  };
});
