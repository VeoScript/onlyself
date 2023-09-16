import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '~/components/templates/MainLayout';

const Home = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Onlyself</title>
      </Head>
      <MainLayout>
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-8 py-20 md:-mt-20 md:h-screen md:py-0">
          <div className="flex w-full max-w-full flex-col items-center gap-y-3 md:max-w-3xl">
            <h1
              className="text-accent-1 text-center text-base font-light leading-tight md:text-xl"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              Discover, Connect, and Share.
            </h1>
            <h1
              className="text-accent-2 text-center text-4xl font-bold leading-tight md:text-5xl"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              Empower Your Online Presence with <span className="text-accent-1">Onlyself</span>.
            </h1>
          </div>
          <div
            className="flex w-full flex-row items-center justify-center gap-x-3"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <Link
              href="/"
              className="bg-accent-1 w-[6rem] rounded-xl px-3 py-3 text-center text-sm text-white hover:bg-opacity-50 md:w-[10rem] md:px-5"
            >
              Discover
            </Link>
            <Link
              href="/signin"
              className="bg-accent-2 w-[6rem] rounded-xl px-3 py-3 text-center text-sm text-green-700 hover:bg-opacity-50 md:w-[10rem] md:px-5"
            >
              Sign in
            </Link>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
