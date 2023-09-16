import React from 'react';
import Link from 'next/link';

const LogoDefault = () => {
  return (
    <Link href="/" className="flex flex-row items-center font-poppins text-2xl font-bold">
      <span className="text-accent-1">Only</span>
      <span className="text-accent-4">self</span>
    </Link>
  );
};

const LogoProfile = () => {
  return (
    <Link
      href="/"
      className="flex flex-row items-center font-poppins text-sm font-bold md:text-2xl"
    >
      <span className="text-white">Only</span>
      <span className="text-white">self</span>
    </Link>
  );
};

export { LogoDefault, LogoProfile };
