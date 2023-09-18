import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Router from 'next/router';

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (args: {
      cover_photo: string;
      profile_photo: string;
      name: string;
      username: string;
      email: string;
    }) =>
      axios.patch('/api/account/update-profile', {
        cover_photo: args.cover_photo,
        profile_photo: args.profile_photo,
        name: args.name,
        username: args.username,
        email: args.email,
      }),
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
