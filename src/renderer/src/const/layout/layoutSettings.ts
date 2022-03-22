import { ProSettings } from '@ant-design/pro-layout';
import { COLOR_PALETTE } from 'src/const/theme/color';
import { MEASUREMENT } from 'src/const/theme/measurement';
import { ConfigOptions } from 'antd/lib/message';

const layoutSettings: Partial<ProSettings> = {
  fixSiderbar: true,
  navTheme: 'light',
  layout: 'side',
  contentWidth: 'Fluid',
  headerHeight: parseInt(`${MEASUREMENT.LEETECHO_HEADER_HEIGHT}`),
  primaryColor: COLOR_PALETTE.LEETECHO_BLUE,
  splitMenus: false,
  fixedHeader: false,
};

const globalMessageConfig: ConfigOptions = {
  top: 52,
  duration: 4,
};

export { layoutSettings, globalMessageConfig };
