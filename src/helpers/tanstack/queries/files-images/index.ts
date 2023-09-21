import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetFilesImages = (search: string) => {
  return useInfiniteQuery(
    ['filesImages', search],
    async ({ pageParam = '' }) => {
      const filesImages = await axios.get(`/api/files-images?search=${search}&cursor=${pageParam}`);
      return filesImages.data;
    },
    {
      cacheTime: 0,
      refetchInterval: 10000,
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
      onError: (error: any) => {
        console.error('ERROR GET FILES/IMAGES', error.response.data);
      },
    },
  );
};
