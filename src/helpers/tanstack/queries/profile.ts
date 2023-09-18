import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { UserProps } from '~/shared/interfaces';

export const useGetProfile = (username: string) => {
  return useQuery<UserProps>(
    ['profile', username],
    async () => {
      const profile = await axios.get(`/api/${username}`);
      return profile.data;
    },
    {
      enabled: !!username,
      onError: (error: any) => {
        console.error('ERROR GET PROFILE', error.response.data);
      },
    },
  );
};
