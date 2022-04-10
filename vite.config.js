import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  server: {
    host: '::',
    port: 3777,
    proxy: {
      '/3rd/bd-auth': {
        target: 'https://aip.baidubce.com/oauth/2.0/token',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/3rd\/bd-auth/, '')
      },
      '/3rd/bd-bkimg': {
        target: 'https://bkimg.cdn.bcebos.com/pic',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/3rd\/bd-bkimg/, ''),
        headers: {
          Referer: 'https://baike.baidu.com/'
        }
      },
      '/3rd/bd-plant': {
        target: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/3rd\/bd-plant/, '')
      }
    }
  },
  plugins: [vue()]
})
