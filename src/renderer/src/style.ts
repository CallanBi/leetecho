/** Customize global styles here */
import { css } from '@emotion/react';
import { COLOR_PALETTE } from 'src/const/theme/color';

const globalStyles = css`

  .ant-layout {
    background-color: ${COLOR_PALETTE.LEETECHO_WHITE};
  }

  .ant-layout-header {
    height: 48px!important;
    line-height: 48px!important;
  }

  .ant-input {
    :hover {
      border-color: ${COLOR_PALETTE.LEETECHO_INPUT_HOVER_BG};
      background-color: ${COLOR_PALETTE.LEETECHO_INPUT_HOVER_BG};
    }
    :focus {
      border-color: ${COLOR_PALETTE.LEETECHO_BLUE};
      box-shadow: none;
      background-color: ${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND};
    }
  }

  .ant-pro-sider-logo {
    cursor: default;
  }

  /* 设置可拖动区域 **/
  .ant-layout-header {
    -webkit-app-region: drag;
  }
  .ant-layout-sider {
    -webkit-app-region: drag;
  }

  /** logo位置 */
  .ant-pro-sider-logo {
    margin-top: 27px;
  }

`;

/** fix Semi icon align style */
export const withSemiIconStyle: (style?: React.CSSProperties | undefined) => React.CSSProperties = (style) => {
  return {
    position: 'relative',
    top: 3,
    ...style,
  };
};

export default globalStyles;