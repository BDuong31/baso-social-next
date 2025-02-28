import React, {
  createContext,
  HTMLAttributes,
  useContext,
  useState,
} from 'react';

import { Typography } from '@/components/typography';

import { cn } from '@/lib';
import { useTheme } from 'next-themes';

//-----------------------------------------------------------------------------------------------

export enum ThemeOption {
  light,
  dark,
  auto,
}

interface ThemeSelectContextProps {
  activeTheme: ThemeOption;
  setActiveTheme: (theme: ThemeOption) => void;
}

const ThemeSelectContext = createContext<ThemeSelectContextProps | undefined>(
  undefined
);

const useThemeSelectContext = () => {
  const context = useContext(ThemeSelectContext);
  if (!context) {
    throw new Error(
      'useThemeSelectContext must be used within a ThemeSelectGroup'
    );
  }

  return context;
};

type ThemeSelectGroupProps = HTMLAttributes<HTMLDivElement>;

const ThemeSelectGroup = ({
  children,
  className,
  ...props
}: ThemeSelectGroupProps) => {
  const [activeTheme, setActiveTheme] = useState<ThemeOption>(
    ThemeOption.light
  );
  return (
    <ThemeSelectContext.Provider value={{ activeTheme, setActiveTheme }}>
      <div {...props} className={cn('flex gap-5', className)}>
        {children}
      </div>
    </ThemeSelectContext.Provider>
  );
};

interface GroupItemProps extends HTMLAttributes<HTMLButtonElement> {
  leading: React.ReactNode;
  title: string;
  value: ThemeOption;
  active: ( value: ThemeOption ) => void;
}

const GroupItem = ({ leading, title, value, active }: GroupItemProps) => {
  const { activeTheme, setActiveTheme } = useThemeSelectContext();
  const { theme, setTheme } = useTheme();

  const handleSetActiveTheme = () => {
    //console.log('value', value);
    //setTheme(value === 1 ? 'dark' : value === 0 ? 'light' : 'system');
    setActiveTheme(value);
    active(value);
  };
  const isActive = activeTheme === value;
  return (
    <button
      onClick={handleSetActiveTheme}
      className={`group/item flex flex-col gap-3 items-center cursor-pointer ${isActive && 'active'}`}
    >
      <div
        className={`h-[76px] w-[102px] rounded-xl border p-[2px] border-transparent dark:group-[.active]/item:border-neutral2-80 group-[.active]/item:border-neutral3-80 flex flex-shrink-0 flex-col items-center justify-center`}
      >
        {leading}
      </div>
      <Typography
        level="captionsm"
        className="dark:text-secondary text-surface-2 opacity-80 capitalize dark:group-[.active]/item:text-primary group-[.active]/item:text-surface-3 group-hover/item:opacity-100"
      >
        {title}
      </Typography>
    </button>
  );
};

ThemeSelectGroup.item = GroupItem;

export default ThemeSelectGroup;
