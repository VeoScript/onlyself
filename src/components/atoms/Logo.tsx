import React from 'react';
import Link from 'next/link';

import { discoverModalStore, messageModalStore, filesModalStore, settingsModalStore } from '~/helpers/stores/modals';

const LogoDefault = () => {
  return (
    <Link href="/" className="flex flex-row items-center font-poppins text-2xl font-bold">
      <span className="text-accent-4">Only</span>
      <span className="text-accent-4">self</span>
    </Link>
  );
};

const LogoProfile = () => {
  const { setIsOpen: setIsOpenDiscoverModal } = discoverModalStore();
  const { setIsOpen: setIsOpenMessagesModal } = messageModalStore();
  const { setIsOpen: setIsOpenFilesModal } = filesModalStore();
  const { setIsOpen: setIsOpenSettingsModal } = settingsModalStore();

  return (
    <Link
      href="/"
      className="flex flex-row items-center font-poppins text-sm font-bold md:text-2xl"
      onClick={() => {
        setIsOpenDiscoverModal(false);
        setIsOpenMessagesModal(false);
        setIsOpenFilesModal(false);
        setIsOpenSettingsModal(false);
      }}
    >
      <span className="text-white">Only</span>
      <span className="text-white">self</span>
    </Link>
  );
};

export { LogoDefault, LogoProfile };
