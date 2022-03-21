export {};
declare global {
  type DeepPartial<T> = T extends object
    ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
    : T;

  type PromiseFunctionType<T> = (args: any[]) => Promise<T>;

  type UnPromisifyFunction<T> = T extends PromiseFunctionType<infer U> ? U : never;

  type UnPromisify<T> = T extends Promise<infer U> ? U : never;

  type UnArray<T> = T extends Array<infer U> ? U : never;

  type NonObjectPropKeys<T> = { [K in keyof T]: T[K] extends any[] ? K : T[K] extends object ? never : K }[keyof T];

  type ArrayPropKeys<T> = {
    [K in keyof T]: T[K] extends Array<unknown> ? K : never;
  }[keyof T];

  type ObjectAndArrayPropKeys<T> = { [K in keyof T]: T[K] extends any[] | object ? K : never }[keyof T];

  type NonObjectPicks<T> = Pick<T, NonObjectPropKeys<T>>;

  type ArrayPicks<T> = Pick<T, ArrayPropKeys<T>>;

  type NonArrayPicks<T> = Pick<T, Exclude<keyof T, keyof ArrayPicks<T>>>;

  type ObjectPicks<T> = Pick<T, Exclude<keyof T, NonObjectPropKeys<T>>>;

  type NonObjectAndArrayPicks<T> = Pick<T, Exclude<keyof T, ObjectAndArrayPropKeys<T>>>;

  type ObjectAndArrayPicks<T> = Pick<T, Exclude<keyof T, keyof NonObjectAndArrayPicks<T>>>;

  type Obj<T> = T extends object ? T : never;

  type IsArray<T> = T extends Array<unknown> ? T : never;

  type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

  type FlattenObjectKey<T> = {
    default: T extends object
      ? UnionToIntersection<Obj<T[keyof T]>> extends object
        ? NonObjectPicks<T> & FlattenObjectKey<ObjectPicks<T>[keyof ObjectPicks<T>]>
        : T
      : never;
    array: T;
  }[T extends any[] ? 'array' : T extends object ? 'default' : never];

  type CascadeSelectPropsKey<T> = {
    default: T extends object
      ? Obj<T[keyof T]> extends object
        ? NonObjectAndArrayPicks<T> | CascadeSelectPropsKey<ObjectAndArrayPicks<T>[keyof ObjectAndArrayPicks<T>]>
        : T
      : T extends Array<unknown>
        ?
        | NonObjectAndArrayPicks<UnArray<T>>
        | CascadeSelectPropsKey<ObjectAndArrayPicks<UnArray<T>>[keyof ObjectAndArrayPicks<UnArray<T>>]>
        : T;
    array: CascadeSelectPropsKey<UnArray<T>> | T;
  }[T extends any[] ? 'array' : T extends object ? 'default' : never];

  type FlattenObject<T extends object> = NonObjectPicks<T> &
  UnionToIntersection<FlattenObjectKey<ObjectPicks<T>[keyof ObjectPicks<T>]>>;

  type FlattenCascaded<T> = UnionToIntersection<
  T | NonObjectAndArrayPicks<T> | CascadeSelectPropsKey<ObjectAndArrayPicks<T>[keyof ObjectAndArrayPicks<T>]>
  >;

  type PartialFlattenCascaded<T> = DeepPartial<FlattenCascaded<T>>;

  type CascadeSelectProps<T extends object> = PartialFlattenCascaded<T>;
}
