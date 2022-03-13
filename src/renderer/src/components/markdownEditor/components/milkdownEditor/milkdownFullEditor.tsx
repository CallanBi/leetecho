import * as React from 'react';

import { MilkdownEditor, MilkdownRef } from './milkdownEditor/MilkdownEditor';
import { CodeMirror, CodeMirrorRef } from './CodeMirror';

type MilkDownFullEditorProps = {
  mode?: Mode;
  isDarkMode?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  isReadOnly?: boolean;
};

export enum Mode {
  Default,
  TwoSide,
}

const MilkDownFullEditor = ({
  mode = Mode.Default,
  isDarkMode = false,
  value = '',
  onChange = () => {
    /* noop */
  },
  isReadOnly = false,
}: MilkDownFullEditorProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const lockCode = React.useRef(isReadOnly);
  const milkdownRef = React.useRef<MilkdownRef>(null);
  const codeMirrorRef = React.useRef<CodeMirrorRef>(null);
  // const [md, setMd] = React.useState('');

  // React.useEffect(() => {
  //   import('./content/index.zh-hans.md')
  //     .then((x) => {
  //       setMd(x.default);
  //       return;
  //     })
  //     .catch(console.error);
  // }, []);

  const milkdownListener = React.useCallback((markdown: string) => {
    const lock = lockCode.current;
    if (lock) return;

    const { current } = codeMirrorRef;
    if (!current) return;
    current.update(markdown);
  }, []);

  const onCodeChange = React.useCallback((getCode: () => string) => {
    const { current } = milkdownRef;
    if (!current) return;
    const value = getCode();
    current.update(value);
  }, []);

  return !value.length ? null : (
    <div ref={ref}>
      <div style={{ display: mode === Mode.TwoSide ? 'none' : 'block' }}>
        <MilkdownEditor
          ref={milkdownRef}
          content={value}
          onChange={milkdownListener}
          isDarkMode={isDarkMode}
          readOnly={isReadOnly}
        />
      </div>
      <div style={{ display: mode === Mode.TwoSide ? 'block' : 'none' }}>
        <CodeMirror ref={codeMirrorRef} value={value} onChange={onCodeChange} lock={lockCode} isReadOnly={isReadOnly} />
      </div>
    </div>
  );
};

export { MilkDownFullEditor };
