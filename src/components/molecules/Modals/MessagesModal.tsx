import { useState, useEffect, Fragment } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import ActivityIndicator from '~/components/atoms/ActivityIndicator';
import DeleteConfirmationModal from './DeleteConfirmationModal';

import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
import { messageModalStore } from '~/helpers/stores/modals';

import { MessageProps } from '~/shared/interfaces';
import { useGetMessages } from '~/helpers/tanstack/queries/messages';

interface MessagesModalProps {
  username: string;
}

const MessagesModal = ({ username }: MessagesModalProps): JSX.Element => {
  const router = useRouter();

  const { ref, inView } = useInView();

  const { isOpen, setIsOpen } = messageModalStore();

  const [search, setSearch] = useState<string>('');
  const [deleteValue, setDeleteValue] = useState<string>('');
  const [isOpenDeleteMessage, setIsOpenDeleteMessage] = useState<boolean>(false);
  const [deleteType, setDeleteType] = useState<'delete-message' | 'delete-all-messages'>(
    'delete-message',
  );

  const {
    data: messages,
    isLoading: isLoadingMessages,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetMessages(search);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  return (
    <>
      <div
        className={clsx(
          isOpen ? 'scale-y-100' : 'scale-y-0',
          'fixed inset-0 z-40 flex h-full w-full origin-bottom transform flex-col items-center justify-center bg-black bg-opacity-50 px-3 pb-3 pt-[4rem] backdrop-blur-xl transition duration-300 md:pt-3',
        )}
      >
        <div className="absolute h-full w-full flex-1 cursor-default bg-transparent outline-none" />
        <div className="z-20 flex h-full w-full max-w-xl flex-col items-center overflow-hidden rounded-xl bg-white bg-opacity-20 font-poppins text-white backdrop-blur-sm">
          <div className="relative flex w-full flex-col items-start justify-center gap-y-2 p-3">
            <div className="flex w-full flex-row items-center justify-between p-3">
              <label className="ml-3 text-base font-bold" htmlFor="search_messages">
                Messages
              </label>
              {messages && messages.pages[0].messages.length != 0 && (
                <button
                  type="button"
                  className="rounded-xl bg-neutral-500 px-3 py-1 text-xs text-white outline-none hover:bg-opacity-50"
                  onClick={() => {
                    setDeleteType('delete-all-messages');
                    setDeleteValue(username as string);
                    setIsOpenDeleteMessage(true);
                  }}
                >
                  Clear all
                </button>
              )}
            </div>
            <div className="flex w-full flex-row items-center gap-x-2 rounded-full bg-black bg-opacity-60 px-3 py-2 text-sm text-white backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                className="w-full bg-transparent outline-none"
                autoComplete="off"
                type="text"
                id="search_messages"
                placeholder="Search message content"
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
              />
            </div>
          </div>
          <div className="custom-scrollbar flex w-full flex-col items-start gap-y-1 overflow-y-auto px-3 pb-3">
            {isLoadingMessages ? (
              <div className="my-3 flex w-full flex-col items-center">
                <ActivityIndicator className="h-8 w-8" />
              </div>
            ) : (
              <>
                {messages && messages.pages[0].messages.length == 0 && (
                  <div className="my-3 flex w-full flex-col items-center">
                    <p className="text-xs font-light text-white">No message found.</p>
                  </div>
                )}
                {messages &&
                  messages.pages.map((page: { messages: any }, i: number) => (
                    <Fragment key={i}>
                      {page.messages.map((message: MessageProps) => (
                        <div
                          key={message.id}
                          className="flex w-full cursor-default flex-row items-start gap-x-2 rounded-xl bg-black bg-opacity-50 px-3 py-2 backdrop-blur-sm transition duration-100 hover:bg-opacity-10"
                        >
                          {message.sender ? (
                            <Image
                              priority
                              src={message.sender.profile_photo}
                              className="h-[3rem] w-[3rem] rounded-full bg-black object-cover"
                              alt="profile_image"
                              width={500}
                              height={500}
                              quality={100}
                            />
                          ) : (
                            <div className="flex h-[3rem] w-[3rem] flex-row items-center justify-center rounded-full bg-black object-cover">
                              <svg
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.5}
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                className="h-6 w-6 text-white"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                                />
                              </svg>
                            </div>
                          )}
                          <div className="flex flex-1 flex-col gap-y-1">
                            <div className="flex w-full flex-row items-center justify-between">
                              <button
                                type="button"
                                className={clsx(
                                  message.is_anonymous
                                    ? 'cursor-default text-black'
                                    : 'cursor-pointer text-white',
                                  'text-sm font-bold',
                                )}
                                onClick={() => {
                                  if (!message.is_anonymous) {
                                    setIsOpen(false);
                                    router.push(`/${message.sender.username}`);
                                  }
                                }}
                              >
                                {message.is_anonymous ? 'Anonymous' : `@${message.sender.username}`}
                              </button>
                              <button
                                type="button"
                                className="outline-none"
                                onClick={() => {
                                  setDeleteType('delete-message');
                                  setDeleteValue(message.id);
                                  setIsOpenDeleteMessage(true);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="h-4 w-4 text-white hover:text-opacity-50"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                            <h2 className="text-xs font-light text-neutral-300">
                              {message.content}
                            </h2>
                          </div>
                        </div>
                      ))}
                    </Fragment>
                  ))}
                <button
                  ref={ref}
                  className="flex w-full flex-col items-center justify-center space-y-2 text-white"
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {isFetchingNextPage ? (
                    <ActivityIndicator className="h-8 w-8" />
                  ) : hasNextPage ? (
                    ''
                  ) : (
                    ''
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <DeleteConfirmationModal
        type={deleteType}
        value={deleteValue}
        isOpen={isOpenDeleteMessage}
        setIsOpen={setIsOpenDeleteMessage}
      />
    </>
  );
};

export default MessagesModal;
