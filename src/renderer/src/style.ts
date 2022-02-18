/** Customize global styles here */
import { css } from '@emotion/react';

const globalStyles = css`

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