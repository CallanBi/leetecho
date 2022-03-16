declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'debug';
    readonly HOST: string;
    readonly PORT: number;
  }
}

declare module '*.md' {
  // "unknown" would be more detailed depends on how you structure frontmatter
  const attributes: Record<string, unknown>;

  // Modify below per your usage
  export { attributes };
}
