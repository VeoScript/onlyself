import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import ActivityIndicator from '../atoms/ActivityIndicator';
import {
  discoverModalStore,
  messageModalStore,
  filesModalStore,
  settingsModalStore,
} from '~/helpers/stores/modals';

import { useGetUser } from '~/helpers/tanstack/queries/user';
import { useGetCountUnread } from '~/helpers/tanstack/queries/messages/count-unread';

const BottomBar = (): JSX.Element => {
  const { data: user, isLoading: isLoadingUser } = useGetUser();
  const { data: unreadMessages, isLoading: isLoadingUnreadMessages } = useGetCountUnread();

  const { setIsOpen: setIsOpenDiscoverModal } = discoverModalStore();
  const { setIsOpen: setIsOpenMessagesModal } = messageModalStore();
  const { setIsOpen: setIsOpenFilesModal } = filesModalStore();
  const { setIsOpen: setIsOpenSettingsModal } = settingsModalStore();

  console.log('unreadMessages', unreadMessages);

  return (
    <div className="absolute bottom-5 z-20 flex w-full justify-center px-0 md:px-3">
      <div className="flex w-auto flex-row items-center justify-center gap-x-2 overflow-hidden rounded-xl bg-black bg-opacity-20 p-2 backdrop-blur-sm">
        {isLoadingUser || isLoadingUnreadMessages ? (
          <div className="flex w-full flex-row items-center px-5 py-2">
            <ActivityIndicator className="h-6 w-6" />
          </div>
        ) : (
          <>
            {!user ? (
              <div className="flex w-full flex-row items-center px-5 py-2">
                <h1 className="text-xs font-light text-white">
                  <Link href="/signin" className="text-accent-2 hover:underline">
                    Sign in
                  </Link>{' '}
                  to discover, connect and share to everyone.
                </h1>
              </div>
            ) : (
              <>
                <button
                  data-tooltip-id="onlyself-tooltip"
                  data-tooltip-content="My Profile"
                  className="rounded-xl bg-white bg-opacity-20 p-2 outline-none backdrop-blur-sm transition duration-200 ease-in-out hover:scale-110 hover:bg-opacity-10"
                  type="button"
                  onClick={() => Router.push(`/${user.username}`)}
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
                    className="h-6 w-6 text-white"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </button>
                <button
                  data-tooltip-id="onlyself-tooltip"
                  data-tooltip-content="Discover"
                  className="rounded-xl bg-white bg-opacity-20 p-2 outline-none backdrop-blur-sm transition duration-200 ease-in-out hover:scale-110 hover:bg-opacity-10"
                  type="button"
                  onClick={() => setIsOpenDiscoverModal(true)}
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
                    className="h-6 w-6 text-white"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                  </svg>
                </button>
                <button
                  data-tooltip-id="onlyself-tooltip"
                  data-tooltip-content="Messages"
                  className="relative rounded-xl bg-white bg-opacity-20 p-2 outline-none backdrop-blur-sm transition duration-200 ease-in-out hover:scale-110 hover:bg-opacity-10"
                  type="button"
                  onClick={() => setIsOpenMessagesModal(true)}
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
                    className="h-6 w-6 text-white"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  {unreadMessages != 0 && (
                    <p className="absolute -right-1 -top-2 z-10 flex h-5 w-5 flex-row items-center justify-center rounded-full bg-red-500 text-[11px] text-white">
                      <span>{unreadMessages}</span>
                    </p>
                  )}
                </button>
                <button
                  data-tooltip-id="onlyself-tooltip"
                  data-tooltip-content="Files/Images"
                  className="rounded-xl bg-white bg-opacity-20 p-2 outline-none backdrop-blur-sm transition duration-200 ease-in-out hover:scale-110 hover:bg-opacity-10"
                  type="button"
                  onClick={() => setIsOpenFilesModal(true)}
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
                    className="h-6 w-6 text-white"
                  >
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                </button>
                <button
                  data-tooltip-id="onlyself-tooltip"
                  data-tooltip-content="Settings"
                  className="rounded-xl bg-white bg-opacity-20 p-2 outline-none backdrop-blur-sm transition duration-200 ease-in-out hover:scale-110 hover:bg-opacity-10"
                  type="button"
                  onClick={() => setIsOpenSettingsModal(true)}
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
                    className="h-6 w-6 text-white"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BottomBar;
