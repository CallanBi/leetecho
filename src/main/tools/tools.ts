import { isNil } from 'lodash';

interface DeleteNilValFunction {
  <T extends Record<string, unknown>>(obj: T): Partial<T>;
}

const filter: (val: unknown) => boolean = (val) => {
  switch (typeof val) {
    case 'number':
      return !isNaN(val);
    case 'function':
      return Boolean(val);
    case 'object':
      if (Array.isArray(val)) {
        return true;
      }
      return Boolean(val);
    case 'undefined':
      return false;
    case 'boolean':
      return true;
    case 'bigint':
      return true;
    case 'string':
      return Boolean(val);
    case 'symbol':
      return true;
    default:
      return Boolean(val) || false;
  }
};

/**
 * deleteNilVal: delete nil value in a given object with customized nil value definition.
 * @param obj T extends Record<string, unknown>
 * @returns Partial<T>
 */
export const deleteNilVal: DeleteNilValFunction = (obj) =>
  Object.entries(obj).reduce((acc, [k, v]) => {
    if (typeof v === 'object') {
      if (Array.isArray(v)) {
        return { ...acc, [k]: v.filter((e) => !isNil(e) && e !== '') };
      }
      if (JSON.stringify(v) === '{}') {
        return acc;
      }
      if (v instanceof Object) {
        return { ...acc, [k]: deleteNilVal(v as Record<string, unknown>) };
      }
      return filter(v) ? { ...acc, [k]: v } : acc;
    }
    return filter(v) ? { ...acc, [k]: v } : acc;
  }, {});
