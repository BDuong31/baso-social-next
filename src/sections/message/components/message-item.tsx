import Image from 'next/image';

import { Avatar } from '@/components/avatar';
import { Typography } from '@/components/typography';
import { useUserProfile } from '@/context/user-context';
import { cn } from '@/lib';

//----------------------------------------------------------------------

interface IMessageItemProps {
  message: IMessage;
}

interface IMessage {
  user: {
    id: string;
    avatarUrl: string;
    name: string;
  };
  content: string;
  imageUrl?: string;
  time: string;
}

export default function MessageItem({ message }: IMessageItemProps) {
  const userProfile = useUserProfile();
  //console.log(message.user.id);
  return (
    <div className={cn(`w-full flex justify-start items-start gap-4 rounded-[1.25rem] p-3`,message.user.id === userProfile.userProfile?.id ? 'flex-end flex-row-reverse' : '')}>
    <div className={cn(`w-fit flex justify-start items-center gap-4 rounded-[1.25rem] p-3 `,message.user.id === userProfile.userProfile?.id ? 'flex-end flex-row-reverse' : '')}>
      { userProfile.userProfile?.id != message.user.id ? <Avatar size={36} src={message.user.avatarUrl} alt="avatar-user" /> : ''}

        <div className="grow flex flex-col gap-2">
          {/* <div className={cn(`flex items-center`, message.user.id === userProfile.userProfile?.id ? 'flex-row-reverse' : '')}>
            <Typography
              level="base2m"
              className="dark:text-primary text-surface-3 opacity-80 flex items-center gap-2"
            >
              {message.user.name}
              <Typography level="captionr" className="dark:text-tertiary text-surface opacity-50">
                {message.time}
              </Typography>
            </Typography>
          </div> */}
          <Typography level="body2r" className={cn(`dark:text-secondary text-surface-2 opacity-80 items-center rounded-[10px] p-1 pl-3 pr-3 dark:bg-neutral2-2  bg-neutral1-30`, message.user.id === userProfile.userProfile?.id ? 'text-right' : '')}>
            {message.content}
          </Typography>
          {message.imageUrl && (
            <Image
              src={message.imageUrl}
              alt="message-image"
              width={500}
              height={500}
              className="max-h-[22.5rem] w-full md: rounded-[1.5rem] object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
}
