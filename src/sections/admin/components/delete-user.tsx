'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { z } from 'zod';

import { Typography } from '@/components/typography';

import { Button } from '@/components/button';
import { SplashScreen } from '@/components/loading-screen';
import SettingSlider from '@/components/icons/setting-slider';
import Leave from '@/components/icons/leave';
import { IFollower } from '@/interfaces/follower';
import { getUserFollower, getUserFollowing } from '@/apis/user';
import { createChatRoom } from '@/apis/message';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { verify } from 'crypto';
import { verifyF2a } from '@/apis/auth';
import { setToken } from '@/utils/token-store';
import { useAuth } from '@/context/auth-context';
import { CopyIcon } from 'lucide-react';
import { IUserProfile } from '@/interfaces/user';
//----------------------------------------------------------------------------------

interface F2AProps {
    onClick: () => void;
    onClose: () => void;
    userData: IUserProfile;
}
export default function DeleteUser({onClick, onClose, userData }: F2AProps) {
  const [otp, setOtp] = React.useState('');
  const { setToken } = useAuth();
  const router = useRouter();
  const [otpError, setOtpError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { t } = useTranslation();

  if (loading) {
    return <SplashScreen />;
  }
  return (
    <div className="fixed w-full h-full top-0 left-0 dark:bg-[#444444] bg-[#444444] z-20 dark:md:bg-[#12121299] md:bg-[#12121299] shadow-stack">
      <div className="w-full h-full relative shadow-button dark:bg-[#282828b3] bg-neutral1-70 backdrop-blur-[50px] before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:border-[1.5px] before:border-[#ffffff1a] before:[mask-image:linear-gradient(175deg,#000,transparent_50%)] md:mx-auto md:w-[550px] md:h-[auto] md:mt-[10%] md:rounded-button md:before:rounded-button ">
        <div className="w-full max-h-screen mx-auto flex flex-col items-center md:h-full md:items-start md:justify-between md:static md:rounded-[2rem]">
          <div className="w-full p-3 rounded-[1.25rem]">
            <div className="flex items-start gap-3">
                <div className="flex flex-col items-center flex-1">
                    <Typography level="h5" className="dark:text-primary text-surface-2">
                        {t('confirm user deletion')}
                    </Typography>
                </div>
            </div>
            <div style={{scrollbarWidth: "none"}} className='md:max-h-[372px] mt-[12px] relative scroll-smooth overflow-auto flex justify-center'>
                <div className="flex flex-row gap-3">
                    <Image
                        src={userData?.avatar}
                        alt="avatar"
                        width={100}
                        height={100}
                        className="rounded-[1.25rem] w-[100px] h-[100px] object-cover"
                    />
                    <div className="flex flex-col gap-2">
                        <Typography level="base2sm" className="dark:text-primary text-surface-2">
                            {t('username')}: {userData?.username}
                        </Typography>
                        <Typography level="base2sm" className="dark:text-primary text-surface-2">
                            {t('first name')}: {userData?.lastName}
                        </Typography>
                        <Typography level="base2sm" className="dark:text-primary text-surface-2">
                            {t('last name')}: {userData?.firstName}
                        </Typography>
                        <Typography level="base2sm" className="dark:text-primary text-surface-2">
                            {t('email')}: {userData?.email}
                        </Typography>
                    </div>
                </div>
            </div>
          <div className="fixed bottom-4 w-fit mx-auto rounded-[1.25rem] p-2 flex gap-2 items-center bg-neutral2-3 z-20 md:p-3 md:w-full md:bg-transparent md:relative md:mx-0 md:justify-center md:bottom-0">
            <Button
              type="submit"
              className="flex px-[1.5rem] py-[0.75rem] rounded-[2rem] dark:text-secondary  text-surface-2 disabled:opacity-50 disabled:cursor-not-allowed "
              child={<Typography level="base2sm">{t('confirm')}</Typography>}
              onClick={onClick}
            />
            <Button
              type="button"
              className="flex px-[1.5rem] py-[0.75rem] rounded-[2rem] dark:text-primary text-surface-2 disabled:opacity-50 disabled:cursor-not-allowed "
              child={<Typography level="base2sm">{t('cancel')}</Typography>}
              onClick={onClose}
            />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}