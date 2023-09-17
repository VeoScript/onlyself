import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetProfile = (username: string) => {
  return useQuery(
    ['profile'],
    async () => {
      const profile = await axios.get(`/api/${username}`);
      return profile.data;
    },
    {
      onError: (error: any) => {
        console.error('ERROR GET PROFILE', error.response.data);
      },
    },
  );
};
