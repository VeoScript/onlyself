import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useUploadFilesImagesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (args: { type: 'IMAGE' | 'FILE'; name: string; url: string; delete_url: string }) =>
      axios.post('/api/files-images/upload', args),
    {
      onError: (error: any) => {
        console.error('UPLOAD IMAGES/FILES ERROR', error.response.data);
      },
      onSuccess: async () => {
        queryClient.invalidateQueries(['files-images']);
      },
    },
  );
};
