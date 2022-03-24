import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Mode } from '../milkdownEditor/milkdownFullEditor';
import { Button, message, Popover, Tooltip } from 'antd';
import { withSemiIconStyle } from '@/style';
import { IconArticle, IconCode, IconCustomize } from '@douyinfe/semi-icons';
import { noop } from 'lodash';
import { COLOR_PALETTE } from 'src/const/theme/color';
import ProblemFilter from '@/components/problemFilter';
import { ProblemsFilterObj } from '@/components/problemFilter/problemFilter';
import { copyToClipboard } from '@/tools';

const { useRef, useState, useEffect, useMemo } = React;

type OnChangeInsertProps = {
  insertValue?: string;
};

interface EditorToolBarsProps {
  onChangeInsert?: (value: OnChangeInsertProps) => void;
  mode?: Mode;
  toggleMode?: () => void;
  type?: 'normal' | 'template';
}

const buttonStyle: React.CSSProperties = {
  border: 'none',
  outline: 'none',
  padding: 0,
  background: COLOR_PALETTE.LEETECHO_GREY,
  position: 'relative',
  zIndex: 2,
  bottom: 0,
  paddingLeft: 7,
  paddingRight: 7,
};

const PopoverFilterSection = styled.section`
  min-width: 658px;
  min-height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: 'relative';
`;

const EditorToolBars: React.FC<EditorToolBarsProps> = (props: EditorToolBarsProps) => {
  const { mode = Mode.Default, toggleMode = noop, type = 'normal' } = props;

  const [popoverVisible, setPopoverVisible] = React.useState(false);

  const [filterValue, setFilterValue] = useState<Partial<ProblemsFilterObj>>({});

  const onFilterChange = (val: ProblemsFilterObj) => {
    setFilterValue(val);
  };

  return (
    <section
      style={{
        border: 'none',
        outline: 'none',
        position: 'relative',
        zIndex: 2,
        bottom: -4,
        height: 36,
        background: COLOR_PALETTE.LEETECHO_GREY,
      }}
    >
      <Tooltip title={mode === Mode.Default ? '代码模式' : '默认模式'} placement="topLeft">
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
      </Tooltip>
      {type === 'template' && (
        <Popover
          content={
            <PopoverFilterSection>
              <ProblemFilter
                invisibleItem={['status']}
                onChange={onFilterChange}
                style={{
                  maxWidth: 580,
                  paddingTop: 21,
                }}
              >
                <Button
                  type="primary"
                  size="middle"
                  style={{
                    height: 30,
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'absolute',
                    right: 12,
                    top: 32,
                  }}
                  onClick={() => {
                    copyToClipboard(
                      // eslint-disable-next-line max-len
                      `\`\`\`leetecho\n\n|  #  | Title |  Title-CN  | Difficulty | Last Submission Time |\n|:---:|:-----:|:-----:|:----------:|:----------:|\n:problemFilter{"${JSON.stringify(
                        filterValue,
                      )}"}\n\n\`\`\``,
                    );
                    message.info('Leetecho 语法已复制到剪贴板');
                  }}
                >
                  确定
                </Button>
              </ProblemFilter>
            </PopoverFilterSection>
          }
          trigger="click"
          visible={popoverVisible}
          onVisibleChange={(visible) => {
            setPopoverVisible(visible);
          }}
          placement="bottomLeft"
        >
          <Tooltip title="生成自定义题集语法" placement="topLeft">
            <Button
              style={buttonStyle}
              icon={
                <IconCustomize
                  style={withSemiIconStyle(buttonStyle)}
                />
              }
            ></Button>
          </Tooltip>
        </Popover>
      )}
    </section>
  );
};

export default EditorToolBars;
