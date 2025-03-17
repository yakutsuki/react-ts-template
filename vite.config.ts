import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import mkcert from 'vite-plugin-mkcert';
import { resolve } from 'path';
import dayjs from 'dayjs';
import { name, version, engines, dependencies, devDependencies } from './package.json';

/** 平台的名称、版本、运行所需的`node`和`pnpm`版本、依赖、最后构建时间的类型提示 */
const __APP_INFO__ = {
  pkg: { name, version, engines, dependencies, devDependencies },
  lastBuildTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
};

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd(), '');
  const base = env.VITE_BASE_URL || '/';

  return {
    base,
    plugins: [react(), tsconfigPaths(), mkcert({ source: 'coding' })],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 9527,
      open: true,
      // 端口被占用时，是否直接退出
      strictPort: false,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
      // 是否允许跨域
      cors: true,
      // 预热文件以提前转换和缓存结果，降低启动期间的初始页面加载时长并防止转换瀑布
      warmup: {
        clientFiles: ['./index.html', './src/{pages,components}/*'],
      },
    },
    build: {
      target: 'es2015',
      sourcemap: false,
      // 是否开启 gzip 压缩大小报告，禁用时能略微提高构建性能
      reportCompressedSize: false,
      // 单个 chunk 文件的大小超过 2048kB 时发出警告
      chunkSizeWarningLimit: 2048,
      rollupOptions: {
        input: {
          index: resolve('./index.html', import.meta.url),
        },
        // 静态资源分类打包
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
    esbuild:
      mode === 'production'
        ? {
            // 打包构建时移除 console.log
            pure: ['console.log'],
            // 打包构建时移除 debugger
            drop: ['debugger'],
            // 打包构建时移除所有注释
            legalComments: 'none',
          }
        : {},
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
  };
});
