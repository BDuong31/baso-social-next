import React from 'react';

import { PostDetailView } from '@/sections/post-detail/view';

//------------------------------------------------------------------------------------------------

export const metadata = {
  title: 'Bài viết | Baso Spark',
}

export default function PostDetail({ params }: { params: { id: string } }) {
  return <PostDetailView id={params.id} />;
}
