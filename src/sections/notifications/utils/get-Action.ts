import { IAction } from '@/interfaces/notification';
import { useTranslation } from 'react-i18next';

//--------------------------------------------------------------------------------------------

export const getAction = (action: IAction): string => {
  const { t } = useTranslation();
  switch (action) {
    case IAction.FOLLOWED:
      return t('followed you');
    case IAction.LIKED:
      return t('liked your post');
    case IAction.REPLIED:
      return t('replied your post');
    default:
      return '';
  }
};
