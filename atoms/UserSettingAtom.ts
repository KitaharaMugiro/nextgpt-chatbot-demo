import { UserSettings } from '@/services/lib/user';

import { atom } from 'jotai';

export const UserSettingsAtom = atom<UserSettings>({
  request_limit: 0,
  tier: 'free',
  user: '',
  created_at: '',
});
