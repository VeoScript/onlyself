import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useReadAllMessagesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(() => axios.put('/api/message/read-messages'), {
    onError: (error: any) => {
      console.error('READING ALL MESSAGES ERROR', error.response.data);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(['messages']);
      queryClient.invalidateQueries(['countUnread']);
    },
  });
};
