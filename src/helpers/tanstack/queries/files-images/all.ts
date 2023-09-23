import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetAllFiles = () => {
  return useQuery(
    ['allFiles'],
    async () => {
      const allFiles = await axios.get('/api/files-images/all');
      return allFiles.data;
    },
    {
      onError: (error: any) => {
        console.error('ERROR GET ALL FILES', error.response.data);
      },
    },
  );
};
