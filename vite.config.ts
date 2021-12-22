import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import styleImport, { AntdResolve } from 'vite-plugin-style-import'
import vitePluginIntegrationIntlMessage from './build/vitePluginIntegrationIntlMessage'

const resolveCwd = (...arg) => path.resolve(process.cwd(), ...arg)

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolveCwd('./src'),
      '@components': resolveCwd('./src/shared/components'),
      '@const': resolveCwd('./src/shared/const'),
      '@hooks': resolveCwd('./src/shared/hooks'),
      '@utils': resolveCwd('./src/shared/utils'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    vitePluginIntegrationIntlMessage(),
    react(),
    styleImport({
      resolves: [
        AntdResolve(),
      ],
    }),
  ],
})
