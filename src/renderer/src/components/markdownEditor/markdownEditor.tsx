import * as React from 'react';
import styled from '@emotion/styled';
import { css, Global } from '@emotion/react';
import { Mode } from './components/milkdownEditor/milkdownFullEditor';
import markdownEditorStyle from './styles';
import EditorToolBars from './components/editorToolBars';
import Loading from '../illustration/loading';

import MilkDownFullEditor from './components/milkdownEditor/milkdownFullEditor';

const { useRef, useState, useEffect, useMemo } = React;

interface MarkdownEditorProps {
  isReadOnly?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'normal' | 'template';
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = (props: MarkdownEditorProps) => {
  const {
    isReadOnly,
    value = '',
    onChange = () => {
      /* noop */
    },
    type = 'normal',
  } = props;

  const [mode, setMode] = useState<Mode>(Mode.Default);

  const toggleMode = () => {
    setMode(mode === Mode.Default ? Mode.TwoSide : Mode.Default);
  };

  return (
    <section style={{ marginTop: 0, marginBottom: 12 }}>
      <EditorToolBars type={type} mode={mode} toggleMode={toggleMode}></EditorToolBars>
      <Global styles={markdownEditorStyle}></Global>
      <MilkDownFullEditor
        mode={mode}
        isDarkMode={false}
        isReadOnly={isReadOnly}
        value={value}
        onChange={onChange}
      ></MilkDownFullEditor>
    </section>
  );
};

export default MarkdownEditor;
