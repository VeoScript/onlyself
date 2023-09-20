import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Switch } from '@headlessui/react';
import clsx from 'clsx';
import ActivityIndicator from '../atoms/ActivityIndicator';

import { useCreateMessageMutation } from '~/helpers/tanstack/mutations/message/create-message';

interface MessageInputTextProps {
  isAuth: boolean;
  receiveFilesAnonymous: boolean;
  receiveImageAnonymous: boolean;
  senderProfile: string;
  userUsername: string;
  profileId: string;
}

const MessageInputText = ({
  isAuth,
  receiveFilesAnonymous,
  receiveImageAnonymous,
  senderProfile,
  userUsername,
  profileId,
}: MessageInputTextProps): JSX.Element => {
  const createMessageMutation = useCreateMessageMutation();

  const [isPending, setIsPending] = useState<boolean>(false);

  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  const [messageContent, setMessageContent] = useState<string>('');

  const setDefault = () => {
    setIsAnonymous(true);
    setMessageContent('');
  };

  const handleSendMessage = async () => {
    if (messageContent.trim() === '') return toast.error('Message is required.');

    setIsPending(true);

    await createMessageMutation.mutateAsync(
      {
        is_anonymous: isAnonymous,
        content: messageContent,
        sender_profile: senderProfile,
        sender: isAnonymous ? 'Anonymous' : userUsername,
        receiver_id: profileId,
      },
      {
        onError: (error) => {
          setIsPending(false);
          toast.error(error.response.data.message);
        },
        onSuccess: () => {
          toast.success('Message sent successfully.');
          setIsPending(false);
          setDefault();
        },
      },
    );
  };

  const onEnterPress = (e: React.KeyboardEvent) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      className="flex w-full flex-col items-center overflow-hidden rounded-xl"
      data-aos="fade-up"
      data-aos-delay="600"
    >
      <div className="flex w-full flex-row items-center justify-between bg-white bg-opacity-20 p-3 backdrop-blur-sm">
        <h1 className="text-xs text-white">Send me a message! 🤗</h1>
        <div className="flex items-center gap-x-2">
          <span className="text-xs font-light text-white">As anonymous</span>
          {!isAuth && <span className="text-2xl text-accent-2">&bull;</span>}
          {isAuth && (
            <Switch
              checked={isAnonymous}
              onChange={() => setIsAnonymous(!isAnonymous)}
              className={clsx(
                isAnonymous ? 'bg-blue-600' : 'bg-gray-200',
                'relative inline-flex h-6 w-11 items-center rounded-full',
              )}
            >
              <span
                className={clsx(
                  isAnonymous ? 'translate-x-6 bg-white' : 'translate-x-1 bg-blue-600',
                  'inline-block h-4 w-4 transform rounded-full transition',
                )}
              />
            </Switch>
          )}
        </div>
      </div>
      <textarea
        className="h-full w-full resize-none bg-white p-3 text-sm outline-none"
        rows={5}
        cols={40}
        spellCheck={false}
        value={messageContent}
        onChange={(e) => setMessageContent(e.currentTarget.value)}
        onKeyDown={onEnterPress}
      />
      <div className="flex w-full flex-row items-center justify-between gap-x-1 bg-white bg-opacity-20 p-3 backdrop-blur-sm">
        <div className="flex flex-row items-center gap-x-1">
          {receiveImageAnonymous && (
            <button
              type="button"
              className="flex flex-row items-center gap-x-1 rounded-xl border border-neutral-400 p-2 outline-none hover:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-white"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span className="text-xs font-light text-white">Send Image</span>
            </button>
          )}
          {receiveFilesAnonymous && (
            <button
              type="button"
              className="flex flex-row items-center gap-x-1 rounded-xl border border-neutral-400 p-2 outline-none hover:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-white"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <span className="text-xs font-light text-white">Send File</span>
            </button>
          )}
        </div>
        <button
          data-tooltip-id="onlyself-tooltip"
          data-tooltip-content="Send Message"
          disabled={isPending}
          type="button"
          className="outline-none"
          onClick={handleSendMessage}
        >
          {isPending ? (
            <ActivityIndicator className="h-6 w-6" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-white hover:opacity-50"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default MessageInputText;
