/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE___PREFIX_CLS__: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
