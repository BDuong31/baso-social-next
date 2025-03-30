'use client';
import React from 'react';

import useBreakPoint from '@/hooks/use-breakpoint';

import { ConversationSidebar } from '../components';
import EmptyContent from '@/components/empty-content/empty-content';
import { Typography } from '@/components/typography';

import ConversationDetailPage from './conversation-detail-view';
import { IChatRoom } from '@/interfaces/message';
import { getChatRooms } from '@/apis/message';
import { SplashScreen } from '@/components/loading-screen';
import axiosInstance, { endpoints } from '@/utils/axios';
import { ChatMessage } from '@/schema/chat-messages-schema';
import { useUserProfile } from '@/context/user-context';
import { io } from 'socket.io-client';
import { on } from 'node:events';

//-----------------------------------------------------------------------------------------------

interface IMessage {
  user: {
    id: string;
    avatarUrl: string;
    name: string;
  };
  roomId: string;
  content: string;
  imageUrl?: string;
  time: string;
}

interface ISent {
  name: string;
  roomId: string;
  sender: string;
  receiverId: string;
  message: string;
}
interface IChatRoomResponse {
  result: IChatRoom[];
}

const dataMessage = {
  user: {
    id: '',
    avatarUrl: '',
    name: '',
  },
  roomId: '',
  content: '',
  time: '',
}

interface IChatRoomResponse {
  result: IChatRoom[];
}

