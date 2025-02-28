'use client';

import React from 'react';

import { IPost } from '@/interfaces/post';

import { useUserProfile } from '@/context/user-context';
import eventBus from '@/utils/event-emitter';

import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import { AddIcon, BellIcon } from '@/components/icons';
import { SplashScreen } from '@/components/loading-screen';
import { ComposerInput, NewPostModal } from '@/components/new-post';
import { Post } from '@/components/post';
import SearchInput from '@/components/search-input/search-input';
import MobileSidebarTrigger from '@/components/sidebar-trigger/mobile-sidebar-trigger';
import { usePost } from '@/context/post-context';
import { Switch } from '@/components/switch';

import { USER_AVATAR_PLACEHOLDER } from '@/constant';
import '@/utils/i18n';
import { useTranslation } from 'react-i18next';
import { set } from 'zod';
import { Typography } from '@/components/typography';
import { Skeleton } from '@/components/skeleton';
import { EmptyContent } from '@/components/empty-content';
import Card from '@/components/card/card';
import { LineChart,PieChart,Legend, Cell, Pie ,Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import CardLineChart from '@/components/card/card-line-chart';
import CardPieChart from '@/components/card/card-pie-chart';
import CardBarChart from '@/components/card/card-bar-chart';
import TableUser from '@/components/table-user/table-user';
import { getListUser } from '@/apis/user';
import { IUserProfile } from '@/interfaces/user';

const data = [
    { name: "Tháng 1", users: 400 },
    { name: "Tháng 2", users: 300 },
    { name: "Tháng 3", users: 500 },
    { name: "Tháng 4", users: 700 },
  ];
const dataPie = [
    { name: "dev", value: 400 },
    { name: "test", value: 300 },
    { name: "full", value: 200 },
    { name: "design", value: 100 },
    { name: "pm", value: 100 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8984D8"];

export default function HomeView() {
    const [ listUser, setListUser] = React.useState<IUserProfile[] | null>(
      []
    );
    const { posts, isLoading, setFilter } = usePost();
    const [searchStr, setSearchStr] = React.useState<string>('');
    const [isSidebarShow, setIsSidebarShow] = React.useState<boolean>(false);
    const [isCreatePost, setIsCreatePost] = React.useState<boolean>(false);
    const [isDeleted, setIsDeleted] = React.useState<boolean>(false);
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
        setListUser(res);
      } catch(err){
        console.log(err);
      }
    }

    React.useEffect(() =>{
      fetchListUser();
    }, [])


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
      setIsCreatePost(!isCreatePost);
    };
    return (
        <>
            <div className='h-fit min-h-screen overflow-y-scroll p-3 no-scrollbar pb-3'>
              <Typography level='h4' className='text-surface-3 dark:text-primary mb-3'>User</Typography>
                <ul className='flex gap-8 mb-3'>
                    <li>
                        <Card
                            title='Total User'
                            value={`${listUser?.length}`}
                        />
                    </li>
                    <li>
                        <Card 
                            title='User Online'
                            value='100'
                        />
                    </li>
                    <li>
                        <Card
                            title='User Offiline'
                            value='100'
                        />
                    </li>
                    <li>
                        <Card
                            title='Block User'
                            value='100'
                        />
                    </li>
                </ul>
                <div className='flex flex-col h-[614px] gap-3 p-6 rounded-[1.25rem] dark:bg-neutral2-2 bg-neutral1-30 [transition:background_.2s] '>
                  <div className="flex gap-[60%]">
                    <Typography level='baser' className='text-surface-3 dark:text-primary mb-3'>List of user</Typography>
                    <SearchInput
                      placeholder='search user'
                      className='w-56'
                      search=''
                    />
                  </div>
                  <div className="h-[100%] max-h-[100%] overflow-y-scroll no-scrollbar dark:bg-neutral2-5 bg-neutral1-60 pl-2 pr-2 rounded-[1rem]">
                    <TableUser
                      data={listUser}
                    />
                  </div>
                </div>
            </div>
        </>
    );
}