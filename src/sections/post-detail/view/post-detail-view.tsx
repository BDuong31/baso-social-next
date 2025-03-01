'use client';

import React, { useTransition } from 'react';

import { ICommment } from '@/interfaces/comment';
import { IPost } from '@/interfaces/post';

import { getCommennts } from '@/apis/comment';
import { getPostDetail } from '@/apis/post';
import { usePost } from '@/context/post-context';

import { ComposerInput } from '@/components/new-post';
import { Post } from '@/components/post';

import eventBus from '@/utils/event-emitter';
import CommentList from '../comment-list';

import Header from '../header';

import styles from '@/styles/post-detail.module.css';
import { useTranslation } from 'react-i18next';

//-------------------------------------------------------------------------

export default function PostDetailView({ id }: { id: string }) {
  const { posts } = usePost();
  const post = posts.find((post) => post.id === id);

  const [data, setData] = React.useState<IPost | null>(null);
  const [comments, setComments] = React.useState<ICommment[]>([]);
  const [isViewFull, setIsViewFull] = React.useState(false);
  const [isCreated, setIsCreated] = React.useState(false);
  const [parentComment, setParentComment] = React.useState<{
    id: string;
    fullname: string;
  }>({ id: '', fullname: '' });

  const { t } = useTranslation();
  const handleViewFullPost = () => {
    const newIsViewFull = !isViewFull;
    setIsViewFull(newIsViewFull);
    eventBus.emit('toggleSidebarRight', newIsViewFull);
  };

  React.useEffect(() => {
    getPostDetail(id)
      .then((response) => {
        setData(response.data);
        return response.data;
      })
      .then((res) => {
        getCommennts(res.id).then((response) => {
          const cmts = response.data.reverse().map((comment) => {
            return {
              ...comment,
              author: comment.user,
              children:
                comment.children.length > 0
                  ? comment.children.map((child) => {
                      return {
                        ...child,
                        author: child.user,
                      };
                    })
                  : [],
            };
          });

          setComments(cmts);
        });
      })
      .catch((error) => {
        console.error('Error fetching post detail:', error);
      });
  }, [id, isCreated]);

  return (
    <>
      {post && (
        <section className="relative min-h-screen max-h-fit dark:bg-surface bg-[#c1c1c1e9] p-3 transition-all duration-[0.5s] no-scrollbar">
          <Header onViewFullPost={handleViewFullPost} />

          <div
            className={`${isViewFull ? `${styles.viewFull}` : 'overflow-y-scroll'} w-full h-[calc(100svh-155px)] overflow-y-hidden no-scrollbar [mask-image:linear-gradient(180deg,#000_85%,transparent)]`}
          >
            <Post data={(data as IPost) ?? post} className="dark:bg-neutral2-5 bg-neutral1-30" />

            <div className="w-full h-fit relative">
              {isViewFull && (
                <ComposerInput
                  className={`dark:bg-neutral3-70 bg-neutral1-70 relative top-0 right-0`}
                  usedBy="reply"
                  postId={data?.id}
                  onCreated={setIsCreated}
                  parentComment={parentComment}
                />
              )}
              <CommentList
                className={` ${isViewFull ? '[mask-image:linear-gradient(0deg,#000_90%,transparent)]' : ''}`}
                comments={comments}
                setParentComment={setParentComment}
              />
            </div>
          </div>
          {!isViewFull && (
            <ComposerInput
              className="dark:bg-neutral3-70 bg-neutral1-70 relative bottom-0"
              usedBy="reply"
              postId={data?.id}
              onCreated={setIsCreated}
              parentComment={parentComment}
            />
          )}
        </section>
      )}
    </>
  );
}
