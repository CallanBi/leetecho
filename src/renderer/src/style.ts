/** Customize global styles here */
import { css } from '@emotion/react';
import { COLOR_PALETTE } from 'src/const/theme/color';

const globalStyles = css`
  .ant-layout {
    background-color: ${COLOR_PALETTE.LEETECHO_WHITE};
  }

  .ant-layout-header {
    height: 48px !important;
    line-height: 48px !important;
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
    .ant-input-group-wrapper {
      -webkit-app-region: no-drag;
    }
    .ant-btn {
      -webkit-app-region: no-drag;
    }
  }
  .ant-layout-sider {
    -webkit-app-region: drag;
    .ant-menu-item {
      -webkit-app-region: no-drag;
    }
    .semi-icon {
      -webkit-app-region: no-drag;
    }
    button {
      -webkit-app-region: no-drag;
    }
  }

  /** logo位置 */
  .ant-pro-sider-logo {
    margin-top: 27px;
  }

  div.ant-layout {
    height: 100vh;
    .ant-layout-content {
      overflow-y: auto;
      margin: 0;
      padding: 24px;
    }
  }

  .ant-input-password {
    :hover {
      background-color: ${COLOR_PALETTE.LEETECHO_INPUT_HOVER_BG}!important;
      input {
        background-color: ${COLOR_PALETTE.LEETECHO_INPUT_HOVER_BG}!important;
      }
    }
    :focus {
      border-color: ${COLOR_PALETTE.LEETECHO_BLUE};
      box-shadow: none;
    }
    :active {
      border-color: ${COLOR_PALETTE.LEETECHO_BLUE};
      box-shadow: none;
    }
  }
  .ant-input-affix-wrapper-focused {
    border-color: ${COLOR_PALETTE.LEETECHO_BLUE}!important;
    box-shadow: none !important;
  }

  .ant-input-affix-wrapper {
    :hover {
      background-color: ${COLOR_PALETTE.LEETECHO_INPUT_HOVER_BG}!important;
      input {
        background-color: ${COLOR_PALETTE.LEETECHO_INPUT_HOVER_BG}!important;
      }
    }
    :focus {
      border-color: ${COLOR_PALETTE.LEETECHO_BLUE};
      box-shadow: none;
    }
    :active {
      border-color: ${COLOR_PALETTE.LEETECHO_BLUE};
      box-shadow: none;
    }
  }

  .ant-popover-inner-content {
    padding: 0;
  }
`;

/** fix Semi icon align style */
export const withSemiIconStyle: (style?: React.CSSProperties | undefined) => React.CSSProperties = (style) => ({
  position: 'relative',
  top: 3,
  ...style,
});

export default globalStyles;
