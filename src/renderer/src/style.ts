/** Customize global styles here */
import { css } from '@emotion/react';
import { COLOR_PALETTE } from 'src/const/theme/color';

const globalStyles = css`

  .ant-layout {
    background-color: ${COLOR_PALETTE.LEETECHO_WHITE};
  }

  .ant-layout-header {
    height: 56px!important;
    line-height: 56px!important;
  }

  .ant-pro-sider-logo {
    cursor: default;
  }

  .ant-input {
    :focus {
      border-color: ${COLOR_PALETTE.LEETECHO_BLUE}!important;
      box-shadow: none;
    }
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