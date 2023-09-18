import { useState } from 'react';
import Link from 'next/link';
import { Menu, MenuMobile } from '../organisms/Menus';

import { UserProps } from '~/shared/interfaces';

interface MainLayoutProps {
  user: UserProps;
  isLoading: boolean;
  children: React.ReactNode;
}

const MainLayout = ({ user, isLoading, children }: MainLayoutProps): JSX.Element => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  return (
    <div className="flex h-full min-h-screen w-full cursor-default flex-col items-center bg-accent-3 px-5 font-poppins selection:bg-green-200">
      <MenuMobile
        user={user}
        isLoading={isLoading}
        isOpenMenu={isOpenMenu}
        setIsOpenMenu={setIsOpenMenu}
      />
      <div className="relative h-full w-full max-w-[1200px] flex-grow flex-col items-center justify-between md:gap-y-0">
        <Menu
          user={user}
          isLoading={isLoading}
          isOpenMenu={isOpenMenu}
          setIsOpenMenu={setIsOpenMenu}
        />
        {children}
        <div className="absolute bottom-0 flex w-full flex-col items-center justify-center gap-y-3 pb-5 md:flex-row md:justify-between md:gap-y-0">
          <div className="flex w-full flex-row items-center justify-center gap-x-5 md:justify-start">
            <Link href="/" className="text-xs font-light text-accent-1 hover:underline md:text-sm">
              About
            </Link>
            <Link href="/" className="text-xs font-light text-accent-1 hover:underline md:text-sm">
              Terms of Service
            </Link>
            <Link href="/" className="text-xs font-light text-accent-1 hover:underline md:text-sm">
              Privacy
            </Link>
          </div>
          <div className="flex w-full flex-row items-center justify-center gap-x-5 md:justify-end">
            <p className="text-[10px] font-light text-neutral-400 md:text-[11px]">
              &copy; 2023 Onlyself.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
