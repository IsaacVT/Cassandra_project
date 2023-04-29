// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/dashboard/app',
  //   icon: icon('ic_analytics'),
  // },
  // {
  //   title: 'user',
  //   path: '/dashboard/user',
  //   icon: icon('ic_user'),
  // },
  {
    title: 'products',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  // {
  //   title: 'cart',
  //   path: '/dashboard/cart',
  //   icon: icon('ic_bag'),
  // },
  {
    title: 'sales',
    path: '/dashboard/order',
    icon: icon('ic_bag'),
  },
  {
    title: 'shopping',
    path: '/dashboard/shopping',
    icon: icon('ic_cart'),
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // }
];

export default navConfig;