let socket = io('https://basospark.youthscience.club/chat', {
  transports: ['websocket'],
  secure: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,       
});
export default function Message() {

  const userProfile = useUserProfile();
  const { breakpoint } = useBreakPoint();
  const [showDetailOnly, setShowDetailOnly] = React.useState(false);
  const [chatRooms, setChatRooms] = React.useState<IChatRoom[]>([]);
  const [chatRoom, setChatRoom] = React.useState<IChatRoom>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [selectedConversationId, setSelectedConversationId] = React.useState<string>('');
  const [ onlineUsers, setOnlineUsers] = React.useState<string[]>([]);
  const [ Conversation, setConversation] = React.useState<IMessage[]>([]);
  const selectedChatRoom = chatRooms.find((room) => room.id === selectedConversationId);

  const isMobile = breakpoint === 'sm';
  const hideConsolidation = breakpoint === 'sm' || breakpoint === 'md';

  React.useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = (await getChatRooms()) as unknown as IChatRoomResponse;
        if (Array.isArray(response?.result)) {
          console.log(response.result);
          const chatRoomsData = response.result.map((room: any) => ({
            id: room.id,
            creatorId: room.creatorId,
            receiverId: room.receiverId,
            type: room.type,
            status: room.status,
            messager: {
              id: room.messager.id ?? '',
              username: room.messager.username ?? '',
              firstName: room.messager.firstName ?? '',
              lastName: room.messager.lastName ?? '',
              avatar: room.messager.avatar ?? '',
              online: onlineUsers.includes(room.messager.id) ? true : false,
            },
            messages: room.messages ? {
              id : room.messages?.id ?? '',
              roomId: room.messages?.roomId ?? '',
              senderId: room.messages?.senderId ?? '',
              content: room.messages?.content ?? '',
              createdAt: room.messages?.createdAt ?? '',
              updatedAt: room.messages?.updatedAt ?? '',
            } : {
              id: '',
              roomId: '',
              senderId: '',
              content: '',
              createdAt: '',
              updatedAt: '',
            }
          }));
          setChatRooms(chatRoomsData as IChatRoom[]);
        } else {
          console.error('Unexpected response format:', response);
        }
      } catch (error) {
        console.error('Failed to fetch chat rooms:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchChatRooms();
  }, [onlineUsers]);

  console.log('chatRooms:', chatRooms);

  React.useEffect(() => {
    const fetchConversation = async () => {
      //console.log('fetching conversation: ', chatRoom.id);
      try {
        const response = await axiosInstance.get<ChatMessage[]>(endpoints.chat.getMessages(selectedConversationId));
        console.log('fetching conversation: ', endpoints.chat.getMessages(selectedConversationId));
        console.log(Conversation)
        const messagesData = response.data.map((message: any) => ({
          user: {
            id: message.senderId ?? '',
            avatarUrl: message.senderId === userProfile.userProfile?.id ? userProfile.userProfile?.avatar ?? "/default-avatar.png" : chatRoom?.messager.avatar ?? "/default-avatar.png",                      
            name: message.senderId === userProfile.userProfile?.id ? `${userProfile.userProfile?.lastName} ${userProfile.userProfile?.firstName}` : `${chatRoom?.messager.lastName} ${chatRoom?.messager.firstName}`,
          },
          roomId: message.roomId,
          content: message.content,
          imageUrl: message.imageUrl || '',
          time: message.createdAt,
        }));
        setConversation(messagesData);
      } catch (error) {
        console.error('Failed to fetch chat rooms:', error);
      }
    };
    fetchConversation();
  }, [selectedConversationId])

  React.useEffect(() => {
    socket.emit('register', { userId: userProfile.userProfile?.id });

    socket.on('onlineUsers', (users) => {
      console.log('online users:', users);
      setOnlineUsers(users);
    });

    socket.on('message', (msg) => {

      setChatRooms((prev) => {
        const index = prev.findIndex((room) => room.id === msg.roomId);

        if (index !== -1) {
          const newChatRooms = [...prev];
          newChatRooms[index].messages.content = msg.message;
          newChatRooms[index].messages.senderId = msg.sender;
          newChatRooms[index].messages.createdAt = new Date().toISOString();
          return newChatRooms;
        }
        return prev;
      });

      const newMessage: IMessage = {
        user: {
          id: msg.sender,
          avatarUrl: msg.avatar,
          name: msg.name,
        },
        roomId: msg.roomdId,
        content: msg.message,
        time: new Date().toISOString(),
      };

      console.log("da nhan", msg.roomId, " ", selectedConversationId);
      if (msg.roomId === selectedConversationId) {
        setConversation((prevConversation) => [...prevConversation, newMessage]);
      }
    });

    return () => {
      socket.off('message');
    };
  }, [userProfile, selectedConversationId]);

  const handleConversationClick = (id: string) => {
    if (isMobile) {
      setShowDetailOnly(true);
    }

    console.log('selected conversation:', id);
    const chatRoom = chatRooms.find((room) => room.id === id);
    setChatRoom(chatRoom);
    setSelectedConversationId(id);
  };

  const handleSent = (message: string) => {
    console.log(message);
    const newMessage: IMessage = {
      user: {
        id: userProfile.userProfile?.id || '',
        avatarUrl: userProfile.userProfile?.avatar || '',
        name: `${userProfile.userProfile?.lastName} ${userProfile.userProfile?.firstName}`,
      },
      roomId: selectedConversationId || '',
      content: message,
      time: new Date().toISOString(),
    };

    setConversation((prevConversation) => [...prevConversation, newMessage]);

    socket.emit('privateMessage', {
      name: `${userProfile.userProfile?.lastName} ${userProfile.userProfile?.firstName}`,
      avatar: userProfile.userProfile?.avatar,
      roomId: selectedConversationId,
      sender: userProfile.userProfile?.id,
      receiverId: chatRoom?.messager.id,
      message: message,
    });

    setChatRooms((prev) => {
      const index = prev.findIndex((room) => room.id === selectedConversationId);
      if (index !== -1) {
        const newChatRooms = [...prev];
        newChatRooms[index].messages.content = message;
        newChatRooms[index].messages.senderId = userProfile.userProfile?.id || '';
        newChatRooms[index].messages.createdAt = new Date().toISOString();
        return newChatRooms;
      }
      return prev;
    });
    
  }

  const handleBack = () => {
    setShowDetailOnly(false);
    setSelectedConversationId('');
  };

  if (loading) {
    return <SplashScreen />;
  }


  return (
    <section className="w-full h-full flex flex-col justify-start transition-all duration-[0.5s] lg:flex-row lg:items-start">
      {!isMobile || !showDetailOnly ? (
        <ConversationSidebar chatRooms={chatRooms} onConversationClick={handleConversationClick} />
      ) : null}

      {!hideConsolidation ? (
        <section className="dark:bg-surface bg-[#c1c1c1e9] h-screen w-full grow flex flex-col justify-center items-center gap-3 ">
          {selectedConversationId && selectedChatRoom ? (
            <ConversationDetailPage onSents={handleSent} Conversation={Conversation} chatRoom={selectedChatRoom} id={selectedConversationId} onBack={handleBack} />
          ) : (
            <EmptyContent
              content={
                <Typography level="base2sm" className="dark:text-secondary text-surface-2">
                  Select conversation to start messaging
                </Typography>
              }
              image="/svg/ai_data_consolidation.svg"
            />
          )}
        </section>
      ) : selectedConversationId && selectedChatRoom ? (
        <ConversationDetailPage onSents={handleSent} Conversation={Conversation} chatRoom={selectedChatRoom} id={selectedConversationId} onBack={handleBack} />
      ) : null}
    </section>
  );
}