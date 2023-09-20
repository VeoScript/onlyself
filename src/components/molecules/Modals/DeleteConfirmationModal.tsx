import { useState } from 'react';
import clsx from 'clsx';
import toast from 'react-hot-toast';

import { useDeleteMessageMutation } from '~/helpers/tanstack/mutations/message/delete-message';
import { useDeleteAllMessagesMutation } from '~/helpers/tanstack/mutations/message/delete-all-messages';

interface DeleteConfirmationModalProps {
  type: 'delete-message' | 'delete-all-messages';
  value: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const DeleteConfirmationModal = ({
  type,
  value,
  isOpen,
  setIsOpen,
}: DeleteConfirmationModalProps): JSX.Element => {
  const deleteMessageMutation = useDeleteMessageMutation();
  const deleteAllMessagesMutation = useDeleteAllMessagesMutation();

  const [isPending, setIsPending] = useState<boolean>(false);

  const handleConfirm = async () => {
    if (type === 'delete-message') {
      setIsPending(true);
      await deleteMessageMutation.mutateAsync(
        {
          message_id: value,
        },
        {
          onError: () => {
            toast.error('Error deleting message, try again.');
            setIsPending(false);
            setIsOpen(false);
          },
          onSuccess: () => {
            setIsPending(false);
            setIsOpen(false);
          },
        },
      );
    }

    if (type === 'delete-all-messages') {
      setIsPending(true);
      await deleteAllMessagesMutation.mutateAsync(
        {
          username: value,
        },
        {
          onError: () => {
            toast.error('Error deleting all message, try again.');
            setIsPending(false);
            setIsOpen(false);
          },
          onSuccess: () => {
            setIsPending(false);
            setIsOpen(false);
          },
        },
      );
    }
  };

  return (
    <div
      className={clsx(
        isOpen ? 'scale-y-100' : 'scale-y-0',
        'fixed inset-0 z-[60] flex h-full w-full origin-bottom transform flex-col items-center justify-center bg-black bg-opacity-80 px-3 pb-3 pt-[4rem] transition duration-300 md:pt-3',
      )}
    >
      <button
        className="absolute h-full w-full flex-1 cursor-default bg-transparent outline-none"
        onClick={() => setIsOpen(false)}
      />
      <div className="z-[60] flex h-auto w-full max-w-sm flex-col items-center justify-center overflow-hidden rounded-xl bg-white bg-opacity-20 font-poppins text-white backdrop-blur-sm">
        <div className="flex w-full flex-col items-start justify-center p-3">
          <div className="flex w-full flex-row items-center p-3">
            <p className="text-base font-medium text-white">Delete</p>
          </div>
          <div className="flex w-full flex-row items-center p-3">
            <p className="text-sm font-light text-white">
              {type === 'delete-message' && 'Are you sure you want to delete this message?'}
              {type === 'delete-all-messages' &&
                'Are you sure you want to delete all of your messages? This cannot be undone.'}
            </p>
          </div>
          <div className="flex w-full flex-row items-center justify-end gap-x-1 p-3">
            <button
              disabled={isPending}
              type="button"
              className={clsx(
                isPending && 'opacity-50',
                'rounded-xl bg-red-500 px-3 py-2 text-sm text-white outline-none hover:bg-opacity-50',
              )}
              onClick={handleConfirm}
            >
              {isPending ? 'Deleting...' : 'Proceed'}
            </button>
            <button
              type="button"
              className="rounded-xl bg-neutral-500 px-3 py-2 text-sm text-white outline-none hover:bg-opacity-50"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
