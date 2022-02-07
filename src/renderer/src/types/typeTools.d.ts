/**
 * 从对象中拿到值的类型
 */
export type GetObjValType<R extends Record<string, unknown>, K extends string> = R extends Record<string, infer P> ? (K extends P ? R[K] : never) : never;