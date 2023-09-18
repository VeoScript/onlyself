import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const NotFound = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Onlyself | Not Found</title>
      </Head>
      <div className="flex h-full w-full flex-col items-center justify-center gap-y-8 bg-accent-3 py-20 md:h-screen md:py-0">
        <div className="flex w-full max-w-full flex-col items-center gap-y-3 md:max-w-5xl">
          <h1 className="flex flex-row items-center font-poppins text-3xl font-bold text-white">
            Onlyself
          </h1>
          <h1
            className="text-center text-4xl font-bold leading-tight text-accent-2 md:text-7xl"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            User not found.
          </h1>
        </div>
        <div
          className="flex w-full flex-row items-center justify-center gap-x-3"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <Link
            href="/"
            className="w-[6rem] rounded-xl bg-accent-1 px-3 py-3 text-center text-sm text-white hover:bg-opacity-50 md:w-[10rem] md:px-5"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
