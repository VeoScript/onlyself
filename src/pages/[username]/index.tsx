import Head from 'next/head';
import LegacyImage from 'next/legacy/image';
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
import { uploadProfileStore, uploadCoverStore } from '~/helpers/stores/upload';
import { useGetUser } from '~/helpers/tanstack/queries/user';
import { useGetProfile } from '~/helpers/tanstack/queries/profile';

const Profile = (): JSX.Element => {
  const router = useRouter();

  const { username } = router.query;

  const { isOpen: isOpenDiscoverModal, setIsOpen: setIsOpenDiscoverModal } = discoverModalStore();
  const { isOpen: isOpenMessagesModal, setIsOpen: setIsOpenMessagesModal } = messageModalStore();
  const { isOpen: isOpenFilesModal, setIsOpen: setIsOpenFilesModal } = filesModalStore();
  const { isOpen: isOpenSettingsModal, setIsOpen: setIsOpenSettingsModal } = settingsModalStore();

  const { setDefault: setDefaultUploadProfile } = uploadProfileStore();
  const { setDefault: setDefaultUploadCover } = uploadCoverStore();

  const { data: user } = useGetUser();

  const { data: profile, isLoading: isLoadingProfile } = useGetProfile(username as string);

  if (isLoadingProfile) return <Loading />;

  if (!isLoadingProfile && profile === undefined) {
    router.push('/404');
  }

  return (
    <>
      {profile && (
        <>
          <Head>
            <title>Onlyself | @{profile.username}</title>
          </Head>
          <div className="flex h-full w-full flex-row items-start overflow-hidden bg-white font-poppins selection:bg-blue-300">
            <div className="relative flex h-screen w-full max-w-full flex-col overflow-hidden">
              <div className="relative flex w-full flex-row items-center justify-between">
                <div className="absolute left-3 top-5 z-50 md:left-10">
                  <LogoProfile />
                </div>
                <button
                  data-tooltip-id="onlyself-tooltip"
                  data-tooltip-content="Back"
                  className="absolute right-3 top-5 z-50 rounded-full bg-white bg-opacity-20 p-2 outline-none backdrop-blur-sm hover:opacity-50 md:right-10"
                  type="button"
                  onClick={() => {
                    setDefaultUploadProfile();
                    setDefaultUploadCover();

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
              <div className="absolute inset-0 z-10 h-full w-full bg-black bg-opacity-30 backdrop-blur-sm" />
              {profile.cover_photo ? (
                <LegacyImage
                  priority
                  layout="fill"
                  src={profile.cover_photo}
                  blurDataURL={profile.cover_photo}
                  className="h-full w-full bg-accent-1 object-cover"
                  alt="cover_image"
                  placeholder="blur"
                  quality={80}
                />
              ) : (
                <div className="h-full w-full bg-accent-1 object-cover" />
              )}
              <div className="absolute z-20 flex h-full w-full flex-col items-center justify-start gap-y-3 overflow-y-auto pb-24">
                {profile.profile_photo ? (
                  <div className="relative flex min-h-[7rem] min-w-[7rem] overflow-hidden rounded-b-3xl md:min-h-[13rem] md:min-w-[15rem]">
                    <LegacyImage
                      priority
                      layout="fill"
                      objectFit="cover"
                      src={profile.profile_photo}
                      blurDataURL={profile.profile_photo}
                      className="h-full w-full  bg-black object-cover"
                      alt="cover_image"
                      placeholder="blur"
                      quality={100}
                    />
                  </div>
                ) : (
                  <div className="flex h-[7rem] w-[7rem] flex-row items-center justify-center rounded-b-3xl bg-black object-cover md:h-[13rem] md:w-[15rem]">
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
                    {profile.short_bio ? (
                      <h2 className="text-center text-sm font-light text-white">
                        {profile.short_bio}
                      </h2>
                    ) : (
                      <>
                        {user?.id === profile.id && (
                          <q className="text-center text-sm font-medium italic text-white">
                            Go to settings <span className="not-italic">⚙️</span> add your short
                            bio.
                          </q>
                        )}
                      </>
                    )}
                    {profile.favorite_quote ? (
                      <q className="mt-5 text-center text-base font-medium italic text-white">
                        {profile.favorite_quote}
                      </q>
                    ) : (
                      <>
                        {user?.id === profile.id && (
                          <q className="mt-5 text-center text-sm font-medium italic text-white">
                            Go to settings <span className="not-italic">⚙️</span> add your favorite
                            quote.
                          </q>
                        )}
                      </>
                    )}
                  </div>
                  {user?.id !== profile.id && (
                    <MessageInputText
                      isAuth={user ? true : false}
                      receiveFilesAnonymous={profile.is_receive_files_anonymous}
                      receiveImageAnonymous={profile.is_receive_images_anonymous}
                      senderProfile={user?.profile_photo ?? ''}
                      userUsername={user?.username ?? ''}
                      profileId={profile.id}
                    />
                  )}
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
