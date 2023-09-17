import Head from 'next/head';
import Image from 'next/image';
import { LogoProfile } from '~/components/atoms/Logo';
import BottomBar from '~/components/organisms/BottomBar';
import MessageInputText from '~/components/molecules/MessageInputText';
import SocialMediaHolder from '~/components/molecules/SocialMediaHolder';
import DiscoverModal from '~/components/molecules/Modals/DiscoverModal';
import MessagesModal from '~/components/molecules/Modals/MessagesModal';
import FilesModal from '~/components/molecules/Modals/FilesModal';
import SettingsModal from '~/components/molecules/Modals/SettingsModal';

import { useRouter } from 'next/router';
import {
  discoverModalStore,
  messageModalStore,
  filesModalStore,
  settingsModalStore,
} from '~/helpers/stores/modals';

const Profile = (): JSX.Element => {
  const router = useRouter();

  const { isOpen: isOpenDiscoverModal, setIsOpen: setIsOpenDiscoverModal } = discoverModalStore();
  const { isOpen: isOpenMessagesModal, setIsOpen: setIsOpenMessagesModal } = messageModalStore();
  const { isOpen: isOpenFilesModal, setIsOpen: setIsOpenFilesModal } = filesModalStore();
  const { isOpen: isOpenSettingsModal, setIsOpen: setIsOpenSettingsModal } = settingsModalStore();

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
              className="rounded-full bg-white bg-opacity-20 p-2 outline-none backdrop-blur-sm hover:opacity-50"
              type="button"
              onClick={() => {
                if (isOpenDiscoverModal) return setIsOpenDiscoverModal(false);
                if (isOpenMessagesModal) return setIsOpenMessagesModal(false);
                if (isOpenFilesModal) return setIsOpenFilesModal(false);
                if (isOpenSettingsModal) return setIsOpenSettingsModal(false);

                router.back();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 text-white md:h-5 md:w-5"
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
            src="https://pbs.twimg.com/media/F2gwtNLWQAAwJ-O?format=jpg&name=medium"
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
              alt="profile_image"
              width={1000}
              height={1000}
              quality={100}
              data-aos="fade-down"
              data-aos-delay="400"
            />
            <div className="flex w-full max-w-xl flex-col items-center gap-y-5 px-3">
              <div
                className="flex w-full max-w-xl flex-col items-center gap-y-2"
                data-aos="fade-down"
                data-aos-delay="200"
              >
                <h1 className="text-xl font-bold text-white">Jerome Villaruel</h1>
                <h1 className="text-base font-medium text-white">@jeromevillaruel</h1>
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
      <DiscoverModal />
      <MessagesModal />
      <FilesModal />
      <SettingsModal />
    </>
  );
};

export default Profile;
