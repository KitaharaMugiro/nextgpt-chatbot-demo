import { Database } from '@/supabase/database.types';
import Stripe from 'stripe';

export type UserSettings = Database['public']['Tables']['user_settings']['Row'];
export type UserSettingsResponse = {
  user_settings: UserSettings;
  subscription?: Stripe.Subscription;
};

const getUserSettings = async () => {
  return fetch('/api/user_settings').then((res) => {
    return res.json() as Promise<UserSettingsResponse>;
  });
};

export { getUserSettings };
