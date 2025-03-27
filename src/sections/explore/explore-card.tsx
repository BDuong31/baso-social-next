import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

import { Typography } from '@/components/typography';
import { Avatar } from '@/components/avatar';

import { IPost } from '@/interfaces/post';
import { relativeTime } from '@/utils/relative-time';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

//---------------------------------------------------------------------------------------

interface IExploreCardProps {
  post: IPost;
}

export default function ExploreCard({ post }: IExploreCardProps) {
  const { t } = useTranslation();
  return (
    <Link
      href={`/posts/${post.id}`}
      className="group w-full min-w-[17.5rem] flex flex-col rounded-[20px] p-3 dark:bg-neutral2-2 bg-neutral1-30 gap-3 md:items-start md:justify-center dark:md:hover:bg-hover md:hover:bg-neutral1-60"
    >
        <Image
        src='https://basospark.youthscience.club/apis/uploads/18364000000_AÌnh maÌn hiÌnh 2025-03-03 luÌc 00.24.20.png'
        alt={
          'Image post by user ' +
          post.author.username +
          ' with topic ' +
          post.topic?.name
        }
        height={500}
        width={900}
        style={{
          objectFit: 'cover',
          minHeight: '212px',
          maxHeight: '212px',
          width: '100%',
        }}
        className="rounded-xl gap-2 justify-start items-center object-cover"
      />
      <Image
        src={post.image} 
        alt={
          'Image post by user ' +
          post.author.username +
          ' with topic ' +
          post.topic?.name
        }
        height={500}
        width={900}
        style={{
          objectFit: 'cover',
          minHeight: '212px',
          maxHeight: '212px',
          width: '100%',
        }}
        className="rounded-xl gap-2 justify-start items-center object-cover"
      />
      <div className="trending-content grow flex flex-col gap-2 mx-2 md:justify-start md:items-start opacity-80">
        <Typography level="captionr" className="dark:text-secondary text-surface-2 line-clamp-2">
          {post.content}
        </Typography>
      </div>

      <div className="flex w-full items-center gap-3 px-3">
        <Avatar
          src={post.author.avatar ?? '/img/default-avatar.jpg'}
          alt={post.author.username}
          size={32}
        />

        <Typography level="small" className="dark:text-tertiary text-surface mr-auto">
          {post.author.firstName} {post.author.lastName}
        </Typography>

        <Typography level="small" className="dark:text-tertiary text-surface mr-auto">
          {relativeTime(new Date(post.createdAt), t)}
        </Typography>

        <Typography
          level="smallsm"
          className={`dark:text-tertiary text-surface inline-flex items-center gap-2 before:size-2 before:rounded-full before:inset-0 before:bg-[var(--color)]`}
          style={{ '--color': post.topic?.color } as React.CSSProperties}
        >
          {post.topic?.name}
        </Typography>
      </div>
    </Link>
  );
}
