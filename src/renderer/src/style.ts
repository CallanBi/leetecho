/** Customize global styles here */
import { css } from '@emotion/react';
import { COLOR_PALETTE } from 'src/const/theme/color';

const globalStyles = css`
  html {
    font-size: 14px;
  }
  ::-webkit-scrollbar {
    background-color: ${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}!important;
    border-radius: 2px;
    width: 5px;
    height: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${COLOR_PALETTE.LEETECHO_HEADER_SEARCH_BG_HOVER}!important;
    border-radius: 2px;
    width: 5px;
    height: 5px;
  }

  [ant-click-animating-without-extra-node='true']::after {
    animation: none !important;
  }

  .ant-checkbox {
    .ant-checkbox-inner {
      background-color: ${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}!important;
    }
  }

  .ant-checkbox-checked {
    .ant-checkbox-inner {
      background-color: ${COLOR_PALETTE.LEETECHO_BLUE}!important;
    }
  }

  /* table {
    border-color: ${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}!important;
  }
  th {
    background-color: ${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}!important;
  }
  hr {
    color: ${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}!important;
  } */

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
      padding-top: 24px;
      padding-left: 24px;
      padding-right: 24px;
      overflow-x: hidden;
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
