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

//----------------------------------------------------------------

interface EditFormProps {
  userInfo: IUserProfile;
  onUpdateProfile: (updatedData: Partial<IUserProfile>) => void;
  loading: boolean;
}

export default function EditForm({
  userInfo,
  onUpdateProfile,
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
    <section className="w-full h-full mt-[2rem] p-3">
      <div className="flex flex-col rounded-[2rem] dark:bg-neutral2-2 bg-neutral1-30">
        <div className="w-full px-4 py-3">
          <Typography
            level="hairline1"
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
        {loading && <p>{t('updating')}</p>}
      </div>
    </section>
  );
}
