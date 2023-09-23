import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useReadAllFilesImagesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(() => axios.put('/api/files-images/read-messages'), {
    onError: (error: any) => {
      console.error('READING ALL FILES/IMAGES ERROR', error.response.data);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(['filesImages']);
      queryClient.invalidateQueries(['allFiles']);
      queryClient.invalidateQueries(['countUnreadFilesImages']);
    },
  });
};
