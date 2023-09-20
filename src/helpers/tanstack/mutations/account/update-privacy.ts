import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Router from 'next/router';

export const useUpdatePrivacyOptionsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (args: {
      is_display_name: boolean;
      is_receive_files_anonymous: boolean;
      is_receive_images_anonymous: boolean;
    }) => axios.patch('/api/account/update-privacy', args),
    {
      onError: (error: any) => {
        console.error('UPDATE PRIVACY OPTIONS ERROR', error.response.data);
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
