import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useDeleteAllFilesImagesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (args: { username: string; type: string; files: any[] }) =>
      axios.post(`/api/files-images/delete/all`, args),
    {
      onError: (error: any) => {
        console.error('DELETE ALL FILES/IMAGES ERROR', error.response.data);
      },
      onSuccess: async () => {
        queryClient.invalidateQueries(['filesImages']);
      },
    },
  );
};
