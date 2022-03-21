/* eslint-disable react/display-name */
import Loading from '@/components/illustration/loading/loading';
import { editorViewCtx, parserCtx } from '@milkdown/core';
import { Slice } from '@milkdown/prose';
import { EditorRef, ReactEditor, useEditor } from '@milkdown/react';
import React, { forwardRef } from 'react';
import { COLOR_PALETTE } from 'src/const/theme/color';

import { createEditor } from './editor';
import { Content, useLazy } from './useLazy';

type Props = {
  content: Content;
  readOnly?: boolean;
  onChange?: (markdown: string) => void;
  isDarkMode?: boolean;
};

export type MilkdownRef = { update: (markdown: string) => void };
export const MilkdownEditor = forwardRef<MilkdownRef, Props>(({ content, readOnly, onChange, isDarkMode }, ref) => {
  const editorRef = React.useRef<EditorRef>(null);
  const [editorReady, setEditorReady] = React.useState(false);

  const [loading, md] = useLazy(content);

  React.useImperativeHandle(ref, () => ({
    update: (markdown: string) => {
      if (!editorReady || !editorRef.current) return;
      const editor = editorRef.current.get();
      if (!editor) return;
      editor.action((ctx) => {
        const view = ctx.get(editorViewCtx);
        const parser = ctx.get(parserCtx);
        const doc = parser(markdown);
        if (!doc) return;
        const state = view.state;
        view.dispatch(state.tr.replace(0, state.doc.content.size, new Slice(doc.content, 0, 0)));
      });
    },
  }));

  const editor = useEditor(
    (root) => createEditor(root, md, readOnly, setEditorReady, isDarkMode, onChange),
    [readOnly, md, onChange, isDarkMode],
  );

  return (
    <div>
      {loading ? (
        <section
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND,
            height: 250,
          }}
        >
          <section style={{ display: 'flex' }}>
            <Loading style={{ width: 36, height: 36 }}></Loading>
          </section>
        </section>
      ) : (
        <ReactEditor ref={editorRef} editor={editor} />
      )}
    </div>
  );
});
