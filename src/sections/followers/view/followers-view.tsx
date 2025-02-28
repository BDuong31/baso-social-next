'use client';

import Link from 'next/link';
import React from 'react';
import { useParams } from 'next/navigation';

import { getUserFollower, getUserFollowing } from '@/apis/user';
import { IFollower } from '@/interfaces/follower';

import EmptyContent from '@/components/empty-content/empty-content';
import ProfileCard from '@/components/profile-card/profile-card';
import { Typography } from '@/components/typography';

import HeaderFollowers from '../header';
import ToggleGroup from '@/components/toggle-group/toggle-group';
import { SplashScreen } from '@/components/loading-screen';
import { useTranslation } from 'react-i18next';

//-------------------------------------------------------------------------

export default function FollowersView() {
  const params = useParams();
  const userId = params?.id as string;
  const [followers, setFollowers] = React.useState<IFollower[]>([]);
  const [following, setFollowing] = React.useState<IFollower[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [tab, setTab] = React.useState('1'); // '1' for Followers, '2' for Following
  const { t } = useTranslation();
  React.useEffect(() => {
    const fetchFollowersData = async () => {
      if (!userId) return;

      setIsLoading(true);
      try {
        const response = await getUserFollower(userId);
        setFollowers(response.data);
      } catch (error) {
        console.error('Error fetching followers:', error);
        setError('Failed to load followers.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFollowersData();
  }, [userId]);

  React.useEffect(() => {
    const fetchFollowingData = async () => {
      if (!userId) return;

      setIsLoading(true);
      try {
        const response = await getUserFollowing(userId);
        setFollowing(response.data);
      } catch (error) {
        console.error('Error fetching following:', error);
        setError('Failed to load following.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFollowingData();
  }, [userId]);

  return (
    <section className="w-full max-h-full min-h-full p-3 pb-[5rem] md:pb-0 transition-all duration-[0.5s]">
      <HeaderFollowers />
      <ToggleGroup
        className="w-full p-1 flex justify-between items-center dark:bg-neutral3-60 bg-[#f8f8f899] rounded-[6.25rem]"
        items={[
          { key: '1', label: t('followers') },
          { key: '2', label: t('following') },
        ]}
        onChange={(key) => setTab(key)}
      />
      {isLoading ? (
        <SplashScreen />
      ) : error ? (
        <div className="text-center dark:text-secondary text-surface-2">
          <Typography level="title" className="opacity-80">
            {error}
          </Typography>
        </div>
      ) : tab === '1' ? (
        followers.length === 0 ? (
          <EmptyContent
            content={
              <div className="text-center dark:text-secondary text-surface-2">
                <Typography level="title" className="opacity-80">
                  {t('no followers yet')}
                </Typography>
                <Typography level="base2r" className="opacity-50">
                  {t('when you have followers, they will be listed here')}
                </Typography>
              </div>
            }
            image="/svg/ai_data_consolidation.svg"
          />
        ) : (
          <ul className="max-h-[calc(100svh-100px)] mt-3">
            {followers.map((follower: IFollower) => (
              <li key={follower.id} className="mb-2">
                <Link href={`/profile/${follower.id}`}>
                  <ProfileCard
                    user={{
                      id: follower.id,
                      username: follower.username,
                      firstName: follower.firstName,
                      lastName: follower.lastName,
                      avatar: follower.avatar,
                    }}
                    hasFollowedBack={follower.hasFollowedBack}
                  />
                </Link>
              </li>
            ))}
          </ul>
        )
      ) : following.length === 0 ? (
        <EmptyContent
          content={
            <div className="text-center dark:text-secondary text-surface-2">
              <Typography level="title" className="opacity-80">
                {t('no following yet')}
              </Typography>
              <Typography level="base2r" className="opacity-50">
                {t('when you follow someone, they will be listed here')}
              </Typography>
            </div>
          }
          image="/svg/ai_data_consolidation.svg"
        />
      ) : (
        <ul className="max-h-[calc(100svh-100px)] mt-3">
          {following.map((followed: IFollower) => (
            <li key={followed.id} className="mb-2">
              <Link href={`/profile/${followed.id}`}>
                <ProfileCard
                  user={{
                    id: followed.id,
                    username: followed.username,
                    firstName: followed.firstName,
                    lastName: followed.lastName,
                    avatar: followed.avatar,
                  }}
                  hasFollowedBack={followed.hasFollowedBack}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
