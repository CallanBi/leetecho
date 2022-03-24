/* eslint-disable react/display-name */

import { basicSetup, EditorState, EditorView } from '@codemirror/basic-setup';
import { markdown } from '@codemirror/lang-markdown';
import React from 'react';

type StateOptions = {
  onChange: (getString: () => string) => void;
  lock: React.MutableRefObject<boolean>;
  value?: string;
  isReadOnly?: boolean;
};

const createCodeMirrorState = ({ onChange, lock, value, isReadOnly = false }: StateOptions): Partial<EditorState> => {
  return EditorState.create({
    doc: value,
    extensions: [
      basicSetup,
      markdown(),
      EditorView.contentAttributes.of({ contenteditable: !isReadOnly }),
      EditorView.updateListener.of((v) => {
        if (v.focusChanged) {
          lock.current = v.view.hasFocus;
        }
        if (v.docChanged) {
          const getString = () => v.state.doc.toString();
          onChange(getString);
        }
      }),
    ],
  });
};

type ViewOptions = {
  root: HTMLElement;
} & StateOptions;

const createCodeMirrorView = ({ root, ...options }: ViewOptions) => {
  return new EditorView({
    state: createCodeMirrorState(options) as EditorState,
    parent: root,
  });
};

type CodeMirrorProps = {
  value: string;
  onChange: (getString: () => string) => void;
  lock: React.MutableRefObject<boolean>;
  isReadOnly?: boolean;
};

export type CodeMirrorRef = { update: (markdown: string) => void };

export const CodeMirror = React.forwardRef<CodeMirrorRef, CodeMirrorProps>(
  ({ value, onChange, lock, isReadOnly = false }, ref) => {
    const divRef = React.useRef<HTMLDivElement>(null);
    const editorRef = React.useRef<ReturnType<typeof createCodeMirrorView>>();
    const [focus, setFocus] = React.useState(false);

    React.useEffect(() => {
      if (!divRef.current) return;

      const editor = createCodeMirrorView({ root: divRef.current, onChange, lock, value, isReadOnly });
      editorRef.current = editor;

      return () => {
        editor.destroy();
      };
    }, [onChange, value, lock]);

    React.useImperativeHandle(ref, () => ({
      update: (value: string) => {
        const { current } = editorRef;
        if (!current) return;

        current.setState(createCodeMirrorState({ onChange, lock, value, isReadOnly }) as EditorState);
      },
    }));

    return (
      <div
        style={{
          flex: 1,
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      >
        <div ref={divRef} />
      </div>
    );
  },
);
