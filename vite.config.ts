import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import styleImport, { AntdResolve } from 'vite-plugin-style-import'
import WindiCSS from 'vite-plugin-windicss'
import vitePluginIntegrationIntlMessage from './build/vitePluginIntegrationIntlMessage'

const resolveCwd = (...arg) => path.resolve(process.cwd(), ...arg)

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
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
        modifyVars: {
          // https://github.com/vitejs/vite/issues/1930
          '@ant-prefix': loadEnv(mode, process.cwd()).VITE___PREFIX_CLS__,
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
  },
  plugins: [
    vitePluginIntegrationIntlMessage(),
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    styleImport({
      resolves: [
        AntdResolve(),
      ],
    }),
    WindiCSS(),
  ],
}))
