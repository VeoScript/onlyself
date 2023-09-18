import Head from 'next/head';
import Image from 'next/image';
import { LogoProfile } from '~/components/atoms/Logo';
import Loading from '~/components/molecules/Loading';
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
import { useGetProfile } from '~/helpers/tanstack/queries/profile';

const Profile = (): JSX.Element => {
  const router = useRouter();

  const { username } = router.query;

  const { isOpen: isOpenDiscoverModal, setIsOpen: setIsOpenDiscoverModal } = discoverModalStore();
  const { isOpen: isOpenMessagesModal, setIsOpen: setIsOpenMessagesModal } = messageModalStore();
  const { isOpen: isOpenFilesModal, setIsOpen: setIsOpenFilesModal } = filesModalStore();
  const { isOpen: isOpenSettingsModal, setIsOpen: setIsOpenSettingsModal } = settingsModalStore();

  const {
    data: profile,
    isLoading: isLoadingProfile,
    error: errorProfile,
  } = useGetProfile(username as string);

  if (isLoadingProfile) return <Loading />;

  if (!isLoadingProfile && errorProfile) {
    router.push('/404');
  }

  console.log('profile', profile);

  return (
    <>
      {profile && (
        <>
          <Head>
            <title>Onlyself | @{profile.username}</title>
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
              {profile.cover_photo ? (
                <Image
                  priority
                  src={profile.cover_photo}
                  className="h-full w-full bg-accent-3 object-cover"
                  alt="cover_image"
                  width={1000}
                  height={1000}
                  quality={100}
                />
              ) : (
                <div className="h-full w-full bg-accent-3 object-cover" />
              )}
              <div className="absolute flex h-full w-full flex-col items-center justify-start gap-y-3 overflow-y-auto pb-24">
                {profile.profile_photo ? (
                  <Image
                    priority
                    src={profile.profile_photo}
                    className="h-[7rem] w-[7rem] rounded-b-3xl bg-black object-cover md:h-[13rem] md:w-[15rem]"
                    alt="profile_image"
                    width={1000}
                    height={1000}
                    quality={100}
                    data-aos="fade-down"
                    data-aos-delay="400"
                  />
                ) : (
                  <div className="flex h-[7rem] w-[7rem] flex-row items-center justify-center rounded-b-3xl bg-black object-cover md:h-[13rem] md:w-[15rem]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="h-[5rem] w-[5rem] text-white"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                )}
                <div className="flex w-full max-w-xl flex-col items-center gap-y-5 px-3">
                  <div
                    className="flex w-full max-w-xl flex-col items-center gap-y-2"
                    data-aos="fade-down"
                    data-aos-delay="200"
                  >
                    <h1 className="text-xl font-bold text-white">
                      {profile.is_display_name ? profile.name : `@${profile.username}`}
                    </h1>
                    {profile.is_display_name && (
                      <h1 className="text-base font-medium text-white">@{profile.username}</h1>
                    )}
                    {(profile.facebook_link ||
                      profile.instagram_link ||
                      profile.twitterx_link ||
                      profile.linkedin_link ||
                      profile.github_link ||
                      profile.website_link) && (
                      <SocialMediaHolder
                        facebook_link={profile.facebook_link}
                        instagram_link={profile.instagram_link}
                        twitterx_link={profile.twitterx_link}
                        linkedin_link={profile.linkedin_link}
                        github_link={profile.github_link}
                        website_link={profile.website_link}
                      />
                    )}
                    {profile.short_bio && (
                      <h2 className="text-center text-sm font-light text-white">
                        {profile.short_bio}
                      </h2>
                    )}
                  </div>
                  <MessageInputText
                    receiveFilesAnonymous={profile.is_receive_files_anonymous}
                    receoveImageAnonymous={profile.is_receive_images_anonymous}
                  />
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
      )}
    </>
  );
};

export default Profile;