import React from 'react';

import { ArrowNextIcon, UploadIcon } from '@/components/icons';
import { Button } from '@/components/button';
import Emoji from './emoji';
import { set } from 'zod';

//-------------------------------------------------------------------------

// function handelSubmitMessage() {
//   return (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const inputElement = e.currentTarget.querySelector('input');
//     const message = inputElement ? inputElement.value : '';
//     console.log(message);
//   };
// }

export default function ChatInput({ onSent } : { onSent: (message: string) => void }) {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const [content, setContent] = React.useState<string>('');
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handelSubmitMessage = () => {{
      //console.log(content);
      onSent(content);
      setContent('');
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Selected file:', file);
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setContent(prevMessage => prevMessage + emoji);
  }

  return (
    <div className="w-full p-3">
        <div className="flex items-center gap-4 p-2.5 rounded-[2.625rem] dark:bg-neutral4-30 bg-neutral1-70">
          <button
            className="btn-upload p-[0.4375rem] group"
            onClick={handleButtonClick}
          >
            <UploadIcon />

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </button>

          <input
            type="text"
            placeholder="Type a message..."
            value={content}
            onChange={(e)=> setContent(e.target.value)}
            className="grow dark:text-primary text-surface-3 placeholder:text-light placeholder:text-sm placeholder:font-normal bg-transparent"
          />
          <Emoji 
            onEmojiSelect={handleEmojiSelect}
          />
          <Button
            className='p-2'
            child={<ArrowNextIcon />}
            onClick={()=>handelSubmitMessage()}
          />
        </div>
    </div>
  );
}
