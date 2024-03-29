import { defaultValueCtx, Editor, editorViewCtx, editorViewOptionsCtx, rootCtx } from '@milkdown/core';
import { clipboard } from '@milkdown/plugin-clipboard';
import { cursor } from '@milkdown/plugin-cursor';
import { diagram } from '@milkdown/plugin-diagram';
import { emoji } from '@milkdown/plugin-emoji';
import { history } from '@milkdown/plugin-history';
import { indent } from '@milkdown/plugin-indent';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { math } from '@milkdown/plugin-math';
import { menu } from '@milkdown/plugin-menu';
import { prism } from '@milkdown/plugin-prism';
import { slash } from '@milkdown/plugin-slash';
import { tooltip } from '@milkdown/plugin-tooltip';
import { upload } from '@milkdown/plugin-upload';
import { gfm } from '@milkdown/preset-gfm';
import { nordLight } from '@milkdown/theme-nord';

import { codeSandBox } from './codeSandBox';
import { menuConfig } from './menuConfig';

import 'katex/dist/katex.min.css';

import { commonmark, codeFence } from '@milkdown/preset-gfm';

const nodes = commonmark.configure(codeFence, {
  languageList: [
    '--',
    'leetecho',
    'javascript',
    'typescript',
    'bash',
    'sql',
    'json',
    'html',
    'css',
    'c',
    'cpp',
    'java',
    'ruby',
    'python',
    'go',
    'rust',
    'markdown',
  ],
});

export const createEditor = (
  root: HTMLElement | null,
  defaultValue: string,
  readOnly: boolean | undefined,
  setEditorReady: (ready: boolean) => void,
  isDarkMode: boolean,
  onChange?: (markdown: string) => void,
) => {
  const editor = Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, root);
      ctx.set(defaultValueCtx, defaultValue);
      ctx.update(editorViewOptionsCtx, (prev) => ({ ...prev, editable: () => !readOnly }));
      if (onChange) {
        ctx
          .get(listenerCtx)
          .markdownUpdated((_, markdown) => {
            onChange(markdown);
          })
          .mounted(async (ctx) => {
            setEditorReady(true);
            // if (import.meta.env.DEV) {
            //   const view = ctx.get(editorViewCtx);
            //   const prosemirrorDevTools = await import('prosemirror-dev-tools');
            //   prosemirrorDevTools.default(view);
            // }
          });
      }
    })
    .use(nordLight)
    .use(nodes)
    .use(codeSandBox)
    .use(listener)
    .use(clipboard)
    .use(history)
    .use(cursor)
    .use(prism)
    .use(diagram)
    .use(tooltip)
    .use(math)
    .use(emoji)
    .use(indent)
    .use(upload)
    .use(slash);

  if (!readOnly) {
    editor.use(
      menu({
        config: menuConfig,
      }),
    );
  }

  return editor;
};
