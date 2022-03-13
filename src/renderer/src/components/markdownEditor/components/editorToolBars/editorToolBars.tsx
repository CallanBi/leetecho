import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Mode } from '../milkdownEditor/milkdownFullEditor';
import { Button } from 'antd';
import { withSemiIconStyle } from '@/style';
import { IconArticle, IconCode } from '@douyinfe/semi-icons';
import { noop } from 'lodash';
import { COLOR_PALETTE } from 'src/const/theme/color';

const { useRef, useState, useEffect, useMemo } = React;

type OnChangeInsertProps = {
  insertValue?: string;
};

interface EditorToolBarsProps {
  onChangeInsert?: (value: OnChangeInsertProps) => void;
  mode?: Mode;
  toggleMode?: () => void;
}

const buttonStyle: React.CSSProperties = {
  border: 'none',
  outline: 'none',
  padding: 0,
  background: COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND,
  position: 'relative',
  zIndex: 2,
  bottom: 0,
  paddingLeft: 7,
  paddingRight: 7,
};

const EditorToolBars: React.FC<EditorToolBarsProps> = (props: EditorToolBarsProps) => {
  const { mode = Mode.Default, toggleMode = noop } = props;

  return (
    <section
      style={{
        border: 'none',
        outline: 'none',
        position: 'relative',
        zIndex: 2,
        bottom: -4,
        height: 36,
        background: COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND,
      }}
    >
      <Button
        style={buttonStyle}
        icon={
          mode === Mode.Default ? (
            <IconCode
              style={withSemiIconStyle(buttonStyle)}
              onClick={() => {
                toggleMode?.();
              }}
            />
          ) : (
            <IconArticle
              style={withSemiIconStyle(buttonStyle)}
              onClick={() => {
                toggleMode?.();
              }}
            />
          )
        }
      ></Button>
    </section>
  );
};

export default EditorToolBars;
