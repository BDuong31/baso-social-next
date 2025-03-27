'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { z } from 'zod';

import { Typography } from '@/components/typography';

import { Button } from '../button';
import { DebouncedInput } from '../input';
import { SplashScreen } from '../loading-screen';
import SearchInput from '../search-input/search-input';
import GoRight from '../icons/go-right';
import GoLeft from '../icons/go-left';
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
//----------------------------------------------------------------------------------

interface F2AProps {
  id: string;
}
export default function F2A({ id }: F2AProps) {
  const [otp, setOtp] = React.useState('');
  const { setToken } = useAuth();
  const router = useRouter();
  const [otpError, setOtpError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { t } = useTranslation();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await verifyF2a({ id: id, token: otp});
      if (response && response.f2a) {
        setToken(response.token);
        router.push('/');
        console.log('Xác thực 2 yếu tố thành công');
      } else {
        setOtpError(true);
      }
    } catch (error) {
      console.error('Lỗi xác thực 2 yếu tố:', error);
      setOtpError(true);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <SplashScreen />;
  }
  return (
    <div className="fixed w-full h-full top-0 left-0 dark:bg-[#444444] bg-[#c1c1c1] z-20 dark:md:bg-[#12121299] md:bg-[#d9d9d9fc] shadow-stack">
      <div className="w-full h-full relative shadow-button dark:bg-[#282828b3] bg-neutral1-70 backdrop-blur-[50px] before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:border-[1.5px] before:border-[#ffffff1a] before:[mask-image:linear-gradient(175deg,#000,transparent_50%)] md:mx-auto md:w-[400px] md:h-[auto] md:mt-[10%] md:rounded-button md:before:rounded-button ">

        <div className="w-full max-h-screen mx-auto flex flex-col items-center md:h-full md:items-start md:justify-between md:static md:rounded-[2rem]">
          <div className="w-full p-3 rounded-[1.25rem]">
            <div className="flex items-start gap-3">
                <div className="flex flex-col items-center flex-1">
                    <Typography level="h5" className="dark:text-primary text-surface-2">
                        {t('Two-factor authentication')}
                    </Typography>
                </div>
            </div>
            <div style={{scrollbarWidth: "none"}} className='md:max-h-[372px] mt-[12px] relative scroll-smooth overflow-auto'>
              <div className=''>
                <DebouncedInput
                  type="text"
                  name="OTP"
                  placeholder={t('6-digit code')}
                  value={otp}
                  className="w-full dark:bg-neutral2-5 bg-neutral2-50 dark:placeholder:text-tertiary placeholder:text-surface-3 base dark:text-primary text-surface-2 text-sm px-5 py-4 rounded-xl transition border-[1.5px] border-transparent dark:focus:border-neutral2-10 focus:border-neutral2-40"
                  onChange={(value: string) => setOtp(value)}
                />
              </div>
            </div>
          <div className="fixed bottom-4 w-fit mx-auto rounded-[1.25rem] p-2 flex gap-2 items-center bg-neutral2-3 z-20 md:p-3 md:w-full md:bg-transparent md:relative md:mx-0 md:justify-center md:bottom-0">
            <Button
              type="submit"
              className="flex px-[1.5rem] py-[0.75rem] rounded-[2rem] dark:text-secondary  text-surface-2 disabled:opacity-50 disabled:cursor-not-allowed "
              child={<Typography level="base2sm">{t('verify')}</Typography>}
              onClick={handleSubmit}
            />
            {otpError && (
              <Typography
                level="captionr"
                className="opacity-80 flex items-center gap-2 dark:text-secondary text-surface-2 justify-center"
              >
                {t('noaccount')}
                <a href="/register" className="opacity-100 font-semibold">
                  <Typography level="captionsm" className="opacity-100">
                      {t('registerfree')}
                  </Typography>
                </a>
              </Typography>
            )}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}