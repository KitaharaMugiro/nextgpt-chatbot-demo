import { getUserSettings } from '../lib/user';

import { UserSettingsAtom } from '@/atoms/UserSettingAtom';
import { useAtom } from 'jotai';

export const useLoginUser = () => {
  const [userSettings, setUserSettings] = useAtom(UserSettingsAtom);

  const refreshUserSettings = async () => {
    const userSettings = await getUserSettings();
    setUserSettings(userSettings.user_settings);
  };

  return { userSettings, refreshUserSettings };
};
