import {
  BellIcon,
    BookIcon,
    ExploreIcon,
    MessageIcon,
    NotificationIcon,
  } from '@/components/icons';
  import HomeIcon from '@/components/icons/home';
  import Profile from '@/components/icons/profile';
  import { useTranslation } from 'react-i18next';
  
  //-----------------------------------------------------------------------------------------------
  
  export const NAVIGATION_ITEMS = () => {
    const { t } = useTranslation();

    const navItems: NavigationItem[] = [
      {
        title: t('home'),
        Icon: <HomeIcon />,
        path: '/',
      },
      {
        title: t('notification'),
        update: { status: true, count: 0 },
        Icon: <BellIcon />,
        path: '/notifications',
      },
      {
        title: t('message'),
        Icon: <MessageIcon />,
        path: '/messages',
      },
      {
        title: t('bookmark'),
        Icon: <BookIcon />,
        path: '/bookmark',
      },
      {
        title: t('profile'),
        Icon: <Profile />,
        path: '/profile',
      },
      {
        title: t('explore'),
        Icon: <ExploreIcon />,
        path: '/explore',
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
  