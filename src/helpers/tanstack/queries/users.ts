import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetUsers = (search: string) => {
  return useInfiniteQuery(
    ['users', search],
    async ({ pageParam = '' }) => {
      const users = await axios.get(`/api/users?search=${search}&cursor=${pageParam}`);
      return users.data;
    },
    {
      cacheTime: 0,
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
      onError: (error: any) => {
        console.error('ERROR GET USERS', error.response.data);
      },
    },
  );
};
