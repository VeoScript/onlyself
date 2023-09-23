import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetCountUnreadFilesImages = () => {
  return useQuery(
    ['countUnreadFilesImages'],
    async () => {
      const countUnread = await axios.get('/api/files-images/count-unread');
      return countUnread.data;
    },
    {
      cacheTime: 0,
      refetchInterval: 10000,
      onError: (error: any) => {
        console.error('ERROR GET UNREAD FILES/IMAGES', error.response.data);
      },
    },
  );
};
