/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client-react" />

interface ImportMetaEnv {
  readonly VITE__CSS_PREFIX_CLS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
