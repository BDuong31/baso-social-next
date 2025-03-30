import { TrashIcon, LockIcon, ReportIcon } from '@/components/icons';
import MoreItem from './more-item';
import { useTranslation } from 'react-i18next';

//--------------------------------------------------------------------------------------------------------

interface MoreOptionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function MoreOptions({ onEdit, onDelete }: MoreOptionsProps) {
  const { t } = useTranslation();
  const _moreOptions = [
    {
      title: t('report'),
      icon: <ReportIcon />,
      onClick: onEdit,
    },
  ];

  return (
    <div className="absolute z-10 flex-col w-[15rem] p-2 dark:bg-neutral3-70  bg-neutral1-70 dark:shadow-dropup shadow-button backdrop-blur-[32px] rounded-[1.5rem] top-[3rem] right-1">
      {_moreOptions.map((item) => (
        <MoreItem
          key={item.title}
          title={item.title}
          icon={item.icon}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
}
