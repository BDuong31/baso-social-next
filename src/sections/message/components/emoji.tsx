import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import React, { useState, useRef } from 'react'
import { Button } from '@/components/button';
import { useTheme } from 'next-themes';

type EmojiDataType = {
  [key: string]: { emoji: string }[];
};

export default function Emoji({ onEmojiSelect }: { onEmojiSelect: (emoji: string) => void }) {
  const [emojiData, setEmojiData] = useState<EmojiDataType>({});
  const [isEmoji, setIsEmoji] = React.useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const emoijRef = useRef<HTMLDivElement | null >(null);
  const { theme } = useTheme();
  React.useEffect(() => {
    fetch('./emoji.json')
      .then((res) => res.json())
      .then((data) => {
        setEmojiData(data.emojis)
      })
  }, [emojiData]);
  
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
};

  React.useEffect(() => {
    const handleEmoji = (event: MouseEvent) => {
      if (emoijRef.current && !emoijRef.current.contains(event.target as Node)) {
        setIsEmoji(false);
      }
    };
    document.addEventListener('click', handleEmoji);
    return () => {
      document.removeEventListener('click', handleEmoji);
    };
  }, [isEmoji]);
  //console.log(isEmoji)

  const handleEmojiClick = (event: any, emojiObject: any) => {
    onEmojiSelect(emojiObject.emoji);
    console.log(emojiObject)
    isEmoji && setIsEmoji(false);
  }

  return (
    <>
    <div className="p-2.5 rounded-[0.75rem] group bg-neutral2-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        onClick={(e) => {
          e.stopPropagation();
          setIsEmoji(!isEmoji);
        }}
      >
        <g opacity="0.8" className="group-hover:opacity-100">
          <path
            d="M17.5 12C17.5 15.0376 15.0376 17.5 12 17.5C8.96243 17.5 6.5 15.0376 6.5 12M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z"
            stroke={theme === 'dark' ? '#F8F8F8' : '#1F1F1F'}
            strokeOpacity="0.5"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11 9C11 9.82843 10.3284 10.5 9.5 10.5C8.67157 10.5 8 9.82843 8 9C8 8.17157 8.67157 7.5 9.5 7.5C10.3284 7.5 11 8.17157 11 9Z"
            fill={theme === 'dark' ? '#F8F8F8' : '#1F1F1F'}
            fillOpacity="0.7"
          />
          <path
            d="M16 9C16 9.82843 15.3284 10.5 14.5 10.5C13.6716 10.5 13 9.82843 13 9C13 8.17157 13.6716 7.5 14.5 7.5C15.3284 7.5 16 8.17157 16 9Z"
            fill={theme === 'dark' ? '#F8F8F8' : '#1F1F1F'}
            fillOpacity="0.7"
          />
        </g>
      </svg>
    </div>
    {isEmoji && (
      <div ref={emoijRef} style={{top: 'calc(100% - 292px)',transition: 'visibility .2s, opacity .2s'}} className='absolute right-2 z-10 w-[372px] h-[201.5px] p-2 dark:bg-[#3b3b3b] bg-[#e6e6e6] dark:shadow-button-dark shadow-button rounded-button'>
        <div className='relative z-1'>
          <div>
          <div className="left-[-8px] top-[-8px] relative w-[372px]">
            <div className='flex gap-[7.5px] p-2 overflow-auto rounded-t-[32px] no-scrollbar'>
                  {Object.keys(emojiData).map((category, index) => (
                    <Button
                        key={index}
                        onClick={() => handleCategoryClick(category)}
                        className={`flex justify-center items-center h-[44.5px] w-[44.5px] pt-[1px] aspect-[1] text-[24px] rounded-full hover:bg-[#F7F7F71A] ${
                            activeCategory === category ? 'dark:bg-[#3E3E3E] bg-[#e6e6e6]' : ''
                        } dark:hover:bg-[#3E3E3E] hover:bg-[#e6e6e6] transition`}
                        child={ category ===  'Smileys & Emotion' ? '😀' : category === 'People & Body' ? '👨' : category === 'Animals & Nature' ? '🐶' : category === 'Food & Drink' ? '🍔' : category === 'Travel & Places' ? '🚗' : category === 'Activities' ? '⚽' : category === 'Objects' ? '📱' : category === 'Symbols' ? '💡' : category === 'Flags' ? '🏳️' : ''}
                    ></Button>
                ))}
            </div>
          </div>
          <div className="absolute top-[45.5px] flex flex-wrap h-[134px] w-[auto] mt-2 overflow-auto no-scrollbar">
                {activeCategory &&
                    Object.values(emojiData[activeCategory])
                        .flat()
                        .map((emoji, index) => (
                            <button
                                onClick={(e) => handleEmojiClick(e, emoji)}
                                key={index}
                                style={{transition: 'background .2s'}}
                                className="flex justify-center items-center w-[12.5%] pt-[1px] aspect-[1] text-[24px] rounded-full dark:hover:bg-[#F7F7F71A] hover:bg-[#7f7f7f1a]"
                            >
                                {emoji.emoji}
                            </button>
                        ))}
          </div>
          </div>
        </div>
      </div> 
    )}
    </>
  );
}
