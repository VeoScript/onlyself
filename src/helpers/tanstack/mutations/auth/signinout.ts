import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Router from 'next/router';

export const useSignOutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    () =>
      axios.delete('/api/auth/signout'),
    {
      onError: (error: any) => {
        console.error('SIGN OUT ERROR', error.response.data);
      },
      onSuccess: async () => {
        queryClient.resetQueries();
        Router.push('/');
      },
    },
  );
};
