import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useDeleteAllMessagesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (args: { username: string }) => axios.delete(`/api/message/delete/all/${args.username}`),
    {
      onError: (error: any) => {
        console.error('DELETE ALL MESSAGES ERROR', error.response.data);
      },
      onSuccess: async () => {
        queryClient.invalidateQueries(['messages']);
        queryClient.invalidateQueries(['countUnread']);
      },
    },
  );
};
