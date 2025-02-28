'use client';

import React from 'react';

import { getUserBookmarks } from '@/apis/user';

import { IPost } from '@/interfaces/post';
import { useUserProfile } from '@/context/user-context';

import { Button } from '@/components/button';
import { ArrowBackIcon } from '@/components/icons';
import ToggleGroup from '@/components/toggle-group/toggle-group';
import ActivityFeed from '@/components/user-activity-feed/user-activity-feed';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Toggle } from '@/components/toggle';

export default function BookmarkView() {
    const { t } = useTranslation();
    const _nav = [
        { key: 'post', label: t('all') },
        { key: 'media', label: t('media') },
    ]
    const router = useRouter();
    const { userProfile } = useUserProfile();
    const [ bookmarks, setBookmarks ] = React.useState<IPost[]>([]);
    const [ filteredBookmarks, setFilteredBookmarks ] = React.useState<IPost[]>([]);
    const [ selectedTab, setSelectedTab ] = React.useState('post');

    React.useEffect(() => {
        const fetchBookmarks = async () => {
            if (userProfile && userProfile.id) {
                try {
                    const response = await getUserBookmarks(userProfile.id);
                    setBookmarks(response.data);
                } catch (error) {
                    console.error('Failed to fetch bookmarks:', error);
                }
            }
        }

        fetchBookmarks();
    }, [userProfile]);

    React.useEffect(() => {
        if (selectedTab === 'post') {
            setFilteredBookmarks(bookmarks);
        } else if (selectedTab === 'media') {
            setFilteredBookmarks(
                bookmarks.filter((bookmark) => bookmark.type === 'media')
            )
        }
        
    }, [ selectedTab, bookmarks ]);

    const handleTabChange = (key: string) => {
        setSelectedTab(key);
    }

    

    return (
        <section className='block w-full min-h-screen p-3 overflow-hidden dark:bg-surface bg-[#c1c1c1e9]'>
            <div className='flex justify-between items-center gap-2 pb-3'>
                <Button
                    onClick={() => router.back()}
                    className="md:hidden p-2.5"
                    child={<ArrowBackIcon />}
                />
                <ToggleGroup
                    className='max-w-[330px]'
                    items={_nav}
                    onChange={(key) => handleTabChange(key)}
                />
            </div>
            <div className='max-h-svh overflow-y-scroll no-scrollbar'>
                <ActivityFeed
                    contentType={selectedTab}
                    data={filteredBookmarks}
                />
            </div>
        </section>
    )
}