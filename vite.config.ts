import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import WindiCSS from 'vite-plugin-windicss'
import Pages from 'vite-plugin-pages'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()))

  return {
    resolve: {},
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            '@ant-prefix': process.env.VITE__CSS_PREFIX_CLS,
          },
        },
      },
    },
    server: {
      host: '0.0.0.0',
    },
    plugins: [
      tsconfigPaths(),
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
      Pages({
        resolver: 'react',
        dirs: [
          {
            dir: 'src/pages',
            baseRoute: '',
            filePattern: '**/*/index.tsx',
          },
          {
            dir: 'src/demos',
            baseRoute: 'demos',
          },
        ],
      }),
      WindiCSS(),
    ],
  }
})
