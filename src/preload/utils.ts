import { shell } from 'electron';

/** docoment ready */
export function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
  return new Promise((resolve) => {
    if (condition.includes(document.readyState)) {
      resolve(true);
    } else {
      document.addEventListener('readystatechange', () => {
        if (condition.includes(document.readyState)) {
          resolve(true);
        }
      });
    }
  });
}

export const openExternal = (url: string): string => {
  try {
    shell.openExternal(url);
    return '';
  } catch (e) {
    return (e as Error)?.message ?? 'unable to open external url';
  }
};
