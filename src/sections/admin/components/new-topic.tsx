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
import { createTopic } from '@/apis/topic';

//----------------------------------------------------------------

interface EditFormProps {
    onClose: () => void;
    onClick: () => void;
}

interface TopicData {
    topicName: string;
    topicColor: string;
}

export default function NewTopic({
    onClose,
    onClick,
}: EditFormProps) {
  const [topicData, setTopicData] = React.useState({
    topicName: '',
    topicColor: '#ffffff',
  });

    const handleChange = (name: keyof TopicData , value: string) => {
        setTopicData((prev) => ({ ...prev, [name]: value }));
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
            {t('create new topic')}
          </Typography>
        </div>

        <ul className="w-full">
          <li className="p-4 flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
            <Typography
              level="base2r"
              className="dark:text-secondary text-surface-2 opacity-80 flex items-center gap-3 min-w-[10rem]"
            >
              <AvatarIcon />
              {t('topic name')}
            </Typography>
            <div className="w-full flex justify-between items-center">
              <DebouncedInput
                name="topicname"
                onChange={(value) => handleChange('topicName', value)}
                type="text"
                className="grow dark:text-primary text-surface-3 text-sm opacity-80"
                value={topicData.topicName}
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
                {t('topic color')}
            </Typography>
            <div className="w-full flex justify-between items-center">
              <div className='flex gap-2'>
                <DebouncedInput
                name="topiccolor"
                onChange={(value) => handleChange('topicColor', value)}
                type="color"
                className="dark:text-primary text-surface-3 w-[25px] text-sm opacity-80"
                value={topicData.topicColor}
                />
                <span className="text-lg font-mono">{topicData.topicColor}</span>
              </div>
              <SolidCheckIcon />
            </div>
          </li>
        </ul>
        <div className='flex gap-2 p-4 justify-end'>
            <Button
                className="flex px-[1.5rem] py-[0.75rem] rounded-[2rem] dark:text-secondary  text-surface-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                    const res = createTopic({
                        name: topicData.topicName,
                        color: topicData.topicColor,
                    });
                    if (res) {
                        onClose();
                    }
                    onClick()
                }}
                child={<Typography level="base2sm">{t('save')}</Typography>}
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
