'use client';

import { getTopics } from '@/apis/topic';
import { getListUser } from '@/apis/user';
import Card from '@/components/card/card';
import CardBarChart from '@/components/card/card-bar-chart';
import CardLineChart from '@/components/card/card-line-chart';
import CardPieChart from '@/components/card/card-pie-chart';
import { usePost } from '@/context/post-context';
import { useUserProfile } from '@/context/user-context';
import { IUserProfile } from '@/interfaces/user';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';

let socket = io('http://localhost:3000/chat', { transports: ['websocket'] });

export default function DashboardView(){
    const [listUser, setListUser] = React.useState<IUserProfile[] | null>([]);
    const { posts, isLoading, setFilter } = usePost();
    const [searchStr, setSearchStr] = React.useState<string>('');
    const [isSidebarShow, setIsSidebarShow] = React.useState<boolean>(false);
    const [isCreatePost, setIsCreatePost] = React.useState<boolean>(false);
    const [ topics, setTopics] = React.useState<any[]>([]);
    const [postsByTopic, setPostsByTopic] = React.useState<any[]>([]);
    const [userData, setUserData] = React.useState<any[]>([]);
    const [postData, setPostData] = React.useState<any[]>([]);
    const [isDeleted, setIsDeleted] = React.useState<boolean>(false);
    const [ onlineUsers, setOnlineUsers] = React.useState<any[]>([]);
    const { userProfile } = useUserProfile();
    const [openMoreOptionsId, setOpenMoreOptionsId] = React.useState<
      string | null
    >(null);
    const { userProfile: user } = useUserProfile();
    const { t, i18n } = useTranslation();

    const fetchListUser = async () => {
      try {
        const response = await getListUser() ;
        if (response) {
          setListUser(Array.isArray(response) ? response : [response]);
        }
      } catch (error) {
        console.error('Error fetching user list:', error);
      }
    }

    React.useEffect(() => {
      fetchListUser();
    }, []);

    React.useEffect(() => {
      socket.on('onlineUsers', (users) => {
        console.log('online users:', users);
        setOnlineUsers(users);
      });

      return () => {
        socket.off('message');
      };
    }, []);

    React.useEffect(() => {
      getTopics()
        .then((response) => {
          setTopics(response.data);
        })
        .catch((error) => {
          console.error('Error fetching topics:', error);
        });
    }, []);

    React.useEffect(() => {
        if (topics.length > 0 && posts.length > 0) {
        const topicPostCount = topics.map(topic => ({
            name: topic.name,
            value: posts.filter(post => post.topic.id === topic.id).length,
            color: topic.color || "#CCCCCC" // Nếu API không có màu thì dùng màu mặc định
        }));
        setPostsByTopic(topicPostCount);
        }

        console.log('postsByTopic:', topics);
    }, [topics, posts]);
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

    React.useEffect(() => {
      if (listUser.length > 0) {
        const currentMonth = new Date().getMonth() + 1;
        const monthlyUsers = Array(currentMonth).fill(0);
    
        listUser.forEach((user) => {
          const month = new Date(user.createdAt).getMonth();
          if (month < currentMonth) {
            monthlyUsers[month]++;
          }
        });
    
        setUserData(monthlyUsers.map((count, index) => ({
          name: `Tháng ${index + 1}`,
          users: count,
        })));
      }
    }, [listUser]);
    

    React.useEffect(() => {
      if (posts.length > 0) {
        const currentMonth = new Date().getMonth() + 1;
        const monthlyPosts = Array(currentMonth).fill(0);
    
        posts.forEach((post) => {
          const month = new Date(post.createdAt).getMonth();
          if (month < currentMonth) {
            monthlyPosts[month]++;
          }
        });
    
        setPostData(monthlyPosts.map((count, index) => ({
          name: `Tháng ${index + 1}`,
          posts: count,
        })));
      }
      console.log('posts', postData);
    }, [posts]);
    
    return (
        <>
            <div className='h-fit min-h-screen overflow-y-scroll p-3 no-scrollbar pb-3'>
                <ul className='flex gap-8 mb-3'>
                    <li>
                        <Card
                            className='w-[345px]'
                            title={t('total user')}
                            value={`${listUser?.length}`}
                        />
                    </li>
                    <li>
                        <Card 
                            className='w-[345px]'
                            title={t('user online')}
                            value={`${onlineUsers.length}`}
                        />
                    </li>
                    <li>
                        <Card
                            className='w-[345px]'
                            title={t('total post')}
                            value= {`${posts?.length}`}
                        />
                    </li>
                </ul>
                <div className='flex gap-3 mb-3'>
                  <CardLineChart
                    title={t('user')}
                    data={userData} // Dữ liệu đã xử lý
                    color="#82ca9d"
                    strokeWidth="2"
                    width="100%"
                    height={300}
                    className="w-[65%]"
                  />

                  <CardPieChart
                    title={t('topic')}
                    data={postsByTopic}
                    colors={postsByTopic.map(topic => topic.color)} // Lấy màu từ API
                    color='#8884d8'
                    inner={0}
                    outer={100}
                    paddingangle={0}
                    width="100%"
                    height={300}
                    className='w-[35%]'
                  />
                </div>
                <CardBarChart
                  title={t('posts')}
                  data={postData}
                  dataKey="posts" // Truyền key đúng
                  color="#82ca9d"
                  strokeWidth="2"
                  width="100%"
                  height={300}
                  className="w-[100%]"
                />

            </div>
        </>
    )
  }