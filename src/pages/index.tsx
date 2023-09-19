import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '~/components/templates/MainLayout';
import DiscoverModal from '~/components/molecules/Modals/DiscoverModal';

import { discoverModalStore } from '~/helpers/stores/modals';
import { useGetUser } from '~/helpers/tanstack/queries/user';

const Home = (): JSX.Element => {
  const { setIsOpen: setIsOpenDiscoverModal } = discoverModalStore();

  const { data: user, isLoading: isLoadingUser } = useGetUser();

  return (
    <>
      <Head>
        <title>Onlyself</title>
      </Head>
      <MainLayout user={user} isLoading={isLoadingUser}>
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-8 py-20 md:-mt-20 md:h-screen md:py-0">
          <div className="flex w-full max-w-full flex-col items-center gap-y-3 md:max-w-5xl">
            <h1
              className="text-center text-base font-light leading-tight text-accent-1 md:text-xl"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              Discover, Connect, and Share.
            </h1>
            <h1
              className="text-center text-4xl font-bold leading-tight text-accent-2 md:text-7xl"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              Empower Your Online Presence with <span className="text-accent-4">Onlyself</span>.
            </h1>
          </div>
          <div
            className="flex w-full flex-row items-center justify-center gap-x-3"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <button
              type="button"
              className="w-auto rounded-xl bg-accent-1 px-3 py-3 text-center text-sm text-white hover:bg-opacity-50 md:w-[10rem] md:px-5"
              onClick={() => setIsOpenDiscoverModal(true)}
            >
              Discover
            </button>
            <Link
              href={user ? '/pricing' : '/signin'}
              className="w-auto rounded-xl bg-accent-2 px-3 py-3 text-center text-sm text-accent-3 hover:bg-opacity-50 md:w-[10rem] md:px-5"
            >
              {user ? 'Subscription' : 'Sign In'}
            </Link>
          </div>
        </div>
      </MainLayout>
      <DiscoverModal />
    </>
  );
};

export default Home;
