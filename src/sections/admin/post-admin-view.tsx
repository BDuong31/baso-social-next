'use client';

import React from 'react';

import { useUserProfile } from '@/context/user-context';
import eventBus from '@/utils/event-emitter';

import { SplashScreen } from '@/components/loading-screen';
import SearchInput from '@/components/search-input/search-input';
import { usePost } from '@/context/post-context';

import { USER_AVATAR_PLACEHOLDER } from '@/constant';
import '@/utils/i18n';
import { useTranslation } from 'react-i18next';
import { Typography } from '@/components/typography';
import Card from '@/components/card/card';
import TableUser from '@/components/table-user/table-user';
import { getListUser } from '@/apis/user';
import { IUserProfile } from '@/interfaces/user';
import TablePost from '@/components/table-post/table-post';
import { io } from 'socket.io-client';
import { createTopic, getTopics } from '@/apis/topic';
import TableTopic from '@/components/table-topic/table-topic';
import { ITopic } from '@/interfaces/topic';
import { Button } from '@/components/button';
import { AddIcon } from '@/components/icons';
import NewTopic from './components/new-topic';

let socket = io('http://localhost:3000/chat', { transports: ['websocket'] });

export default function PostAdminView() {
    const [ listUser, setListUser] = React.useState<IUserProfile[] | null>(
      []
    );
    const { posts, isLoading, setFilter } = usePost();
    console.log('posts:', posts);
    const [searchStr, setSearchStr] = React.useState<string>('');
    const [isSidebarShow, setIsSidebarShow] = React.useState<boolean>(false);
    const [isCreatePost, setIsCreatePost] = React.useState<boolean>(false);
    const [isDeleted, setIsDeleted] = React.useState<boolean>(false);
    const [ topics, setTopics] = React.useState<ITopic[]>([]);
    const [ onlineUsers, setOnlineUsers] = React.useState<any[]>([]);
    const [ blockUsers, setBlockUsers] = React.useState<number>(0);
    const [ isNewTopic, setIsNewTopic] = React.useState<boolean>(false);
    const { userProfile } = useUserProfile();
    const [openMoreOptionsId, setOpenMoreOptionsId] = React.useState<
      string | null
    >(null);
  
    const { userProfile: user } = useUserProfile();
    const { t, i18n } = useTranslation();
  
    const changeLanguage = (lng: string) => {
      i18n.changeLanguage(lng);
    }

    const fetchListUser = async ()=> {
      try {
        const res = await getListUser();
        const userList = Array.isArray(res) ? res : [res];

        const blockedCount = userList
          .map(user => user.status === 'active' ? 0 : 1)
          .reduce<number>((acc, curr) => acc + curr, 0);
        
        setListUser(userList);
        
        console.log('blockedCount:', blockedCount);
      setBlockUsers(blockedCount);
      } catch(err){
        console.log(err);
      }
    }

    React.useEffect(() =>{
      fetchListUser();
    }, [])

    React.useEffect(() => {
        getTopics()
            .then((response) => {
                if (response) {
                setTopics(response.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching topics:', error);
            });
    }, []);

    
    React.useEffect(() => {
      const handleOnlineUsers = (users: IUserProfile[]) => {
        console.log('online users:', users);
        setOnlineUsers(users);
      };
    
      socket.on('onlineUsers', handleOnlineUsers);
    
      return () => {
        socket.off('onlineUsers', handleOnlineUsers); // Hủy đúng sự kiện
      };
    }, []);
    


    React.useEffect(() => {
      setFilter((prevFilter) => ({ ...prevFilter, str: searchStr }));
    }, [searchStr, setFilter, isDeleted]);
  
    React.useEffect(() => {
      const handleEsc = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && isCreatePost) {
          setIsCreatePost(false);
        }
      };
  
      document.addEventListener('keydown', handleEsc);
  
      return () => {
        document.removeEventListener('keydown', handleEsc);
      };
    }, [isCreatePost]);
  
    if (isLoading || !user) return <SplashScreen />;
  
    const toggleSidebar = () => {
      setIsSidebarShow(!isSidebarShow);
      eventBus.emit('isShowSidebar', !isSidebarShow);
    };
  
    const currentUser = user && {
      fullname: `${user.firstName} ${user.lastName}`,
      nickname: user.username,
      avatar: user.avatar || USER_AVATAR_PLACEHOLDER,
    };
  
    const handleCreatePost = () => {
      setIsNewTopic(!isNewTopic);
    };
    return (
        <>
            <div className='min-h-screen flex flex-col gap-3'>
                <div className='h-fit overflow-y-scroll p-3 no-scrollbar pb-3'>
                <Typography level='h4' className='text-surface-3 dark:text-primary mb-3'>{t('list post')}</Typography>
                    <div className='flex flex-col h-[325px] gap-3 p-6 rounded-[1.25rem] dark:bg-neutral2-2 bg-neutral1-30 [transition:background_.2s] '>
                    <div className="flex gap-[60%]">
                        <Typography level='baser' className='text-surface-3 dark:text-primary mb-3'>{t('list of post')}</Typography>
                        <SearchInput
                        placeholder={t('search post')}
                        className='w-56'
                        search=''
                        />
                    </div>
                    <div className="h-[100%] max-h-[100%] overflow-y-scroll no-scrollbar dark:bg-neutral2-5 bg-neutral1-60 pl-2 pr-2 rounded-[1rem]">
                        <TablePost
                            data={posts}
                        />
                    </div>
                    </div>
                </div>
                <div className='h-fit overflow-y-scroll p-3 no-scrollbar pb-3'>
                <Typography level='h4' className='text-surface-3 dark:text-primary mb-3'>{t('list topic')}</Typography>
                    <div className='flex flex-col h-[325px] gap-3 p-6 rounded-[1.25rem] dark:bg-neutral2-2 bg-neutral1-30 [transition:background_.2s] '>
                    <div className="flex justify-between">
                        <Typography level='baser' className='text-surface-3 dark:text-primary mb-3'>{t('list of topic')}</Typography>
                        <div className='flex gap-3'>
                            <Button
                                onClick={()=>{handleCreatePost()}}
                                child={<AddIcon />}
                                className="size-[44px] min-w-[44px]"
                            />  
                            <SearchInput
                            placeholder={t('search topic')}
                            className='w-56'
                            search=''
                            />
                        </div>
                    </div>
                    <div className="h-[100%] max-h-[100%] overflow-y-scroll no-scrollbar dark:bg-neutral2-5 bg-neutral1-60 pl-2 pr-2 rounded-[1rem]">
                        <TableTopic
                        data={topics}
                        />
                    </div>
                    </div>
                </div>
            </div>
            {isNewTopic && (
                <NewTopic
                    onClose={() => {
                        setIsNewTopic(false)
                        
                    }}
                    onClick={() => {
                        setIsNewTopic(false);
                    }}
                />
            )}
        </>
    );
}