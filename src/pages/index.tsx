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
        <div className="flex h-full w-full max-w-[1200px] flex-col items-center justify-between gap-y-5 bg-white p-5 md:h-screen md:gap-y-0">
          <div className="flex w-full flex-row items-center justify-between">
            <Link
              href="/"
              className="flex flex-row items-center font-poppins text-2xl font-light tracking-wide"
            >
              <span className="text-accent-1">Only</span>
              <span className="text-accent-2">self</span>
            </Link>
            <div className="flex flex-row items-center space-x-10">
              <Link
                href="/"
                className="hover:text-accent-1 text-sm text-neutral-700 hover:underline"
              >
                Home
              </Link>
              <Link
                href="/"
                className="hover:text-accent-1 text-sm text-neutral-700 hover:underline"
              >
                Pricing
              </Link>
              <div className="bg-accent-2 h-[2.5rem] w-[2.5rem] rounded-xl" />
            </div>
          </div>
          <div className="flex h-screen w-full max-w-3xl flex-col items-center justify-center gap-y-8 md:h-full">
            <div className="flex w-full flex-col items-center gap-y-3">
              <h1 className="text-accent-1 text-center text-2xl font-light leading-tight">
                Discover, Connect, and Share.
              </h1>
              <h1 className="text-accent-2 text-center text-5xl font-bold leading-tight">
                Empower Your Online Presence with Onlyself.
              </h1>
            </div>
            <div className="flex w-full flex-row items-center justify-center gap-x-3">
              <Link
                href="/"
                className="bg-accent-1 w-[10rem] rounded-xl px-5 py-3 text-center text-sm text-white hover:bg-opacity-50"
              >
                Discover
              </Link>
              <Link
                href="/"
                className="bg-accent-2 w-[10rem] rounded-xl px-5 py-3 text-center text-sm text-green-700 hover:bg-opacity-50"
              >
                Sign in
              </Link>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-y-3 md:flex-row md:justify-between md:gap-y-0">
            <div className="flex w-full flex-row items-center justify-center gap-x-5 md:justify-start">
              <Link href="/" className="text-accent-1 text-sm font-light hover:underline">
                About
              </Link>
              <Link href="/" className="text-accent-1 text-sm font-light hover:underline">
                Terms of Service
              </Link>
              <Link href="/" className="text-accent-1 text-sm font-light hover:underline">
                Privacy
              </Link>
            </div>
            <div className="flex w-full flex-row items-center justify-center gap-x-5 md:justify-end">
              <p className="text-xs font-light">&copy;Onlyself 2023, All rights reserved.</p>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
