import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '~/components/templates/MainLayout';
import DiscoverModal from '~/components/molecules/Modals/DiscoverModal';

import { discoverModalStore } from '~/helpers/stores/modals';
import { useGetUser } from '~/helpers/tanstack/queries/user';

const Pricing = (): JSX.Element => {
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
            <div
              className="flex w-full flex-col items-center"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <span className="border-accent-4 text-[8rem]">⚠️</span>
              <h1 className="text-center text-xl font-bold leading-tight text-accent-2 md:text-5xl">
                Pricing is under-construction, you can use this app by free.
              </h1>
            </div>
          </div>
          <div
            className="flex w-full flex-row items-center justify-center gap-x-3"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <Link
              href="/"
              className="w-auto rounded-xl bg-accent-1 px-3 py-3 text-center text-sm text-white hover:bg-opacity-50 md:px-5"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </MainLayout>
      <DiscoverModal />
    </>
  );
};

export default Pricing;
