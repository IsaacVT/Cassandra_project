// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'products',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
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
];

export default navConfig;
