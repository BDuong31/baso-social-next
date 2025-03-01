'use client';

import React from 'react';

import { LeftButton, RightButton } from '@/components/icons';

import { cn } from '@/lib/utils';

//-----------------------------------------------------------------------------------------------

interface TagsBarProps {
  tagNames: string[];
  className?: string;
  onTagSelect: (tag: string) => void;
}

export default function FilterBar({
  tagNames,
  className,
  onTagSelect,
}: TagsBarProps) {
  const [activeTagIndex, setActiveTagIndex] = React.useState<number>(0);

  const handleTagClick = (index: number) => {
    setActiveTagIndex(index);
    onTagSelect(tagNames[index]);
  };

  return (
    <div
      className={cn(
        'relative flex space-x-2 items-center p-6 justify-center gap-3 w-full z-[2]',
        className
      )}
    >
      <div
        onClick={() =>
          setActiveTagIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : tagNames.length - 1
          )
        }
        className="absolute items-center justify-center left-0 dark:bg-neutral3-50 bg-neutral1-1 rounded-full flex w-6 h-6 cursor-pointer"
      >
        <LeftButton />
      </div>

      <div className="absolute overflow-x-scroll no-scrollbar flex justify-start items-start gap-1 flex-nowrap w-full max-w-[calc(100%-70px)]">
        {tagNames.map((tag, index) => (
          <div className='flex'>
          <div
            key={tag}
            onClick={() => handleTagClick(index)}
            className={`w-[max-content] tag-card dark:text-[#f8f8f8b3] text-[#080808b3] text-sm font-semibold px-4 py-2 rounded-xl cursor-pointer dark:hover:bg-hover hover:bg-neutral1-60 ${
              activeTagIndex === index ? 'dark:bg-[#f8f8f81a] bg-neutral1-60' : ''
            }`}
          >
            {tag}
          </div>
          </div>
        ))}
      </div>

      <div
        onClick={() =>
          setActiveTagIndex((prevIndex) =>
            prevIndex < tagNames.length - 1 ? prevIndex + 1 : 0
          )
        }
        className="absolute right-0 dark:bg-neutral3-50 bg-neutral1-1 rounded-full flex justify-center items-center w-6 h-6 cursor-pointer"
      >
        <RightButton />
      </div>
    </div>
  );
}
