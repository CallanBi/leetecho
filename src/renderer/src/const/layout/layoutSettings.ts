import { ProSettings } from '@ant-design/pro-layout';
import { COLOR_PALETTE } from 'src/const/theme/color';


const layoutSettings: Partial<ProSettings> = {
  'fixSiderbar': true,
  'navTheme': 'light',
  'layout': 'side',
  'contentWidth': 'Fluid',
  'headerHeight': 48,
  'primaryColor': COLOR_PALETTE.LEETECHO_BLUE,
  'splitMenus': false,
  'fixedHeader': false
};

export { layoutSettings };