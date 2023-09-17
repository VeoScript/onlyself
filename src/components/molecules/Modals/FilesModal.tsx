import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

import { filesModalStore } from '~/helpers/stores/modals';

import { filesList } from '~/shared/mocks/files';

const FilesModal = () => {
  const { isOpen } = filesModalStore();

  const [search, setSearch] = useState<string>('');

  return (
    <div
      className={clsx(
        isOpen ? 'scale-y-100' : 'scale-y-0',
        'fixed inset-0 z-10 flex h-full w-full origin-bottom transform flex-col items-center justify-center bg-black bg-opacity-50 px-3 pb-3 pt-[4rem] backdrop-blur-xl transition duration-300 md:pt-3',
      )}
    >
      <div className="absolute h-full w-full flex-1 cursor-default bg-transparent outline-none" />
      <div className="z-20 flex h-full w-full max-w-xl flex-col items-center overflow-hidden rounded-xl bg-white bg-opacity-20 font-poppins text-white backdrop-blur-sm">
        <div className="flex w-full flex-col items-start justify-center gap-y-2 p-3">
          <label className="ml-3 text-base font-bold" htmlFor="search">
            Files & Images
          </label>
          <div className="flex w-full flex-row items-center gap-x-2 rounded-full bg-black bg-opacity-60 px-3 py-2 text-sm text-white backdrop-blur-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              className="w-full bg-transparent outline-none"
              autoComplete="off"
              type="text"
              id="search"
              placeholder="Search files by name"
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className="custom-scrollbar flex w-full flex-col items-start gap-y-1 px-3">
          {filesList.map(
            (
              message: { isAnonymous: boolean; avatar: string; sender: string; fileName: string },
              i: number,
            ) => (
              <div
                key={i}
                className="flex w-full flex-row items-center justify-between gap-x-2 rounded-xl bg-black bg-opacity-50 px-3 py-2 backdrop-blur-sm transition duration-100 hover:bg-opacity-10"
              >
                <div className="flex w-full flex-row items-center gap-x-2">
                  <div className="flex h-[3rem] w-[3rem] flex-row items-center justify-center rounded-full bg-black object-cover">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-white"
                    >
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <div className="flex max-w-sm flex-1 flex-col gap-y-1">
                    <h1 className="text-sm font-bold text-white">{message.fileName}</h1>
                    <h2 className="text-xs font-light text-neutral-300">{message.sender}</h2>
                  </div>
                </div>
                <Link
                  data-tooltip-id="onlyself-tooltip"
                  data-tooltip-content="Download"
                  href="/download-file"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="h-6 w-6 text-white hover:text-blue-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                </Link>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default FilesModal;
