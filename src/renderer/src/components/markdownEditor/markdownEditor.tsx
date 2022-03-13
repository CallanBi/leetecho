import * as React from 'react';
import styled from '@emotion/styled';
import { css, Global } from '@emotion/react';
import { MilkDownFullEditor, Mode } from './components/milkdownEditor/milkdownFullEditor';
import markdownEditorStyle from './styles';
import EditorToolBars from './components/editorToolBars';

const { useRef, useState, useEffect, useMemo } = React;

interface MarkdownEditorProps {
  isReadOnly?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = (props: MarkdownEditorProps) => {
  const {
    isReadOnly = false,
    value = '',
    onChange = () => {
      /* noop */
    },
  } = props;

  const [mode, setMode] = useState<Mode>(Mode.Default);

  const toggleMode = () => {
    setMode(mode === Mode.Default ? Mode.TwoSide : Mode.Default);
  };

  return (
    <section style={{ marginTop: 12, marginBottom: 12 }}>
      <EditorToolBars mode={mode} toggleMode={toggleMode}></EditorToolBars>
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
