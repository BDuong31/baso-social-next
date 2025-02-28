'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { z } from 'zod';

import { createPost } from '@/apis/post';
import { getTopics } from '@/apis/topic';
import { usePost } from '@/context/post-context';
import { useUserProfile } from '@/context/user-context';
import { IPost } from '@/interfaces/post';
import { ITopic } from '@/interfaces/topic';
import { CreatePost, createPostSchema } from '@/schema/posts-schema';

import { Avatar } from '@/components/avatar';
import { ArrowBackIcon, ChevronRight } from '@/components/icons';
import { CloseIcon } from '@/components/icons';
import { UploadImgButton } from '@/components/new-post/post-control';
import { Typography } from '@/components/typography';

import { Button } from '../button';
import { Dropdown } from '../dropdown';
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
//----------------------------------------------------------------------------------

interface INewPostProps {
  onBack?: () => void;
}

export default function NewChatRoom({ onBack }: INewPostProps) {
  const [previewUrl, setPreviewUrl] = React.useState('');
  const [uploadedImage, setUploadedImage] = React.useState('');
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [followers, setFollowers] = React.useState<IFollower[]>([]);
  const [following, setFollowing] = React.useState<IFollower[]>([]);
  const [follow, setFollow] = React.useState<IFollower[]>([]);
  const [selectedFollower, setSelectedFollower] = React.useState<string | null>(null);
  const { userProfile } = useUserProfile();
  const router = useRouter();
  
  const { addPost } = usePost();

  const [selectedTopic, setSelectedTopic] = React.useState<string>('');
  const [topics, setTopics] = React.useState<ITopic[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>('');

  const [content, setContent] = React.useState<string>('');
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchFollowesData = async () => {
        const FollowersData = await getUserFollower(`${userProfile?.id}`)
        const FollowingData = await getUserFollowing(`${userProfile?.id}`)
        const combiendData = [...FollowingData.data, ...FollowersData.data]
        const uniqueFollow = Array.from(new Set(combiendData.map(f => f.id)))
          .map(id => combiendData.find(f => f.id === id));
        setFollow(uniqueFollow);
      }
    fetchFollowesData();
  }, [userProfile]);

  const handleCheckboxChange = (followerId: string) => {
    setSelectedFollower(followerId === selectedFollower ? null : followerId);
    console.log(followerId);
  };

  const handleCreateChatRoom = () => {
    console.log("tạo phòng");
    const data = {
      creatorId: userProfile?.id,
      receiverId: selectedFollower
    }
    createChatRoom(data);

    if (onBack) onBack();
    router.refresh();
  }
  //if (loading) return <SplashScreen />;
  if (error) return <div>{error}</div>;

  return (
    <div className="fixed w-full h-full top-0 left-0 dark:bg-[#444444] bg-[#c1c1c1] z-20 dark:md:bg-[#12121299] md:bg-[#d9d9d9fc] shadow-stack">
      <div className="w-full h-full relative shadow-button dark:bg-[#282828b3] bg-neutral1-70 backdrop-blur-[50px] before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:border-[1.5px] before:border-[#ffffff1a] before:[mask-image:linear-gradient(175deg,#000,transparent_50%)] md:mx-auto md:w-[400px] md:h-[auto] md:mt-[10%] md:rounded-button md:before:rounded-button ">

        <div className="w-full max-h-screen mx-auto flex flex-col items-center md:h-full md:items-start md:justify-between md:static md:rounded-[2rem]">
          <div className="w-full p-3 rounded-[1.25rem]">
            <div className="flex items-start gap-3">
              <SearchInput
                placeholder="Search people"
                search=""
                className=' dark:bg-[#12121240] bg-neutral1-75'
                setSearch={() => {}}
              />
              <Button
                onClick={() => handleCreateChatRoom()}
                child={<ChevronRight />}
                className="size-[44px] min-w-[44px]"
              />
              <Button
                className="size-10 p-2.5"
                child={<CloseIcon />}
                onClick={onBack}
              />
            </div>
            <div Style="scrollbar-width: none" className='md:max-h-[372px] mt-[12px] relative scroll-smooth overflow-auto'>
              <div className='md:mt-[-8px] '>
                {follow.map((follower) => (
                  <div key={follower.id} className='relative flex items-center h-[68px] mt-2 p-3 rounded-[20px] dark:bg-neutral2-2 bg-neutral1-70 transition-all duration-200'>
                    <label className="relative flex items-center cursor-pointer text-lg select-none w-full">
                      <input
                        type="checkbox"
                        className="peer hidden"
                        checked={selectedFollower === follower.id}
                        onChange={() => handleCheckboxChange(follower.id)}
                      />
                      <div className="absolute top-3 right-3 w-6 h-6 peer-checked:bg-checkbox rounded-full peer-checked:shadow inset-shadow"></div>
                      <Avatar src={follower?.avatar} alt="avatar" className="ml-2" />

                      <div className="flex flex-1 items-center ml-2">
                        <span className="flex-grow px-[16px]">
                          <Typography
                            level="base2sm"
                            className="dark:text-secondary text-surface-2 opacity-80 select-none"
                          >
                            {follower?.firstName} {follower?.lastName}
                          </Typography>
                          <br />
                          <Typography
                            level="captionr"
                            className="dark:text-tertiary text-surface opacity-45 select-none"
                          >
                            @{follower?.username}
                          </Typography>
                        </span>
                      </div>
                    </label>
                  </div>    
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}