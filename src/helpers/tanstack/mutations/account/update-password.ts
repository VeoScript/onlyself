import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Router from 'next/router';

export const useUpdatePasswordMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (args: { old_password: string; new_password: string }) =>
      axios.patch('/api/account/update-password', args),
    {
      onError: (error: any) => {
        console.error('UPDATE PASSWORD ERROR', error.response.data);
      },
      onSuccess: async (data) => {
        queryClient.invalidateQueries(['user']);
        queryClient.invalidateQueries(['users']);
        queryClient.invalidateQueries(['profile']);
        Router.push(`/${data.data.username}`);
      },
    },
  );
};
