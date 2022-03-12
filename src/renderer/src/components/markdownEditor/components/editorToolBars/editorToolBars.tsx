import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Mode } from '../milkdownEditor/milkdownFullEditor';
import { Button } from 'antd';
import { withSemiIconStyle } from '@/style';
import { IconArticle, IconCode } from '@douyinfe/semi-icons';
import { noop } from 'lodash';

const { useRef, useState, useEffect, useMemo } = React;

type OnChangeInsertProps = {
  insertValue?: string;
};

interface EditorToolBarsProps {
  onChangeInsert?: (value: OnChangeInsertProps) => void;
  mode?: Mode;
  toggleMode?: () => void;
}

const EditorToolBars: React.FC<EditorToolBarsProps> = (props: EditorToolBarsProps) => {
  const { mode = Mode.Default, toggleMode = noop } = props;

  return (
    <>
      <Button
        icon={
          mode === Mode.Default ? (
            <IconCode style={withSemiIconStyle()} />
          ) : (
            <IconArticle
              style={withSemiIconStyle()}
              onClick={() => {
                toggleMode?.();
              }}
            />
          )
        }
      ></Button>
    </>
  );
};

export default EditorToolBars;
