import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Router from 'next/router';

export const useUpdateSocialLinksMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (args: {
      facebook_link: string;
      instagram_link: string;
      twitterx_link: string;
      linkedin_link: string;
      github_link: string;
      website_link: string;
    }) => axios.patch('/api/account/update-social-links', args),
    {
      onError: (error: any) => {
        console.error('UPDATE SOCIAL LINKS ERROR', error.response.data);
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
