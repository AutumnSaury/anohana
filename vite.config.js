import { defineConfig } from "vite"

export default defineConfig({
  server: {
    port: 3777,
    proxy: {
      '/3rd/bd_auth': {
        target: 'https://aip.baidubce.com/oauth/2.0/token',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/3rd\/bd_auth/, '')
      },
      '/3rd/bd_bkimg': {
        target: 'https://bkimg.cdn.bcebos.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/3rd\/bd_bkimg/, '')
      },
      '3rd/bd_plant': {
        target: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/3rd\/bd_palnt/, '')
      },
    }
  }
})