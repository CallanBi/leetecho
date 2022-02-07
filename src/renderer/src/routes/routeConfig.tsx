import { BasicLayoutProps } from '@ant-design/pro-layout';
import { ROUTE } from '@/const/route';

const navConfig: BasicLayoutProps = {
  route: {
    path: '/',
    routes: ROUTE,
  },
};

export { navConfig };