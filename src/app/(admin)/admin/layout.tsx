'use client';

import React, { useEffect, useState } from 'react';

import ProtectedRoute from '@/components/protected-router';

import { PostProvider } from '@/context/post-context';
import { ProfileProvider, useUserProfile } from '@/context/user-context';
import useBreakPoint from '@/hooks/use-breakpoint';

import BottomNavigationBar from '@/layouts/bottom-navigation-bar';
import Main from '@/layouts/main';
import Sidebar from '@/layouts/sidebar-admin';
import SidebarRight from '@/layouts/sidebar-right';

import eventBus from '@/utils/event-emitter';
import { useRouter } from 'next/navigation';

//-----------------------------------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const { breakpoint } = useBreakPoint();
  const [isPostShow, setIsPostShow] = useState(false);
  const [showSidebarRight, setShowSidebarRight] = useState(true);
  const isClient = typeof window !== 'undefined';
  const [isMouted, setIsMouted] = useState(false);
  const { userProfile } = useUserProfile();
  const router = useRouter();
  useEffect(() => {
    const handleTogglePostShow = (status: boolean) => {
      setIsPostShow(status);
    };

    const handleToggleSidebarRight = (isViewFull: boolean) => {
      setShowSidebarRight(!isViewFull);
    };

    eventBus.on('isShowCreatePost', handleTogglePostShow);
    eventBus.on('toggleSidebarRight', handleToggleSidebarRight);

    return () => {
      eventBus.off('isShowCreatePost', handleTogglePostShow);
      eventBus.off('toggleSidebarRight', handleToggleSidebarRight);
    };
  }, []);

  const isSmallScreen = isClient && breakpoint === 'sm';
  const isLargeScreen =
    isClient &&
    (breakpoint === 'lg' ||
      breakpoint === 'xl' ||
      breakpoint === '2xl' ||
      breakpoint === '3xl');

  // Kiểm tra quyền truy cập
  useEffect(() => {
    if (userProfile && userProfile.role !== 'admin') {
      router.replace('/403'); // Chuyển hướng nếu không phải admin
    }
  }, [userProfile]);

  React.useEffect(() => {
    setIsMouted(true);
  }, []);

  return (
    <ProtectedRoute>
      <ProfileProvider>
        <PostProvider>

          <div className="h-fit dark:bg-cushion bg-white block md:flex relative 3xl:w-[1600px] mx-auto w-full after:absolute after:inset-0 after:z-99 after:shadow-wrapper after:pointer-events-none">
            {isMouted && <>
              {isSmallScreen || <Sidebar />}
              <Main className="dark:bg-surface bg-[#c1c1c1e9]">{children}</Main>
              {isSmallScreen && !isPostShow && <BottomNavigationBar />}
            </>}

          </div>

        </PostProvider>
      </ProfileProvider>
    </ProtectedRoute>
  );
}