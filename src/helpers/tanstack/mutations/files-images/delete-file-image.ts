import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useDeleteFileImageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (args: { file_image_id: string; type: string; delete_url: string }) =>
      axios.delete(
        `/api/files-images/delete/${args.file_image_id}?type=${args.type}&delete_url=${args.delete_url}`,
      ),
    {
      onError: (error: any) => {
        console.error('DELETE FILE/IMAGE ERROR', error.response.data);
      },
      onSuccess: async () => {
        queryClient.invalidateQueries(['filesImages']);
      },
    },
  );
};
