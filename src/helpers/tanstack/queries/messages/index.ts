import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetMessages = (search: string) => {
  return useInfiniteQuery(
    ['messages', search],
    async ({ pageParam = '' }) => {
      const messages = await axios.get(`/api/message?search=${search}&cursor=${pageParam}`);
      return messages.data;
    },
    {
      cacheTime: 0,
      refetchInterval: 10000,
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
      onError: (error: any) => {
        console.error('ERROR GET MESSAGES', error.response.data);
      },
    },
  );
};
