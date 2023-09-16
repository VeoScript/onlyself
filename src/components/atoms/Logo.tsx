import React from 'react';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex flex-row items-center font-poppins text-2xl font-bold"
    >
      <span className="text-accent-1">Only</span>
      <span className="text-accent-2">self</span>
    </Link>
  );
};

export default Logo;
