import {
  Loader,
  Palette,
  Pictures,
  Play,
  Sun,
  Sunrise,
  TextSize,
  EarthIcon,
} from '@/components/icons';
import { Toggle } from '@/components/toggle';
import { Typography } from '@/components/typography';
import SettingCard from '../components/setting-card';
import ThemeAutoBox from '../components/theme-auto-box';
import ThemeDarkBox from '../components/theme-dark-box';
import ThemeLightBox from '../components/theme-light-box';
import ThemeSelectGroup, {
 ThemeOption,
} from '../components/theme-select-group';
import ColorToggleGroup from '../components/color-toggle-group';
import TextSizeSlider from '../components/TextSizeSlider';
import BrightnessSlider from '../components/BrightnessSlider';
import { Dropdown } from '@/components/dropdown';

import React from 'react';
import '@/utils/i18n';
import { useTranslation } from 'react-i18next';
import { on } from 'events';
import { useTheme } from 'next-themes';
import { Languages } from 'lucide-react';
export const PreferencesSection = ({ onPreferenceChange}: { onPreferenceChange : (theme: any, language: string) => void}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const accentColors = [
    {
      key: 'blue',
      value: '#425DE8',
    },
    {
      key: 'yellow',
      value: '#EDBF64',
    },
    {
      key: 'green',
      value: '#64C089',
    },
    {
      key: 'purple',
      value: '#9B7AF9',
    },
    {
      key: 'pink',
      value: '#F16D8D',
    },
  ];
  const optionLanguages = [
    {
      value: 'en',
      label: t('english'),
    },
    {
      value: 'vi',
      label: t('vietnamese'),
    },
  ]
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = React.useState(i18n.language);
  const [selectedTheme, setSelectedTheme] = React.useState(theme);
  const handleSetActiveTheme = (value: ThemeOption) => {
    const ThemeValue = value === 0 ? 'light' : value === 1 ? 'dark' : 'system';
    setSelectedTheme(ThemeValue);
  };

  React.useEffect(() => {
    setSelectedTheme(theme);
  }, []);
  React.useEffect(() => {
    console.log(selectedLanguage, selectedTheme);
    onPreferenceChange(selectedTheme, selectedLanguage); // Chuyển giá trị trực tiếp
  }, [selectedTheme, selectedLanguage]);

  return (
    <section className="flex-1 flex flex-col h-full gap-3 overflow-auto no-scrollbar">
      <SettingCard>
        <SettingCard.item className="group flex flex-col items-start gap-4 md:flex-row">
          <span className="inline-flex gap-3 items-center opacity-80 group-hover:opacity-100">
            <Sunrise />
            <Typography level="base2r" className=" dark:text-secondary text-surface-2 mr-auto">
              {t('appearance')}
            </Typography>
          </span>
          <ThemeSelectGroup className="w-full justify-center flex gap-2 md:gap-5 md:w-fit">
            <ThemeSelectGroup.item
              value={ThemeOption.light}
              className="w-[96px] h-[72px] dark:bg-slate-200 bg-slate-950"
              leading={<ThemeLightBox />}
              title={t('light')}
              active={() => handleSetActiveTheme(ThemeOption.light)}
            />
            <ThemeSelectGroup.item
              value={ThemeOption.dark}
              className="w-[96px] h-[72px] bg-slate-200"
              leading={<ThemeDarkBox />}
              title={t('dark')}
              active={() => handleSetActiveTheme(ThemeOption.dark)}

            />
            <ThemeSelectGroup.item
              value={ThemeOption.auto}
              className="w-[96px] h-[72px] bg-slate-200"
              leading={<ThemeAutoBox />}
              title={t('auto')}
              active={() => handleSetActiveTheme(ThemeOption.auto)}
            />
          </ThemeSelectGroup>
        </SettingCard.item>
        {/* <SettingCard.item className="group">
          <span className="inline-flex gap-3 items-center opacity-80 group-hover:opacity-100">
            <Palette />
            <Typography level="base2r" className=" dark:text-secondary text-surface-2">
              {t('accent color')}
            </Typography>
          </span>
          <ColorToggleGroup
            colorOptions={accentColors}
            selectedColor={accentColors[0].key}
          />
        </SettingCard.item> */}
        <SettingCard.item className="group">
          <span className="inline-flex gap-3 items-center opacity-80 group-hover:opacity-100">
            <EarthIcon />
            <Typography level="base2r" className=" dark:text-secondary text-surface-2">
              {t('language')}
            </Typography>
          </span>
          <Dropdown
            options={optionLanguages}
            value={selectedLanguage}
            onChange={(value) => setSelectedLanguage(value)}
            placeholder={selectedLanguage === 'en' ? t('english') : t('vietnamese')}
          />
        </SettingCard.item>
        {/* <SettingCard.item className="group">
          <span className="inline-flex gap-3 items-center opacity-80 group-hover:opacity-100">
            <TextSize />
            <Typography level="base2r" className=" dark:text-secondary text-surface-2">
              {t('text size')}
            </Typography>
          </span>
          <TextSizeSlider initialValue={20} />
        </SettingCard.item> */}

        {/* <SettingCard.item className="group">
          <span className="inline-flex gap-3 items-center opacity-80 group-hover:opacity-100">
            <Sun />
            <Typography level="base2r" className=" dark:text-secondary text-surface-2">
              {t('brightness')}
            </Typography>
          </span>
          <BrightnessSlider />
        </SettingCard.item> */}
      </SettingCard>
      {/* <SettingCard>
        <SettingCard.item className="group">
          <span className="inline-flex gap-3 items-center opacity-80 group-hover:opacity-100">
            <Loader />
            <Typography level="base2r" className=" dark:text-secondary text-surface-2">
              {t('reduce motion')}
            </Typography>
          </span>
          <Toggle />
        </SettingCard.item>
        <SettingCard.item className="group">
          <span className="inline-flex gap-3 items-center opacity-80 group-hover:opacity-100">
            <Play />
            <Typography level="base2r" className=" dark:text-secondary text-surface-2">
              {t('auto play')}
            </Typography>
          </span>
          <Toggle />
        </SettingCard.item>
        <SettingCard.item className="group">
          <span className="inline-flex gap-3 items-center opacity-80 group-hover:opacity-100">
            <Pictures />
            <Typography level="base2r" className=" dark:text-secondary text-surface-2">
              {t('high quality photo')}
            </Typography>
          </span>
          <Toggle defaultChecked />
        </SettingCard.item>
      </SettingCard> */}
    </section>
  );
};
