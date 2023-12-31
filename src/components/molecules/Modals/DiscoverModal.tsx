import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import ActivityIndicator from '~/components/atoms/ActivityIndicator';

import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';
import { discoverModalStore } from '~/helpers/stores/modals';

import { UserProps } from '~/shared/interfaces';
import { useGetUsers } from '~/helpers/tanstack/queries/users';

const DiscoverModal = (): JSX.Element => {
  const router = useRouter();

  const { ref, inView } = useInView();

  const { isOpen, setIsOpen } = discoverModalStore();

  const [search, setSearch] = useState<string>('');

  const {
    data: users,
    isLoading: isLoadingUsers,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetUsers(search);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  return (
    <div
      className={clsx(
        isOpen ? 'scale-y-100' : 'scale-y-0',
        router.pathname === '/' ? 'pt-3' : 'pt-[4rem]',
        'fixed inset-0 z-40 flex h-full w-full origin-bottom transform flex-col items-center justify-center bg-black bg-opacity-50 px-3 pb-3 backdrop-blur-xl transition duration-300 md:pt-3',
      )}
    >
      <div className="absolute h-full w-full flex-1 cursor-default bg-transparent outline-none" />
      <div className="z-20 flex h-full w-full max-w-xl flex-col items-center overflow-hidden rounded-xl bg-white bg-opacity-10 font-poppins text-white backdrop-blur-sm">
        <div className="flex w-full flex-row items-start justify-between">
          <div className="flex w-full flex-col items-start justify-center gap-y-2 p-3">
            <div className="flex w-full flex-row items-center justify-between">
              <label htmlFor="search_people" className="ml-3 text-base font-bold">
                Discover
              </label>
              {router.pathname !== '/[username]' && (
                <div className="flex p-3">
                  <button
                    data-tooltip-id="onlyself-tooltip"
                    data-tooltip-content="Back"
                    type="button"
                    className="outline-none"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 md:h-5 md:w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                  </button>
                </div>
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
                id="search_people"
                placeholder="Search people by name"
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
              />
            </div>
          </div>
        </div>
        <div className="custom-scrollbar flex w-full flex-col items-start gap-y-2 overflow-y-auto px-3 pb-3">
          {isLoadingUsers ? (
            <div className="my-3 flex w-full flex-col items-center">
              <ActivityIndicator className="h-8 w-8" />
            </div>
          ) : (
            <>
              {users && users.pages[0].users.length == 0 && (
                <div className="my-3 flex w-full flex-col items-center">
                  <p className="text-xs font-light text-white">No user found.</p>
                </div>
              )}
              {users &&
                users.pages.map((page: { users: any }, i: number) => (
                  <Fragment key={i}>
                    {page.users.map((user: UserProps) => (
                      <Link
                        key={user.id}
                        href={`/${user.username}`}
                        style={{ backgroundImage: `url(${user.cover_photo})` }}
                        className="relative flex w-full flex-row items-center gap-x-3 rounded-xl bg-black bg-opacity-80 bg-center bg-no-repeat px-3 py-2 backdrop-blur-sm transition duration-100 hover:opacity-80"
                        onClick={() => setIsOpen(false)}
                      >
                        {user.cover_photo && (
                          <div className="absolute inset-0 -z-10 h-full w-full rounded-xl bg-black bg-opacity-10 backdrop-blur-sm" />
                        )}
                        {user.profile_photo ? (
                          <Image
                            priority
                            src={user.profile_photo}
                            className="h-[5rem] w-[5rem] rounded-full bg-black object-cover"
                            alt="profile_image"
                            width={500}
                            height={500}
                            quality={100}
                          />
                        ) : (
                          <div className="flex h-[5rem] w-[5rem] flex-row items-center justify-center rounded-full bg-black object-cover">
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
                          </div>
                        )}
                        <div className="flex flex-col">
                          <h1 className="text-sm font-bold text-white">{user.name}</h1>
                          <h2 className="text-xs font-light text-neutral-300">{user.username}</h2>
                        </div>
                      </Link>
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
  );
};

export default DiscoverModal;
