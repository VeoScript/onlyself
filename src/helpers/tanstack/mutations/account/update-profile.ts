import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Router from 'next/router';

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (args: {
      profile_photo: string;
      cover_photo: string;
      short_bio: string;
      favorite_quote: string;
      name: string;
      username: string;
      email: string;
    }) => axios.patch('/api/account/update-profile', args),
    {
      onError: (error: any) => {
        console.error('UPDATE PROFILE ERROR', error.response.data);
      },
      onSuccess: async (data) => {
        queryClient.invalidateQueries(['user']);
        queryClient.invalidateQueries(['profile']);
        Router.push(`/${data.data.username}`);
      },
    },
  );
};
