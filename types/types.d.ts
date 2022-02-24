
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'debug';
    readonly HOST: string;
    readonly PORT: number;
  }
}