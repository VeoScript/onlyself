import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import BottomBar from '~/components/organisms/BottomBar';
import { LogoProfile } from '~/components/atoms/Logo';

import { useRouter } from 'next/router';
import MessageInputText from '~/components/molecules/MessageInputText';
import SocialMediaHolder from '~/components/molecules/SocialMediaHolder';

const Profile = (): JSX.Element => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Onlyself | Client Name</title>
      </Head>
      <div className="flex h-full w-full flex-row items-start overflow-hidden bg-white font-poppins selection:bg-blue-300">
        <div className="relative flex h-screen w-full max-w-full flex-col overflow-hidden">
          <div className="absolute top-5 z-20 flex w-full flex-row items-center justify-between px-3 md:px-10">
            <LogoProfile />
            <button
              data-tooltip-id="onlyself-tooltip"
              data-tooltip-content="Back"
              className="rounded-full bg-white bg-opacity-50 p-2 outline-none backdrop-blur-sm hover:opacity-50"
              type="button"
              onClick={() => router.back()}
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
          <div className="absolute inset-0 h-full w-full bg-black bg-opacity-10 backdrop-blur-sm" />
          <Image
            priority
            src="/images/cover_sample.png"
            className="h-full w-full bg-neutral-800 object-cover"
            alt="cover_image"
            width={1000}
            height={1000}
            quality={100}
          />
          <div className="absolute flex h-full w-full flex-col items-center justify-start gap-y-3 overflow-y-auto pb-24">
            <Image
              priority
              src="/images/profile_sample.jpg"
              className="h-[7rem] w-[7rem] rounded-b-3xl bg-black object-cover md:h-[13rem] md:w-[15rem]"
              alt="cover_image"
              width={1000}
              height={1000}
              quality={100}
            />
            <div className="flex w-full max-w-xl flex-col items-center gap-y-5 px-3">
              <div className="flex w-full max-w-xl flex-col items-center gap-y-2">
                <h1 className="text-xl font-bold text-white">@jeromevillaruel</h1>
                <SocialMediaHolder />
                <h2 className="text-center text-sm font-light text-white">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga dolore unde ducimus
                  veniam? Saepe facere natus, nemo explicabo facilis pariatur dolores, rem
                  praesentium a, vitae totam reiciendis atque quia libero!
                </h2>
              </div>
              <MessageInputText />
            </div>
          </div>
          <BottomBar />
        </div>
      </div>
    </>
  );
};

export default Profile;
