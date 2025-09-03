/// <reference types="vite/client" />

declare global {
  interface ImportMetaEnv {
    readonly VITE_APP_NAME: string
    // adicione mais variáveis de ambiente conforme necessário
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
    readonly glob: (pattern: string) => Record<string, () => Promise<any>>
  }
}
