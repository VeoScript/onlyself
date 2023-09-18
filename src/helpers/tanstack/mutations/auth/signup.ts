import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Router from 'next/router';

export const useSignUpMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (args: { name: string; email: string; password: string }) =>
      axios.post('/api/auth/signup', {
        name: args.name,
        email: args.email,
        password: args.password,
      }),
    {
      onError: (error: any) => {
        console.error('SIGN UP ERROR', error.response.data);
      },
      onSuccess: async (data) => {
        queryClient.resetQueries();
        Router.push(`/${data.data.username}`);
      },
    },
  );
};
