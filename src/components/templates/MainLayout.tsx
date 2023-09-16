import { useState } from 'react';
import Link from 'next/link';
import { Menu, MenuMobile } from '../organisms/Menus';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  return (
    <div className="flex h-full min-h-screen w-full cursor-default flex-col items-center px-5 font-poppins bg-accent-3 selection:bg-green-200">
      <MenuMobile isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />
      <div className="relative h-full w-full max-w-[1200px] flex-grow flex-col items-center justify-between md:gap-y-0">
        <Menu isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />
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
            <p className="text-[10px] font-light md:text-[11px] text-neutral-400">
              &copy; 2023 Onlyself.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
