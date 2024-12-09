import { NavItem } from '@/types';
import {CookieAttributes} from 'node_modules/@types/js-cookie';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Logout',
    href: '/logout',
    icon: 'login',
    label: 'Logout'
  }
];

export const cookieOption:CookieAttributes = { sameSite: 'Lax', secure: false }

