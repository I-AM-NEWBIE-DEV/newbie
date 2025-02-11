import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy';
import compression from 'vite-plugin-compression';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      // 指定兼容的浏览器范围（支持Browserslist语法）
      targets: ['ie >= 11', 'chrome <= 60', 'Android >= 4.4'],
      // 补充必要的Polyfill
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      // 显式列出需要的Polyfill（按需选择）
      polyfills: [
        'es.symbol',
        'es.promise',
        'es.promise.finally',
        'es/map',
        'es/set',
        'es.array.filter',
        'es.object.define-properties',
        'esnext.global-this'
      ],
      // 生成传统浏览器的Chunk文件
      renderLegacyChunks: true
    }),
    // compression({
    //   ext: '.br',
    //   deleteOriginFile: false,
    //   threshold: 1024 * 10,
    //   algorithm: 'brotli',
    //   compressOptions: {
    //     params: {
    //       [require('zlib').constants.BROTLI_PARAM_QUALITY]: 11
    //     }
    //   }
    // }),
    compression({
      ext: '.gz',
      deleteOriginFile: false,
      threshold: 1024 * 10,
      algorithm: 'gzip',
      compressOptions: {
        level: 9
      }
    })
  ],
  define: {
    'process.env': {}
  },
  envPrefix: 'VITE_',
  server: {
    host: '0.0.0.0',
    // https: true,
    // port: 3000,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8080',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  },
  build: {
    // sourcemap: true,
    // 设置构建目标为ES2015（兼容大多数低版本浏览器）
    target: 'es2015',
    // 使用terser压缩代码
    minify: 'terser',
    terserOptions: {
      compress: { drop_console: true } // 生产环境移除console
    }
  }
})
