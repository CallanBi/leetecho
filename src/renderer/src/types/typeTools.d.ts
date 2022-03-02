export { };
declare global {
  type PromiseFunctionType<T> = (args: any[]) => Promise<T>;

  type UnPromisifyFunction<T> = T extends PromiseFunctionType<infer U> ? U : never;

  type UnPromisify<T> = T extends Promise<infer U> ? U : never;

  type UnArray<T> = T extends Array<infer U> ? U : never;
}