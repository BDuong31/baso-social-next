// import Image from 'next/image';
import React from 'react';

import { updatePassword, updateUserProfile } from '@/apis/user';
import { useUserProfile } from '@/context/user-context';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/alert-dialog';
import {
  EmailIcon,
  LockIcon,
  ProtectionIcon,
  QRCodeIcon,
  TrashIcon,
  TunerIcon,
} from '@/components/icons';
import Bubble from '@/components/icons/bubble';
import Bubbles1 from '@/components/icons/bubbles1';
import Bubbles2 from '@/components/icons/bubbles2';
import Ring1 from '@/components/icons/ring1';
import Ring2 from '@/components/icons/ring2';
import Ring3 from '@/components/icons/ring3';
import { Typography } from '@/components/typography';

import SettingCard from '../components/setting-card';

import { USER_AVATAR_PLACEHOLDER } from '@/constant/contants';
import { Avatar } from '@/components/avatar';
import { useTranslation } from 'react-i18next';
import { set } from 'zod';
import { disableF2a, enableF2a } from '@/apis/auth';
import { ENF2A, F2A } from '@/components/f2a';

//-----------------------------------------------------------------------------------------------

export const AccountsSection = () => {
  const { userProfile, setUserProfile } = useUserProfile();  const [password, setPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [ passwordError, setPasswordError] = React.useState(false);
  const [newEmail, setNewEmail] = React.useState('');
  const [is2FA, setIs2FA] = React.useState<boolean>(false); // Giá trị mặc định

  React.useEffect(() => {
    if (userProfile?.f2a !== undefined) {
      setIs2FA(userProfile.f2a);
    }
  }, [userProfile]);
  console.log('2FA', is2FA);
  const [ isSetup2FA, setIsSetup2FA] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState(false);
  const [ qrCode, setQrCode] = React.useState('');
  const [ secret, setSecret] = React.useState('');
  const { t } = useTranslation();
  const handleSaveEmail = async () => {
    if (!newEmail) return;

    setLoading(true);
    try {
        const data = {
          email: newEmail
        }
        await updateUserProfile(data);
        console.log('Email updated');
        setNewEmail('');
      } catch (error) {
        console.error('Failed to update email', error);
        alert('Failed to update email');
      } finally {
        setLoading(false);
    }
  }

  const handleSavePassword = async () => {
    if (!password) return;

    setLoading(true);
    try {
      const data = {
        oldpassword: password,
        password: newPassword
      }
      await updatePassword(data);
      console.log('Password updated');
      setPassword('');
      setNewPassword('');
    } catch (error) {
      console.error('Failed to update password', error);
      alert('Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async() => {
    setIsSetup2FA(false);
  }

  const handle2FA = async() => {
    try {
      if (is2FA) {
        setIs2FA(false);
        const data = await disableF2a({id: userProfile?.id});
        if (data){
          console.log('2FA disabled', data);
        } else {
          console.log('tesr');
        }
        console.log('2FA disabled', data);
      }
      else {
        setIs2FA(true);
        const data =await enableF2a({id: userProfile?.id});
        if (data){
          setIsSetup2FA(true);
          console.log('2FA enabled', data);
          setQrCode(data.qrcode);
          setSecret(data.secret);
        }
        else {
          console.log('test');
        }
      }

    } catch (error) {
      console.error('Failed to update 2FA', error);
      alert('Failed to update 2FA');
    }
  }
  return (
    <>
    <section className="flex-1 flex flex-col h-full gap-3 overflow-auto no-scrollbar">
      <SettingCard className="p-8 gap-7 flex flex-col h-[256px]  items-center justify-center">
        <div className="inline-block relative rounded-full dark:bg-green-200 bg-blue-200  z-20">
          <Avatar
            size={64}
            src={userProfile?.avatar || USER_AVATAR_PLACEHOLDER}
            alt="Avatar"
            className="z-10 relative"
          />
          <Bubble className="absolute inset-0 right-0 transform -translate-x-1 -translate-y-1" />
          <Bubbles1 className="absolute inset-0 right-0 transform -translate-x-4 translate-y-6" />
          <Bubbles2 className="absolute inset-0 right-0 transform -translate-x-10 -translate-y-10 " />
          <Ring1 className="absolute inset-0 right-0 transform -translate-x-7 -translate-y-7 z-9 " />
          <Ring2 className="absolute inset-0 right-0 transform -translate-x-[50px] -translate-y-12 z-1 " />
          <Ring3 className="absolute inset-0 right-0 transform -translate-x-[70px] -translate-y-12" />
        </div>
        <span className="flex flex-col items-center gap-2">
          <p className="font-rubik font-medium text-title dark:text-primary text-surface-3 self-center">
            {userProfile
              ? `${userProfile.firstName} ${userProfile.lastName}`
              : 'User'}
          </p>
          <p className="dark:text-tertiary text-surface opacity-80">
            {`@${userProfile?.username}` || '@username'}
          </p>
        </span>
      </SettingCard>
      <SettingCard settingLabel="Account Settings">
        <SettingCard.item className="group/item">
          <span className="inline-flex gap-3 items-center">
            <EmailIcon />
            <Typography level="base2r" className="dark:text-secondary text-surface-2 opacity-80">
              Email:
            </Typography>
            <Typography level="base2r" className="dark:text-tertiary text-surface opacity-80">
              {userProfile?.email}
            </Typography>
          </span>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Typography
                level="base2m"
                className="cursor-pointer dark:text-secondary text-surface-2 font-rubik text-sm opacity-80 group-hover/item:opacity-100"
              >
                {t('change email')}
              </Typography>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('change email')}?</AlertDialogTitle>
                <AlertDialogDescription>                
                  <input
                    type="text"
                    placeholder={t('new email')}
                    className="w-full p-3 border border-neutral-400 rounded-[10px] mb-4 focus:outline-none "
                    value={newPassword}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  {t('cancel')}
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleSaveEmail}
                  disabled={loading}
                >
                  {t('change')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>          
        </SettingCard.item>

        <SettingCard.item className="group/item">
          <span className="inline-flex gap-3 items-center">
            <LockIcon />
            <Typography level="base2r" className="dark:text-secondary text-surface-2 opacity-80">
              {t('password')}
            </Typography>
          </span>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Typography
                level="base2m"
                className="cursor-pointer dark:text-secondary text-surface-2 font-rubik text-sm opacity-80 group-hover/item:opacity-100"
              >
                {t('change password')}
              </Typography>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('change password')}?</AlertDialogTitle>
                <AlertDialogDescription>
                  <input
                    type="password"
                    placeholder={t('old password')}
                    className="w-full p-3 border border-neutral-400 rounded-[10px] mb-4 focus:outline-none "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />                  
                  <input
                    type="password"
                    placeholder={t('new password')}
                    className="w-full p-3 border border-neutral-400 rounded-[10px] mb-4 focus:outline-none "
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  {t('cancel')}
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleSavePassword}
                  disabled={loading}
                >
                  {t('change')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SettingCard.item>

        <SettingCard.item>
          <span className="inline-flex gap-3 items-center">
            <QRCodeIcon />
            <Typography level="base2r" className="dark:text-secondary text-surface-2 opacity-80">
              2FA
            </Typography>
          </span>
          <label className="switch inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              value="" 
              checked={is2FA}
              className="sr-only peer"
              onChange={() => handle2FA()} 
            ></input>
            <div className="relative w-11 h-6 p-1 dark:bg-neutral2-5 bg-neutral1-35 rounded-full peer peer-checked:after:translate-x-[20px] rtl:peer-checked:after:-translate-x-[20px]  after:content-[''] after:absolute after:top-[4px] after:start-[4px] dark:after:bg-neutral2-30 after:bg-neutral2-95 after:rounded-full after:h-4 after:w-4 after:transition-all dark:peer-checked:bg-neutral3-50 peer-checked:bg-neutral-400 peer-checked:after:bg-linear-object"></div>
          </label>
        </SettingCard.item>
        <SettingCard.item>
          <span className="inline-flex gap-3 items-center">
            <TrashIcon />
            <Typography
              level="base2r"
              className=" text-sm dark:text-secondary text-surface-2 opacity-80"
            >
              {t('delete account')}
            </Typography>
          </span>
        </SettingCard.item>
      </SettingCard>
      <SettingCard settingLabel="Privacy">
        <div className="flex w-full p-4 border-t dark:border-t-neutral2-2 border-t-neutral1-30 dark:hover:bg-neutral2-2 hover:bg-neutral1-30 items-center justify-between">
          <span className="inline-flex gap-3 items-center">
            <LockIcon />
            <Typography
              level="base2r"
              className=" text-sm dark:text-secondary text-surface-2 opacity-80"
            >
            {t('private account')}
            </Typography>
          </span>
          <label className="switch inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="relative w-11 h-6 p-1 dark:bg-neutral2-5 bg-neutral1-35 rounded-full peer peer-checked:after:translate-x-[20px] rtl:peer-checked:after:-translate-x-[20px]  after:content-[''] after:absolute after:top-[4px] after:start-[4px] dark:after:bg-neutral2-30 after:bg-neutral2-95 after:rounded-full after:h-4 after:w-4 after:transition-all dark:peer-checked:bg-neutral3-50 peer-checked:bg-neutral-400 peer-checked:after:bg-linear-object"></div>
          </label>
        </div>
        <div className="flex w-full p-4 border-t border-t-neutral2-2  hover:bg-neutral2-2 justify-between items-center group/item">
          <span className="inline-flex gap-3 items-center">
            <ProtectionIcon />
            <Typography
              level="base2r"
              className=" text-sm dark:text-secondary text-surface-2 opacity-80"
            >
              {t('cookie setting')}
            </Typography>
          </span>
          <span className="flex gap-1 opacity-80 items-center">
            <Typography
              level="base2r"
              className=" text-sm dark:text-secondary text-surface-2 opacity-80"
            >
              {t('customize')}
            </Typography>

            <TunerIcon />
          </span>
        </div>
        <div className="flex w-full p-4 border-t dark:border-t-neutral2-2 border-t-neutral1-30  dark:hover:bg-neutral2-2 hover:bg-neutral1-30 justify-between items-center group/item">
          <span className="inline-flex gap-3 items-center">
            <ProtectionIcon />
            <Typography
              level="base2r"
              className=" text-sm dark:text-secondary text-surface-2 opacity-80"
            >
              {t('direct message')}
            </Typography>
          </span>
          <span className="flex gap-1 opacity-80 items-center">
            <Typography
              level="baser"
              className=" text-sm dark:text-secondary text-surface-2 opacity-80"
            >
              {t('everyone')}
            </Typography>

            <TunerIcon />
          </span>
        </div>
      </SettingCard>
    </section>
    {isSetup2FA &&
      <ENF2A secret={secret} qrcode={qrCode} onClose={handleVerify}/>
    }
    </>
  );
}
