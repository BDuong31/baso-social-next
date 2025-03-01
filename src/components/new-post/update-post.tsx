import Image from 'next/image';
import React, { useRef } from 'react';
import { z } from 'zod';

import { updatePost } from '@/apis/post';
import { getTopics } from '@/apis/topic';
import { usePost } from '@/context/post-context';
import { useUserProfile } from '@/context/user-context';
import { IPost } from '@/interfaces/post';
import { ITopic } from '@/interfaces/topic';
import { type UpdatePost, updatePostSchema } from '@/schema/posts-schema';

import { Avatar } from '@/components/avatar';
import { ArrowBackIcon } from '@/components/icons';
import { CloseIcon } from '@/components/icons';
import { UploadImgButton } from '@/components/new-post/post-control';
import { Typography } from '@/components/typography';

import { Button } from '../button';
import { Dropdown } from '../dropdown';
import { DebouncedInput } from '../input';
import { SplashScreen } from '../loading-screen';
import { EmojiButton } from './post-control';

//-------------------------------------------------------------------------

interface IUpdatePostProps {
  postId: string;
  onClose?: () => void;
  onUpdateSuccess?: (updatedPost: IPost) => void;
}

export default function UpdatePost({
  postId,
  onClose,
  onUpdateSuccess,
}: IUpdatePostProps) {
  const [previewUrl, setPreviewUrl] = React.useState('');
  const [uploadedImage, setUploadedImage] = React.useState('');
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null as unknown as HTMLInputElement);

  const { userProfile } = useUserProfile();
  const { posts, updatePostCtx } = usePost();

  const [selectedTopic, setSelectedTopic] = React.useState<string>('');
  const [topics, setTopics] = React.useState<ITopic[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>('');

  const [content, setContent] = React.useState<string>('');
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const post = React.useMemo(() => {
    console.log(posts.find((p) => p.id === postId));

    return posts.find((p) => p.id === postId);
  }, [posts, postId]);

  React.useEffect(() => {
    if (post) {
      setContent(post.content);
      setSelectedTopic(post.topic.id);
      if (post.image) {
        setPreviewUrl(post.image);
        setUploadedImage(post.image);
      }
    }
  }, [post]);

  React.useEffect(() => {
    getTopics()
      .then((response) => {
        setTopics(response.data);
      })
      .catch((error) => {
        console.error('Lỗi tìm nạp chủ đề:', error);
        setError('Không thể tải chủ đề.');
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    if (!post) return;

    try {
      setIsSubmitting(true);

      const postData: UpdatePost = {
        content: content.trim(),
        image: uploadedImage || '',
        topicId: selectedTopic,
      };

      const validatedData = updatePostSchema.parse(postData);

      const optimisticPost: IPost = {
        ...post,
        content: content.trim(),
        image: uploadedImage,
        topic: topics.find((topic) => topic.id === selectedTopic) || post.topic,
        updatedAt: new Date().toISOString(),
      };

      updatePostCtx(optimisticPost);
      if (onUpdateSuccess) {
        onUpdateSuccess(optimisticPost);
      }

      await updatePost({ ...validatedData, id: post.id });

      if (onClose) onClose();
    } catch (error) {
      updatePostCtx(post);
      if (onUpdateSuccess) {
        onUpdateSuccess(post);
      }

      if (error instanceof z.ZodError) {
        const errorMessage = error.errors.map((err) => err.message).join(', ');
        console.log(`Lỗi xác thực: ${errorMessage}`);
      } else {
        console.log('Không thể cập nhật bài đăng. Vui lòng thử lại.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl('');
    setUploadedImage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setContent((prevContent) => prevContent + emoji);
  };

  if (loading) return <SplashScreen />;
  if (error) return <div>{error}</div>;
  if (!post) return <div>Không tìm thấy bài đăng</div>;

  return (
    <div className="fixed z-9999 w-full h-full top-0 left-0 dark:bg-[#444444] bg-[#c1c1c1] z-100 dark:md:bg-[#12121299] md:bg-[#d9d9d9fc] shadow-stack">
      <div className="hidden md:block absolute top-2 right-2 z-20">
        <Button
          className="size-[40px] p-2.5"
          child={<CloseIcon />}
          onClick={onClose}
        />
      </div>
      <div className="w-full h-full rounded-button shadow-button dark:bg-[#282828b3] bg-neutral1-70 backdrop-blur-[50px] before:content-[''] before:absolute before:inset-0 before:rounded-button before:pointer-events-none before:border-[1.5px] before:border-[#ffffff1a] before:[mask-image:linear-gradient(175deg,#000,transparent_50%)] md:mx-auto md:w-[40rem] md:h-fit md:mt-[10%] md:rounded-button">
        <div className="md:hidden w-full flex items-center justify-between p-3">
          <Button
            className="size-10 p-2.5"
            child={<ArrowBackIcon />}
            onClick={onClose}
          />
          <Button
            className="px-[1.5rem] py-[0.75rem] rounded-[2rem] dark:text-secondary text-surface-2"
            child={<Typography level="base2sm">Cập nhật bài đăng</Typography>}
          />
        </div>

        <div className="w-full max-h-screen mx-auto flex flex-col justify-between items-center md:h-full md:items-start md:justify-between md:static md:rounded-[2rem]">
          <div className="w-full p-3 rounded-[1.25rem]">
            <div className="flex items-start gap-3">
              <Avatar
                size={44}
                className="max-h-[44px]"
                alt="avatar"
                src={userProfile?.avatar}
              />
              <div className="grow">
                <DebouncedInput
                  type="text"
                  placeholder="Chỉnh sửa bài đăng của bạn..."
                  value={content}
                  onChange={(value: string) => setContent(value)}
                  className="w-full mb-5 mt-2"
                />
                {previewUrl && (
                  <div className="relative mt-2 rounded-lg overflow-hidden group">
                    <div className="relative bg-neutral2-1 p-2 rounded-lg">
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-32 min-h-[200px] object-contain rounded"
                        width={300}
                        height={200}
                      />
                      {isUploading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                      <button
                        onClick={handleRemoveImage}
                        className="absolute top-4 right-4 p-1 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-opacity opacity-0 group-hover:opacity-100"
                        disabled={isUploading}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="fixed bottom-4 w-fit mx-auto rounded-[1.25rem] p-2 flex gap-2 items-center bg-neutral2-3 z-20 md:p-3 md:w-full md:bg-transparent md:relative md:mx-0 md:justify-between md:bottom-0">
            <EmojiButton
              onEmojiSelect={handleEmojiSelect}
            /> 
            <UploadImgButton
              fileInputRef={fileInputRef}
              setPreviewUrl={setPreviewUrl}
              setUploadedImage={setUploadedImage}
              setIsUploading={setIsUploading}
            />

            <Dropdown
              options={topics.map((topic) => ({
                label: topic.name,
                value: topic.id,
                color: topic.color,
              }))}
              value={selectedTopic}
              onChange={setSelectedTopic}
              placeholder="Chọn chủ đề"
            />

            <Button
              disabled={!content.trim() || isUploading || isSubmitting}
              type="submit"
              className="flex px-[1.5rem] py-[0.75rem] rounded-[2rem] dark:text-secondary  text-surface-2 ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
              child={<Typography level="base2sm">Cập nhật</Typography>}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
