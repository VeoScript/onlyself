import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useCreateMessageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (args: { is_anonymous: boolean; content: string; sender: string; receiver_id: string }) =>
      axios.post('/api/message/create', args),
    {
      onError: (error: any) => {
        console.error('SENDING MESSAGE ERROR', error.response.data);
      },
      onSuccess: async () => {
        queryClient.invalidateQueries(['messages']);
      },
    },
  );
};
