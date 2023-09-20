import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetCountUnread = () => {
  return useQuery(
    ['countUnread'],
    async () => {
      const countUnread = await axios.get('/api/message/count-unread');
      return countUnread.data;
    },
    {
      cacheTime: 0,
      refetchInterval: 10000,
      onError: (error: any) => {
        console.error('ERROR GET UNREAD MESSAGES', error.response.data);
      },
    },
  );
};
