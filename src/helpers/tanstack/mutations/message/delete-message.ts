import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useDeleteMessageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (args: { message_id: string }) => axios.delete(`/api/message/delete/${args.message_id}`),
    {
      onError: (error: any) => {
        console.error('DELETE MESSAGE ERROR', error.response.data);
      },
      onSuccess: async () => {
        queryClient.invalidateQueries(['messages']);
      },
    },
  );
};
