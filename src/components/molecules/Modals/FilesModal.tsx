import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import ActivityIndicator from '~/components/atoms/ActivityIndicator';

import { useInView } from 'react-intersection-observer';
import { filesModalStore } from '~/helpers/stores/modals';

import { FilesImagesProps } from '~/shared/interfaces';
import { useGetFilesImages } from '~/helpers/tanstack/queries/files-images';

const FilesModal = (): JSX.Element => {
  const { ref, inView } = useInView();

  const { isOpen, setIsOpen } = filesModalStore();

  const [search, setSearch] = useState<string>('');

  const {
    data: filesImages,
    isLoading: isLoadingFilesImages,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetFilesImages(search);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  return (
    <div
      className={clsx(
        isOpen ? 'scale-y-100' : 'scale-y-0',
        'fixed inset-0 z-40 flex h-full w-full origin-bottom transform flex-col items-center justify-center bg-black bg-opacity-50 px-3 pb-3 pt-[4rem] backdrop-blur-xl transition duration-300 md:pt-3',
      )}
    >
      <div className="absolute h-full w-full flex-1 cursor-default bg-transparent outline-none" />
      <div className="z-20 flex h-full w-full max-w-xl flex-col items-center overflow-hidden rounded-xl bg-white bg-opacity-20 font-poppins text-white backdrop-blur-sm">
        <div className="flex w-full flex-col items-start justify-center gap-y-2 p-3">
          <label className="ml-3 text-base font-bold" htmlFor="search_files">
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
              id="search_files"
              placeholder="Search files by name"
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className="custom-scrollbar flex w-full flex-col items-start gap-y-1 px-3">
          {isLoadingFilesImages ? (
            <div className="my-3 flex w-full flex-col items-center">
              <ActivityIndicator className="h-8 w-8" />
            </div>
          ) : (
            <>
              {filesImages && filesImages.pages[0].filesImages.length == 0 && (
                <div className="my-3 flex w-full flex-col items-center">
                  <p className="text-xs font-light text-white">No result found.</p>
                </div>
              )}
              {filesImages &&
                filesImages.pages.map((page: { filesImages: any }, i: number) => (
                  <Fragment key={i}>
                    {page.filesImages.map((filesImage: FilesImagesProps) => (
                      <div
                        key={filesImage.id}
                        className="flex w-full flex-row items-center justify-between gap-x-2 rounded-xl bg-black bg-opacity-50 px-3 py-2 backdrop-blur-sm transition duration-100 hover:bg-opacity-10"
                      >
                        <div className="flex w-full flex-row items-center gap-x-2">
                          <div className="flex h-[3rem] w-[3rem] flex-row items-center justify-center rounded-full bg-black object-cover">
                            {filesImage.type === 'FILE' && (
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
                            )}
                            {filesImage.type === 'IMAGE' && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-6 w-6 text-white"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                />
                              </svg>
                            )}
                          </div>
                          <div className="flex max-w-sm flex-1 flex-col gap-y-1">
                            <h1 className="text-sm font-bold text-white">{filesImage.name}</h1>
                            <Link
                              href={filesImage.sender.username}
                              className="text-xs font-light text-neutral-300 hover:underline"
                              onClick={() => setIsOpen(false)}
                            >
                              @{filesImage.sender.username}
                            </Link>
                          </div>
                        </div>
                        <Link
                          data-tooltip-id="onlyself-tooltip"
                          data-tooltip-content="Download"
                          href={filesImage.url}
                          target="_blank"
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
                    ))}
                  </Fragment>
                ))}
              <button
                ref={ref}
                className="flex w-full flex-col items-center justify-center space-y-2 text-white"
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage ? (
                  <ActivityIndicator className="h-8 w-8" />
                ) : hasNextPage ? (
                  ''
                ) : (
                  ''
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilesModal;
