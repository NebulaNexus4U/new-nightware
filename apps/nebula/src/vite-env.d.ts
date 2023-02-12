/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_NODE_ENV: string;
  readonly VITE_NEXUS_BASE_URL: string;
  readonly VITE_THEME_COLOR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
