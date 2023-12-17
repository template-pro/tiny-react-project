/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE__CSS_PREFIX_CLS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
