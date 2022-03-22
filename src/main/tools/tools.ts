import to from 'await-to-js';
import { format, toDate } from 'date-fns';
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

export const safeJSONParse = (str: string) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
};

/**
 * parse jsonOrObj string to object recursively
 * @param jsonOrObj string | Record<string, unknown>
 * @returns object
 */
export const parseJsonRecursively = (jsonOrObj: string | Record<string, unknown>): any => {
  if (typeof jsonOrObj === 'string') {
    try {
      const objWithInnerJSON = JSON.parse(jsonOrObj);
      if (!Array.isArray(objWithInnerJSON)) {
        return Object.entries(objWithInnerJSON).reduce((acc, [k, v]) => {
          if (typeof v === 'object') {
            if (Array.isArray(v)) {
              return {
                ...acc,
                [k]: v.map((e) => {
                  const ele = safeJSONParse(e);
                  return ele !== null && (typeof ele === 'object' || Array.isArray(ele)) ? parseJsonRecursively(e) : e;
                }),
              };
            }
            if (JSON.stringify(v) === '{}') {
              return { ...acc, [k]: v };
            }
            if (typeof v === 'string') {
              const o = safeJSONParse(v);
              return {
                ...acc,
                [k]: o !== null && (typeof o === 'object' || Array.isArray(o)) ? parseJsonRecursively(v) : v,
              };
            }
            if (v instanceof Object) {
              return { ...acc, [k]: parseJsonRecursively(v as Record<string, unknown>) };
            }
          }
          return { ...acc, [k]: v };
        }, {});
      } else {
        return objWithInnerJSON.map((e) => {
          const ele = safeJSONParse(e);
          return ele !== null && (typeof ele === 'object' || Array.isArray(ele)) ? parseJsonRecursively(e) : e;
        });
      }
    } catch (e) {
      return {};
    }
  } else {
    if (!Array.isArray(jsonOrObj)) {
      return Object.entries(jsonOrObj).reduce((acc, [k, v]) => {
        if (typeof v === 'object') {
          if (Array.isArray(v)) {
            return {
              ...acc,
              [k]: v.map((e) => {
                const ele = safeJSONParse(e);
                return ele !== null && (typeof ele === 'object' || Array.isArray(ele)) ? parseJsonRecursively(e) : e;
              }),
            };
          }
          if (JSON.stringify(v) === '{}') {
            return { ...acc, [k]: v };
          }
          if (typeof v === 'string') {
            const o = safeJSONParse(v);
            return {
              ...acc,
              [k]: o !== null && (typeof o === 'object' || typeof o === 'string') ? parseJsonRecursively(v) : v,
            };
          }
          if (v instanceof Object) {
            return { ...acc, [k]: parseJsonRecursively(JSON.stringify(v)) };
          }
        } else if (Array.isArray(v)) {
          return v.map((e) => {
            const ele = safeJSONParse(e);
            return ele !== null && (typeof ele === 'object' || typeof ele === 'string') ? parseJsonRecursively(e) : e;
          });
        } else if (typeof v === 'string') {
          const o = safeJSONParse(v);
          return {
            ...acc,
            [k]: o !== null && (typeof o === 'object' || typeof o === 'string') ? parseJsonRecursively(v) : v,
          };
        }
        return { ...acc, [k]: v };
      }, {});
    } else {
      return jsonOrObj.map((e) => {
        const ele = safeJSONParse(e);
        return ele !== null && (typeof ele === 'object' || Array.isArray(ele)) ? parseJsonRecursively(e) : e;
      });
    }
  }
};

/**
 * Format timestamp to date string with 'yyyy/MM/dd H:mm' format
 * @param timestamp string | number
 * @returns string
 */
export function formatTimeStamp(timestamp: string | number) {
  return format(toDate(Number(timestamp) * 1000), 'yyyy/MM/dd H:mm');
}

/**
 * Erase ```leetecho``` syntax wrapper from the given template string.
 * @param templ string
 * @returns string
 */
export function formatLeetechoSyntax(templ: string): string {
  let copiedTempl = templ;
  const reg = /(?<syntaxStart>```leetecho)(?<syntaxContent>[\s\S]*?)(?<syntaxEnd>```[\s]*)/g;
  const results = templ.matchAll(reg);
  if (results) {
    for (const result of results) {
      const { syntaxStart, syntaxContent, syntaxEnd } = result.groups as {
        syntaxStart: string;
        syntaxContent: string;
        syntaxEnd: string;
      };
      if (syntaxStart && syntaxEnd) {
        const content = syntaxContent.replace(/\\`\\`\\`/g, '```');
        copiedTempl = copiedTempl.replace(syntaxStart + syntaxContent + syntaxEnd, content);
      }
    }
  }
  return copiedTempl;
}

/**
 * find all base64 img match groups in the given template string
 * @param content string
 * @returns param: { imgTitle: string; imgSrc: string; }[] | undefined
 */
export function findAllBase64MarkdownImgs(content: string) {
  const reg = /!\[(?<imgTitle>.*?)\]\((data:image\/png;base64,)(?<imgSrc>.*?)\)/g;
  const results = content.matchAll(reg);
  if (results) {
    return Array.from(results).map(
      (result) =>
        result.groups as {
          imgTitle: string;
          imgSrc: string;
        },
    );
  }
}

/**
 * replace all base64 img syntax in the given template string with the given replacement callback function
 * @param content string
 * @param imgTitle string
 * @param replaceSrc string
 * @returns
 */
export function replaceAllBase64MarkdownImgs(content: string, cb: (imgTitle: string, imgSrc: string) => string) {
  let copiedContent = content;
  const reg = /!\[(?<imgTitle>.*?)\]\((?<base64Syntax>data:image\/png;base64,)(?<imgSrc>.*?)\)/g;
  const results = content.matchAll(reg);
  if (results) {
    for (const result of results) {
      const {
        imgTitle: title,
        imgSrc: src,
        base64Syntax,
      } = result.groups as {
        imgTitle: string;
        imgSrc: string;
        base64Syntax: string;
      };
      copiedContent = copiedContent.replace(`![${title}](${base64Syntax}${src})`, cb(title, src));
    }
  }
  return copiedContent;
}

/**
 * Erase :problemFilter{""} syntax wrapper from the given template string and replace it by callback function.
 * @param content string
 * @returns string
 */
export async function replaceProblemFilterSyntax(
  content: string,
  cb: (filterStr: string) => Promise<string>,
): Promise<string> {
  let copiedContent = content;
  const reg = /(?<syntax>:problemFilter{"(?<filterStr>.*?)"})/g;
  const results = content.matchAll(reg);
  if (results) {
    for (const result of results) {
      const { filterStr, syntax } = result.groups as { filterStr: string; syntax: string };
      const [err, res] = await to(cb(filterStr));
      if (err) {
        throw err;
      }

      copiedContent = copiedContent.replace(syntax, res as string);
    }
  }
  return copiedContent;
}
