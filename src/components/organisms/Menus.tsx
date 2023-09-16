import Link from 'next/link';
import Logo from '../atoms/Logo';
import clsx from 'clsx';

interface MenuProps {
  isOpenMenu: boolean;
  setIsOpenMenu: (value: boolean) => void;
}

const Menu = ({ isOpenMenu, setIsOpenMenu }: MenuProps): JSX.Element => {
  return (
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
          <Link href="/" className="text-sm text-neutral-700 hover:text-accent-1 hover:underline">
            Home
          </Link>
          <Link href="/" className="text-sm text-neutral-700 hover:text-accent-1 hover:underline">
            Pricing
          </Link>
          <div className="h-[2.5rem] w-[2.5rem] rounded-full bg-accent-2" />
        </div>
      </div>
    </div>
  );
};

const MenuMobile = ({ isOpenMenu, setIsOpenMenu }: MenuProps): JSX.Element => {
  return (
    <div
      className={clsx(
        isOpenMenu ? 'scale-y-100' : 'scale-y-0',
        `absolute top-16 z-10 flex w-full origin-top transform flex-col items-center border-b border-neutral-200 bg-neutral-100 duration-300 md:hidden`,
      )}
    >
      <Link
        href="/"
        className="w-full px-5 py-3 text-left text-sm text-neutral-700 hover:text-accent-1"
      >
        Home
      </Link>
      <Link
        href="/"
        className="w-full px-5 py-3 text-left text-sm text-neutral-700 hover:text-accent-1"
      >
        Pricing
      </Link>
      <div className="flex w-full flex-row items-center justify-between gap-x-3 border-t border-neutral-200 px-5 py-3">
        <Link href="/" className="flex flex-row items-center justify-start gap-x-3">
          <div className="h-[2.5rem] w-[2.5rem] rounded-full bg-accent-2" />
          <span className="text-sm font-light text-neutral-700">Profile Name</span>
        </Link>
        <button className="text-xs text-red-500 outline-none hover:underline" type="button">
          Sign out
        </button>
      </div>
    </div>
  );
};

export { Menu, MenuMobile };
