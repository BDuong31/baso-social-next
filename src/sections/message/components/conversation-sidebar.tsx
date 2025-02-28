/* eslint-disable @typescript-eslint/no-explicit-any */
import { _conversations as fakeConversation } from '@/_mocks/_conversation';

import { AddIcon, LogoSVG } from '@/components/icons';
import { Button } from '@/components/button';

import ConversationItem from './conversation-item';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/alert-dialog';
import { useTranslation } from 'react-i18next';
import { NewChatRoomModal } from '@/components/chat';
import React from 'react';
import { ChatRoom } from '@/schema/chat-rooms-schema';
import axiosInstance, { endpoints } from '@/utils/axios';
import { IChatRoom } from '@/interfaces/message';

//----------------------------------------------------------------------
interface ConversationSidebarProps {
  onConversationClick: (id: any) => void;
  chatRooms: IChatRoom[];
}

export default function ConversationSidebar({
  onConversationClick, chatRooms,
}: ConversationSidebarProps) {
  const [isCreateMessage, setIsCreateMessage] = React.useState<boolean>(false);
  //const [chatRooms, setChatRooms] = React.useState<IChatRoom[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const { t } = useTranslation();

  // React.useEffect(() => {
  //   const fetchChatRooms = async () => {
  //     try {
  //       const response = await axiosInstance.get<IChatRoom[]>(endpoints.chat.getConversations);
  //       if (Array.isArray(response.data.result)) {
  //         setChatRooms(response.data.result);
  //       } else {
  //         console.error('Unexpected response format:', response.data);
  //       }
  //     } catch (error) {
  //       console.error('Failed to fetch chat rooms:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchChatRooms();
  // }, []);

  const handleCreateMessage = () => {
    setIsCreateMessage(!isCreateMessage);
  };

  return (
    <section className="relative w-full min-h-screen lg:min-h-full dark:bg-surface-2 bg-[#c8c8c8e9] flex flex-col gap-3 p-3 lg:max-w-[20rem] lg:min-w-[20rem] xl:max-w-[25rem] xl:min-w-[25rem]" suppressHydrationWarning={true}>
      <div className="w-full flex justify-start items-center gap-2">
        <Button
          onClick={handleCreateMessage}
          child={<AddIcon />}
          className="p-2.5"
        />
        {isCreateMessage && <NewChatRoomModal onBack={handleCreateMessage} />}
      </div>

      <div className="w-full max-h-full flex flex-col gap-2 overflow-y-auto">
        {chatRooms.map((item) => (
          <ConversationItem
            key={item.id}
            isReaded={true}
            conversation={item}
            onClick={() => onConversationClick(item.id)}
          />
        ))}
      </div>
    </section>
  );
}