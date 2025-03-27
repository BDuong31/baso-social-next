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
import { CopyIcon } from 'lucide-react';
//----------------------------------------------------------------------------------

interface F2AProps {
    secret: string;
    qrcode: string;
    onClose: () => void;
}
export default function ENF2A({ secret, qrcode, onClose }: F2AProps) {
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
                        {t('scan qr code')}
                    </Typography>
                    <Typography level="body2r" className="dark:text-primary text-surface-2">
                        {t('scan this code to enable 2fa')}
                    </Typography>
                </div>
            </div>
            <div style={{scrollbarWidth: "none"}} className='md:max-h-[372px] mt-[12px] relative scroll-smooth overflow-auto flex justify-center'>
              <div className=''>
                <Image className='rounded-[10px]' src={qrcode} alt="qr code" width={180} height={180} />
              </div>
            </div>
            <div className="flex items-center my-4">
                <div className="flex-1 border-t dark:border-gray-300 border-gray-400"></div>
                <Typography level="body2r" className="dark:text-primary text-surface-2 mx-3">
                    {t('or enter this code manually')}
                </Typography>
                <div className="flex-1 border-t dark:border-gray-300 border-gray-400"></div>
            </div>
            <div className="flex items-center gap-2">
                <DebouncedInput
                    type="text"
                    name="OTP"
                    placeholder={t("6-digit code")}
                    value={secret}
                    className="w-full"
                    onChange={() => {
                      console.log('change')
                    }}
                    readOnly
                />
                <Button
                    type="button"
                    className="flex items-center px-3 py-3 rounded-[1.25rem] dark:text-secondary text-surface-2"
                    child={<CopyIcon/>}
                    onClick={() => navigator.clipboard.writeText(secret)}
                />
            </div>
          <div className="fixed bottom-4 w-fit mx-auto rounded-[1.25rem] p-2 flex gap-2 items-center bg-neutral2-3 z-20 md:p-3 md:w-full md:bg-transparent md:relative md:mx-0 md:justify-center md:bottom-0">
            <Button
              type="submit"
              className="flex px-[1.5rem] py-[0.75rem] rounded-[2rem] dark:text-secondary  text-surface-2 disabled:opacity-50 disabled:cursor-not-allowed "
              child={<Typography level="base2sm">{t('verify')}</Typography>}
              onClick={onClose}
            />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}