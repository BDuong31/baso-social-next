import React from 'react';

import { IUserProfile } from '@/interfaces/user';

import {
  AvatarIcon,
  EditIcon,
  LinkIcon,
  OutlineCheckIcon,
  SolidCheckIcon,
  TagIcon,
} from '@/components/icons';
import { DebouncedInput } from '@/components/input';
import { Typography } from '@/components/typography';
import { useTranslation } from 'react-i18next';
import { useUserProfile } from '@/context/user-context';
import { Button } from '@/components/button';

//----------------------------------------------------------------

interface EditFormProps {
  userInfo: IUserProfile;
  onUpdateProfile: (updatedData: Partial<IUserProfile>) => void;
  onClose: () => void;
  onUpdate: () => void;
  loading: boolean;
}

export default function EditForm({
  userInfo,
  onUpdateProfile,
  onClose,
  onUpdate,
  loading,  
}: EditFormProps) {
  const [profileData, setProfileData] = React.useState({
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    username: userInfo.username,
    bio: userInfo.bio,
    websiteUrl: userInfo.websiteUrl,
  });

  const handleChange = (name: keyof IUserProfile, value: string) => {
    setProfileData((prev) => ({ ...prev, [name]: value }));
    onUpdateProfile({ [name]: value });
  };

  const {  t } = useTranslation();

  return (
    <div className="fixed w-full h-full top-0 left-0 dark:bg-[#444444] bg-[#444444] z-20 dark:md:bg-[#12121299] md:bg-[#12121299] shadow-stack">
      <div className="w-full h-full relative shadow-button dark:bg-[#282828b3] bg-neutral1-70 backdrop-blur-[50px] before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:border-[1.5px] before:border-[#ffffff1a] before:[mask-image:linear-gradient(175deg,#000,transparent_50%)] md:mx-auto md:w-[550px] md:h-[auto] md:mt-[10%] md:rounded-button md:before:rounded-button ">
      <div className="w-full px-4 py-3 flex justify-center">
          <Typography
            level="h5"
            className="dark:text-tertiary text-surface uppercase opacity-50"
          >
            {t('edit profile')}
          </Typography>
        </div>

        <ul className="w-full">
          <li className="p-4 flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
            <Typography
              level="base2r"
              className="dark:text-secondary text-surface-2 opacity-80 flex items-center gap-3 min-w-[10rem]"
            >
              <AvatarIcon />
              {t('first name')}
            </Typography>
            <div className="w-full flex justify-between items-center">
              <DebouncedInput
                name="firstName"
                onChange={(value) => handleChange('firstName', value)}
                type="text"
                className="grow dark:text-primary text-surface-3 text-sm opacity-80"
                value={profileData.firstName}
              />
              <SolidCheckIcon />
            </div>
          </li>

          <li className="p-4 flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
            <Typography
              level="base2r"
              className="dark:text-secondary text-surface-2 opacity-80 flex items-center gap-3 min-w-[10rem]"
            >
              <AvatarIcon />
                {t('last name')}
            </Typography>
            <div className="w-full flex justify-between items-center">
              <DebouncedInput
                name="lastName"
                onChange={(value) => handleChange('lastName', value)}
                type="text"
                className="grow dark:text-primary text-surface-3 text-sm opacity-80"
                value={profileData.lastName}
              />
              <SolidCheckIcon />
            </div>
          </li>

          <li className="p-4 flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
            <Typography
              level="base2r"
              className="dark:text-secondary text-surface-2 opacity-80 flex items-center gap-3 min-w-[10rem]"
            >
              <TagIcon />
                {t('username')}
            </Typography>
            <div className="w-full flex justify-between items-center">
              <DebouncedInput
                name="username"
                onChange={(value) => handleChange('username', value)}
                type="text"
                className="grow dark:text-primary text-surface-3 text-sm opacity-80"
                value={profileData.username}
              />
              <OutlineCheckIcon />
            </div>
          </li>

          <li className="p-4 flex flex-col gap-2 md:flex-row md:items-start md:gap-3">
            <Typography
              level="base2r"
              className="dark:text-secondary text-surface-2 opacity-80 flex items-center gap-3 min-w-[10rem]"
            >
              <EditIcon />
                {t('bio')}
            </Typography>
            <textarea
              name="bio"
              onChange={(e) => handleChange('bio', e.target.value)}
              className="grow min-h-[8.75rem] max-h-[8.75rem] bg-transparent focus:outline-none dark:text-primary text-surface-3 text-sm opacity-80"
              value={profileData.bio}
              placeholder={t('write something about yourself')}
            />
          </li>

          <li className="p-4 flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
            <Typography
              level="base2r"
              className="dark:text-secondary text-surface-2 opacity-80 flex items-center gap-3 min-w-[10rem]"
            >
              <LinkIcon />
              {t('link')}
            </Typography>
            <div className="w-full flex justify-between items-center">
              <DebouncedInput
                name="websiteUrl"
                onChange={(value) => handleChange('websiteUrl', value)}
                type="text"
                className="grow dark:text-primary text-surface-3 text-sm opacity-80"
                value={profileData.websiteUrl || ''}
                placeholder="https://example.com"
              />
              <OutlineCheckIcon />
            </div>
          </li>
        </ul>
        <div className='flex gap-2 p-4 justify-end'>
            <Button
                className="flex px-[1.5rem] py-[0.75rem] rounded-[2rem] dark:text-secondary  text-surface-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                    onUpdateProfile(profileData);
                    onUpdate()
                }}
                child={<Typography level="base2sm">{t('update')}</Typography>}
            />
            <Button
                className="flex px-[1.5rem] py-[0.75rem] rounded-[2rem] dark:text-secondary  text-surface-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                    onClose();
                }}
                child={<Typography level="base2sm">{t('cancel')}</Typography>}
            />
        </div>
      </div>
    </div>
  );
}
