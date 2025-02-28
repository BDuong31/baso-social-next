import { Typography } from '@/components/typography';
import React from 'react';

interface ToggleItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const ToggleItem: React.FC<ToggleItemProps> = ({
  label,
  isActive,
  onClick,
}) => {
  return (
    <button
      className={`flex-1 flex justify-center items-center font-semibold cursor-pointer whitespace-nowrap px-6 py-2 h-full ${
        isActive ? 'rounded-[100px] dark:bg-neutral2-5 bg-neutral1-50 dark:shadow-toggle shadow-button' : ''
      }`}
      onClick={onClick}
    >
      <Typography
        level="base2sm"
        className={`opacity-80 dark:text-secondary text-surface-2 ${isActive ? 'dark:text-primary text-surface-3 opacity-100' : ''}`}
      >
        {label}
      </Typography>
    </button>
  );
};

export default ToggleItem;
