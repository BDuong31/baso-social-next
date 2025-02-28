import { Avatar } from '@/components/avatar';
import { Typography } from '@/components/typography';
import { useUserProfile } from '@/context/user-context';
import { IChatRoom } from '@/interfaces/message';
import { relativeTime } from '@/utils/relative-time';
import { useTranslation } from 'react-i18next';
//----------------------------------------------------------------------

interface IConversationItemProps {
  isReaded: boolean;
  conversation: IChatRoom;
  onClick?: () => void;
}

export default function ConversationItem({
  isReaded,
  conversation,
  onClick,
}: IConversationItemProps) {
  const { t } = useTranslation();
  const userProfile = useUserProfile();
  //console.log(conversation);
  //console.log(userProfile.userProfile?.id);
  return (
    <div
      onClick={onClick}
      className="relative dark:bg-neutral2-2 bg-neutral1-30 rounded-[1.25rem] p-3 flex justify-start items-start gap-4 group dark:hover:bg-neutral2-10 hover:bg-neutral1-60"
    >
      {!isReaded && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="absolute top-[0.5rem] right-[0.5rem] ${status}"
        >
          <circle cx="12" cy="12" r="6" fill="#55F08B" />
        </svg>
      )}
      <Avatar src={conversation?.messager.avatar} alt="avatar" />
      <div className="flex flex-col items-start justify-center gap-1">
        <Typography
          level="base2sm"
          className="dark:text-primary text-surface-3 mr-6 flex flex-row-reverse items-center gap-2"
        >
          <Typography level="base2r" className="dark:text-tertiary text-surface opacity-50">
            {conversation.messages?.createdAt == null ? '' : relativeTime(new Date(conversation.messages?.createdAt))}
          </Typography>
          {conversation?.messager.lastName} {conversation?.messager.firstName}
        </Typography>

        <Typography
          level="captionr"
          className="dark:text-tertiary text-surface col-span-2 opacity-80 mr-6 line-clamp-1 dark:group-hover:text-primary group-hover:text-surface-3"
        >
          {userProfile.userProfile?.id === conversation.messages?.senderId ? t('You: ') : "" } {conversation.messages?.content}
        </Typography>
      </div>
    </div>
  );
}
