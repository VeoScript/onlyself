import { Fragment, useState } from 'react';
import { LogoDefault } from '../atoms/Logo';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import * as Headless from '@headlessui/react';

import { UserProps } from '~/shared/interfaces';
import { useSignOutMutation } from '~/helpers/tanstack/mutations/auth/signinout';

interface MenuProps {
  user: UserProps;
  isLoading: boolean;
  isOpenMenu: boolean;
  setIsOpenMenu: (value: boolean) => void;
}

const Menu = ({ user, isLoading, isOpenMenu, setIsOpenMenu }: MenuProps): JSX.Element => {
  const signoutMutation = useSignOutMutation();

  const [isPending, setIsPending] = useState<boolean>(false);

  const handleSignOut = async () => {
    setIsPending(true);
    await signoutMutation.mutateAsync();
    setIsPending(false);
  };

  return (
    <div className="relative flex w-full flex-row items-center justify-between pt-5">
      <LogoDefault />
      <div className="flex w-full flex-row justify-end">
        <button
          type="button"
          className="block outline-none transition-all md:hidden"
          onClick={() => setIsOpenMenu(!isOpenMenu)}
        >
          {isOpenMenu ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
            </svg>
          )}
        </button>
        <div className="hidden flex-row items-center space-x-10 md:flex">
          <Link href="/" className="text-sm text-accent-1 hover:text-accent-1 hover:underline">
            Home
          </Link>
          <Link href="/" className="text-sm text-accent-1 hover:text-accent-1 hover:underline">
            Pricing
          </Link>
          {user && (
            <Headless.Menu as="div" className="relative inline-block text-left">
              <Headless.Menu.Button className="outline-none">
                {user.profile_photo ? (
                  <Image
                    priority
                    src={user.profile_photo}
                    className="h-[2.5rem] w-[2.5rem] rounded-full bg-black object-cover"
                    alt="cover_image"
                    width={1000}
                    height={1000}
                    quality={100}
                  />
                ) : (
                  <div className="flex h-[2.5rem] w-[2.5rem] flex-row items-center justify-center rounded-full bg-black object-cover">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="h-5 w-5 text-white"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                )}
              </Headless.Menu.Button>
              <Headless.Menu.Items className="absolute right-0 mt-2 flex w-56 origin-top-right flex-col divide-y divide-accent-3 overflow-hidden rounded-xl">
                <Headless.Menu.Item as={Fragment}>
                  <Link
                    href={`/${user.username}`}
                    className="w-full bg-accent-1 p-3 text-sm text-white hover:bg-opacity-50"
                  >
                    {isLoading ? 'Loading...' : user.name}
                  </Link>
                </Headless.Menu.Item>
                <Headless.Menu.Item as={Fragment}>
                  <button
                    disabled={isPending}
                    type="button"
                    className="w-full bg-accent-1 p-3 text-left text-sm text-white hover:bg-opacity-50"
                    onClick={handleSignOut}
                  >
                    {isPending ? 'Loading...' : 'Sign out'}
                  </button>
                </Headless.Menu.Item>
              </Headless.Menu.Items>
            </Headless.Menu>
          )}
        </div>
      </div>
    </div>
  );
};

const MenuMobile = ({ user, isLoading, isOpenMenu }: MenuProps): JSX.Element => {
  const signoutMutation = useSignOutMutation();

  const [isPending, setIsPending] = useState<boolean>(false);

  const handleSignOut = async () => {
    setIsPending(true);
    await signoutMutation.mutateAsync();
    setIsPending(false);
  };

  return (
    <div
      className={clsx(
        isOpenMenu ? 'scale-y-100' : 'scale-y-0',
        `absolute top-16 z-10 flex w-full origin-top transform flex-col items-center border-b border-accent-1 border-opacity-10 bg-accent-3 duration-300 md:hidden`,
      )}
    >
      <Link
        href="/"
        className="w-full px-5 py-3 text-left text-sm text-accent-1 hover:text-accent-1"
      >
        Home
      </Link>
      <Link
        href="/"
        className="w-full px-5 py-3 text-left text-sm text-accent-1 hover:text-accent-1"
      >
        Pricing
      </Link>
      {user && (
        <div className="flex w-full flex-row items-center justify-between gap-x-3 border-t border-accent-1 border-opacity-10 px-5 py-3">
          <Link
            href={`/${user.username}`}
            className="flex flex-row items-center justify-start gap-x-3"
          >
            {user.profile_photo ? (
              <Image
                priority
                src={user.profile_photo}
                className="h-[2.5rem] w-[2.5rem] rounded-full bg-accent-2 object-cover"
                alt="cover_image"
                width={1000}
                height={1000}
                quality={100}
              />
            ) : (
              <div className="flex h-[2.5rem] w-[2.5rem] flex-row items-center justify-center rounded-full bg-black object-cover">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="h-6 w-6 text-white"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            )}
            <span className="text-sm font-light text-accent-1">
              {isLoading ? 'Loading...' : user.name}
            </span>
          </Link>
          <button
            type="button"
            className="text-xs text-red-400 outline-none hover:underline"
            onClick={handleSignOut}
          >
            {isPending ? 'Loading...' : 'Sign out'}
          </button>
        </div>
      )}
    </div>
  );
};

export { Menu, MenuMobile };
