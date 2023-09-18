import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { UserProps } from '~/shared/interfaces';

export const useGetUser = () => {
  return useQuery<UserProps>(
    ['user'],
    async () => {
      const user = await axios.get('/api/user');
      return user.data;
    },
    {
      onError: (error: any) => {
        console.error('ERROR GET USER', error.response.data);
      },
    },
  );
};
