import {
  UserIcon,
  EditIcon
} from '@/components/icons';
import HomeIcon from '@/components/icons/home';
import Profile from '@/components/icons/profile';
import { useTranslation } from 'react-i18next';
import React, { JSX } from 'react';

//-----------------------------------------------------------------------------------------------

export const NAVIGATION_ITEMS = () => {
  const { t } = useTranslation();

  const navItems: NavigationItem[] = [
    {
      title: t('home'),
      Icon: <HomeIcon />,
      path: '/admin',
    },
    {
      title: t('user'),
      //update: { status: true, count: 1 },
      Icon: <UserIcon />,
      path: '/admin/user',
    },
    {
      title: t('posts'),
      Icon: <EditIcon />,
      path: '/admin/posts',
    },
  ];

  return navItems;
}

export type NavigationItem = {
  update?: { status: boolean; count: number };
  title: string;
  Icon: JSX.Element;
  path: string;
};
