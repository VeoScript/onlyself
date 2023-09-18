import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Router from 'next/router';

export const useSignInMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (args: { email: string; password: string }) =>
      axios.post('/api/auth/signin', {
        email: args.email,
        password: args.password,
      }),
    {
      onError: (error: any) => {
        console.error('SIGN IN ERROR', error.response.data);
      },
      onSuccess: async (data) => {
        queryClient.resetQueries();
        Router.push(`/${data.data.username}`);
      },
    },
  );
};
