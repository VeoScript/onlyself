import { useState } from 'react';
import Link from 'next/link';
import Logo from '../atoms/Logo';
import clsx from 'clsx';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  return (
    <div className="flex h-full min-h-screen w-full cursor-default flex-col items-center px-5 font-poppins selection:bg-green-200">
      <div
        className={clsx(
          isOpenMenu ? 'scale-y-100' : 'scale-y-0',
          `absolute top-16 z-10 flex w-full origin-top transform flex-col items-center border-b border-neutral-200 bg-neutral-100 duration-300 md:hidden`,
        )}
      >
        <Link
          href="/"
          className="hover:text-accent-1 w-full px-5 py-3 text-left text-sm text-neutral-700"
        >
          Home
        </Link>
        <Link
          href="/"
          className="hover:text-accent-1 w-full px-5 py-3 text-left text-sm text-neutral-700"
        >
          Pricing
        </Link>
        <div className="flex w-full flex-row items-center justify-between gap-x-3 border-t border-neutral-200 px-5 py-3">
          <Link href="/" className="flex flex-row items-center justify-start gap-x-3">
            <div className="bg-accent-2 h-[2.5rem] w-[2.5rem] rounded-full" />
            <span className="text-sm font-light text-neutral-700">Profile Name</span>
          </Link>
          <button className="text-xs text-red-500 outline-none hover:underline" type="button">
            Sign out
          </button>
        </div>
      </div>
      <div className="relative h-full w-full max-w-[1200px] flex-grow flex-col items-center justify-between bg-white md:gap-y-0">
        <div className="relative flex w-full flex-row items-center justify-between pt-5">
          <Logo />
          <div className="flex w-full flex-row justify-end">
            <button
              type="button"
              className="block outline-none transition-all md:hidden"
              onClick={() => setIsOpenMenu(!isOpenMenu)}
            >
              {isOpenMenu ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
                  className="h-6 w-6"
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
              <div className="bg-accent-2 h-[2.5rem] w-[2.5rem] rounded-full" />
            </div>
          </div>
        </div>
        {children}
        <div className="absolute bottom-0 flex w-full flex-col items-center justify-center gap-y-3 pb-5 md:flex-row md:justify-between md:gap-y-0">
          <div className="flex w-full flex-row items-center justify-center gap-x-5 md:justify-start">
            <Link href="/" className="text-accent-1 text-xs font-light hover:underline md:text-sm">
              About
            </Link>
            <Link href="/" className="text-accent-1 text-xs font-light hover:underline md:text-sm">
              Terms of Service
            </Link>
            <Link href="/" className="text-accent-1 text-xs font-light hover:underline md:text-sm">
              Privacy
            </Link>
          </div>
          <div className="flex w-full flex-row items-center justify-center gap-x-5 md:justify-end">
            <p className="text-[10px] font-light md:text-xs">
              &copy; 2023 Onlyself. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
