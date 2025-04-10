'use client';
import { uploadImage } from '@/apis/media';
import React from 'react';
import {  useTheme } from 'next-themes';

interface ButtonUploadImgProps {
  setPreviewUrl: (value: string) => void;
  setUploadedImage: (value: string) => void;
  setIsUploading: (value: boolean) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export default function ButtonUploadImg({
  setPreviewUrl,
  setUploadedImage,
  setIsUploading,
  fileInputRef,
}: ButtonUploadImgProps) {
  const { theme } = useTheme();
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        if (!file.type.startsWith('image/')) {
          throw new Error('File type is not supported');
        }

        if (file.size > 500 * 1024 * 1024) {
          throw new Error('File size is too large');
        }

        setIsUploading(true);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
        const response = await uploadImage(file);

        setUploadedImage(response.data.url || URL.createObjectURL(file));
      } catch (error) {
        console.error('Upload failed:', error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleButtonClick}
        className="p-2.5 rounded-[0.75rem] group dark:bg-neutral2-1 bg-neutral1-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g opacity="0.8" className="group-hover:opacity-100">
            <path
              d="M5.87868 14.1213L6.40901 14.6517L6.40901 14.6517L5.87868 14.1213ZM6.75 4.5H17.25V3H6.75V4.5ZM19.5 6.75V17.25H21V6.75H19.5ZM4.28033 16.7803L6.40901 14.6517L5.34835 13.591L3.21967 15.7197L4.28033 16.7803ZM4.5 17.25V16.25H3V17.25H4.5ZM4.5 16.25V6.75H3V16.25H4.5ZM9.59099 14.6517L15.7197 20.7803L16.7803 19.7197L10.6517 13.591L9.59099 14.6517ZM17.25 19.5H16.25V21H17.25V19.5ZM16.25 19.5H6.75V21H16.25V19.5ZM6.40901 14.6517C7.28769 13.773 8.71231 13.773 9.59099 14.6517L10.6517 13.591C9.18718 12.1265 6.81282 12.1265 5.34835 13.591L6.40901 14.6517ZM3 17.25C3 19.3211 4.67893 21 6.75 21V19.5C5.50736 19.5 4.5 18.4926 4.5 17.25H3ZM19.5 17.25C19.5 18.4926 18.4926 19.5 17.25 19.5V21C19.3211 21 21 19.3211 21 17.25H19.5ZM17.25 4.5C18.4926 4.5 19.5 5.50736 19.5 6.75H21C21 4.67893 19.3211 3 17.25 3V4.5ZM6.75 3C4.67893 3 3 4.67893 3 6.75H4.5C4.5 5.50736 5.50736 4.5 6.75 4.5V3ZM15.75 9.5C15.75 10.1904 15.1904 10.75 14.5 10.75V12.25C16.0188 12.25 17.25 11.0188 17.25 9.5H15.75ZM14.5 10.75C13.8096 10.75 13.25 10.1904 13.25 9.5H11.75C11.75 11.0188 12.9812 12.25 14.5 12.25V10.75ZM13.25 9.5C13.25 8.80964 13.8096 8.25 14.5 8.25V6.75C12.9812 6.75 11.75 7.98122 11.75 9.5H13.25ZM14.5 8.25C15.1904 8.25 15.75 8.80964 15.75 9.5H17.25C17.25 7.98122 16.0188 6.75 14.5 6.75V8.25Z"
              fill={theme === 'dark' ? '#F8F8F8' : '#1F1F1F'}
              fillOpacity="0.5"
            />
          </g>
        </svg>
      </button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </>
  );
}
// 'use client';
// import React, { useRef } from 'react';

// export default function ButtonUploadImg() {
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const handleButtonClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click(); // Trigger input file click
//     }
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       console.log('Selected file:', file);
//     }
//   };

//   return (
//     <>
//       <button
//         type="button"
//         onClick={handleButtonClick}
//         className="p-2.5 rounded-[0.75rem] group bg-neutral2-1"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//         >
//           <g opacity="0.8" className="group-hover:opacity-100">
//             <path
//               d="M5.87868 14.1213L6.40901 14.6517L6.40901 14.6517L5.87868 14.1213ZM6.75 4.5H17.25V3H6.75V4.5ZM19.5 6.75V17.25H21V6.75H19.5ZM4.28033 16.7803L6.40901 14.6517L5.34835 13.591L3.21967 15.7197L4.28033 16.7803ZM4.5 17.25V16.25H3V17.25H4.5ZM4.5 16.25V6.75H3V16.25H4.5ZM9.59099 14.6517L15.7197 20.7803L16.7803 19.7197L10.6517 13.591L9.59099 14.6517ZM17.25 19.5H16.25V21H17.25V19.5ZM16.25 19.5H6.75V21H16.25V19.5ZM6.40901 14.6517C7.28769 13.773 8.71231 13.773 9.59099 14.6517L10.6517 13.591C9.18718 12.1265 6.81282 12.1265 5.34835 13.591L6.40901 14.6517ZM3 17.25C3 19.3211 4.67893 21 6.75 21V19.5C5.50736 19.5 4.5 18.4926 4.5 17.25H3ZM19.5 17.25C19.5 18.4926 18.4926 19.5 17.25 19.5V21C19.3211 21 21 19.3211 21 17.25H19.5ZM17.25 4.5C18.4926 4.5 19.5 5.50736 19.5 6.75H21C21 4.67893 19.3211 3 17.25 3V4.5ZM6.75 3C4.67893 3 3 4.67893 3 6.75H4.5C4.5 5.50736 5.50736 4.5 6.75 4.5V3ZM15.75 9.5C15.75 10.1904 15.1904 10.75 14.5 10.75V12.25C16.0188 12.25 17.25 11.0188 17.25 9.5H15.75ZM14.5 10.75C13.8096 10.75 13.25 10.1904 13.25 9.5H11.75C11.75 11.0188 12.9812 12.25 14.5 12.25V10.75ZM13.25 9.5C13.25 8.80964 13.8096 8.25 14.5 8.25V6.75C12.9812 6.75 11.75 7.98122 11.75 9.5H13.25ZM14.5 8.25C15.1904 8.25 15.75 8.80964 15.75 9.5H17.25C17.25 7.98122 16.0188 6.75 14.5 6.75V8.25Z"
//               fill="#F8F8F8"
//               fillOpacity="0.5"
//             />
//           </g>
//         </svg>
//       </button>

//       <input
//         type="file"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         accept="image/*"
//         className="hidden"
//       />
//     </>
//   );
// }
