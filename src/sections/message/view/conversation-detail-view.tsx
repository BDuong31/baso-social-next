/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { _conversations as fakeConversation } from '@/_mocks/_conversation';

import { Avatar } from '@/components/avatar';
import { CloseIcon, MoreIcon } from '@/components/icons';
import { Typography } from '@/components/typography';
import { Button } from '@/components/button';
import { ChatInput, MessageItem } from '../components';
import { IChatRoom } from '@/interfaces/message';
import { IUserProfile } from '@/interfaces/user';
import axiosInstance from '@/utils/axios';
import { IApiResponse } from '@/interfaces/api-response';
import { endpoints } from '@/utils/axios';
import { on } from 'events';
import { ChatMessage } from '@/schema/chat-messages-schema';
import { set } from 'zod';
import { useUserProfile } from '@/context/user-context';
import { image, u } from 'framer-motion/client';
import { io } from 'socket.io-client';

//----------------------------------------------------------------------
interface ConversationDetailPageProps {
  chatRoom: IChatRoom;
  Conversation: IMessage;
  id: string;
  onBack: () => void;
  onSents: (data: string) => void;
}

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



export default function ConversationDetailPage({  
  chatRoom, Conversation, id, onBack, onSents
}: ConversationDetailPageProps) {
  const userProfile = useUserProfile();
  const router = useRouter();

  const handleSent = (message: string) => {

    onSents(message);

    // socket.emit('privateMessage', {
    //   name: `${userProfile.userProfile?.lastName} ${userProfile.userProfile?.firstName}`,
    //   roomId: chatRoom.id,
    //   sender: userProfile.userProfile?.id,
    //   receiverId: chatRoom.messager.id,
    //   message: message,
    // });
    console.log('Sent message');
  };

  const handleBack = () => {
    console.log('Back to messages');
    //router.push('/messages');
    onBack();

  };
  //console.log(Conversation);


  return (
    <section className="block md:hidden w-full h-full flex-col dark:bg-surface bg-[#c1c1c199] lg:flex">
      <section
        id="conversation-header"
        className="w-full flex items-center gap-4 py-3 pr-6 pl-3"
      >
        <Avatar src={chatRoom.messager.avatar} alt="avatar" />

        <Typography level="base2m" className="dark:text-primary text-surface-3 grow">
          {chatRoom.messager.lastName} {chatRoom.messager.firstName} 
        </Typography>

        <Button className="p-2.5" child={<MoreIcon />} />

        <Button
          onClick={handleBack}
          className="p-2.5 lg:hidden"
          child={<CloseIcon />}
        />
      </section>

      <section
        id="chat-container"
        className="flex flex-col gap-2 h-[calc(100vh-150px)] overflow-y-auto items-center justify-start p-3"
      >
        {/* {conversation.messages?.map((message, index) => (
          <MessageItem key={index} message={message} />
        ))} */}
        {Conversation?.map((message, index) => (
          <MessageItem key={index} message={message} />
        ))}

      </section>

      <ChatInput onSent={handleSent} />
    </section>
  );
}
