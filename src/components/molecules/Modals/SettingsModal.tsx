import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import ActivityIndicator from '~/components/atoms/ActivityIndicator';

import { Switch } from '@headlessui/react';
import { toast } from 'react-hot-toast';
import { settingsModalStore } from '~/helpers/stores/modals';
import { useGetUser } from '~/helpers/tanstack/queries/user';
import { useUpdateProfileMutation } from '~/helpers/tanstack/mutations/account/update-profile';

const SettingsModal = (): JSX.Element => {
  const { data: user, isLoading: isLoadingUser } = useGetUser();

  const updateProfileMutation = useUpdateProfileMutation();

  const { isOpen } = settingsModalStore();

  const [isPending, setIsPending] = useState<boolean>(false);

  // profile settings states...
  const [coverPhoto, setCoverPhoto] = useState<string | null>('');
  const [profilePhoto, setProfilePhoto] = useState<string | null>('');
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  // privacy options states...
  const [displayName, setDisplayName] = useState<boolean>(false);
  const [receiveFilesAnonymous, setReceiveFilesAnonymous] = useState<boolean>(false);
  const [receiveImagesAnonymous, setReceiveImagesAnonymous] = useState<boolean>(false);

  // social links states...
  const [facebookLink, setFacebookLink] = useState<string>('');
  const [instagramLink, setInstagramLink] = useState<string>('');
  const [twitterxLink, setTwitterxLink] = useState<string>('');
  const [linkedinLink, setLinkedinLink] = useState<string>('');
  const [githubLink, setGithubLink] = useState<string>('');
  const [websiteLink, setWebsiteLink] = useState<string>('');

  // change password states...
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [repassword, setRepassword] = useState<string>('');

  useEffect(() => {
    if (user) {
      setCoverPhoto(user.cover_photo ?? null);
      setProfilePhoto(user.profile_photo ?? null);
      setName(user.name ?? '');
      setUsername(user.username ?? '');
      setEmail(user.email ?? '');

      setDisplayName(user.is_display_name);
      setReceiveFilesAnonymous(user.is_receive_files_anonymous);
      setReceiveImagesAnonymous(user.is_receive_images_anonymous);

      setFacebookLink(user.facebook_link ?? '');
      setInstagramLink(user.instagram_link ?? '');
      setTwitterxLink(user.twitterx_link ?? '');
      setLinkedinLink(user.linkedin_link ?? '');
      setGithubLink(user.github_link ?? '');
      setWebsiteLink(user.website_link ?? '');
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    setIsPending(true);
    await updateProfileMutation.mutateAsync(
      {
        profile_photo: profilePhoto as string,
        cover_photo: coverPhoto as string,
        name,
        username,
        email,
      },
      {
        onError: (error) => {
          setIsPending(false);
          toast.error(error.response.data.message);
        },
        onSuccess: () => {
          setIsPending(false);
          toast.success('Updated successfully.');
        },
      },
    );
  };

  return (
    <div
      className={clsx(
        isOpen ? 'scale-y-100' : 'scale-y-0',
        'fixed inset-0 z-10 flex h-full w-full origin-bottom transform flex-col items-center justify-center bg-black bg-opacity-50 px-3 pb-3 pt-[4rem] backdrop-blur-xl transition duration-300 md:pt-3',
      )}
    >
      <div className="absolute h-full w-full flex-1 cursor-default bg-transparent outline-none" />
      <div className="z-20 flex h-full w-full max-w-xl overflow-hidden rounded-xl bg-white bg-opacity-20 font-poppins text-white backdrop-blur-sm">
        <div className="custom-scrollbar flex w-full flex-col items-center overflow-y-auto">
          <div className="flex w-full flex-col items-start justify-center gap-y-2 p-3">
            <h1 className="text-base font-bold">Settings</h1>
          </div>
          {isLoadingUser ? (
            <div className="flex h-full w-full flex-col items-center gap-y-2">
              <ActivityIndicator className="h-10 w-10" />
              <h1 className="text-sm font-light text-white">Loading...</h1>
            </div>
          ) : (
            <>
              <div className="flex w-full flex-col items-start gap-y-3 px-3 pb-3">
                <div
                  style={{
                    backgroundImage: `url(${coverPhoto})`,
                  }}
                  className="relative flex w-full flex-col items-center overflow-hidden rounded-xl bg-neutral-800 bg-center bg-no-repeat p-2"
                >
                  <div className="relative flex">
                    {profilePhoto ? (
                      <Image
                        priority
                        src={profilePhoto as string}
                        className="h-[10rem] w-[10rem] rounded-full bg-black object-cover"
                        alt="profile_image"
                        width={1000}
                        height={1000}
                        quality={100}
                      />
                    ) : (
                      <div className="flex h-[10rem] w-[10rem] flex-row items-center justify-center rounded-full bg-black object-cover">
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
                    <button
                      type="button"
                      className="absolute bottom-1 right-1 rounded-full bg-black bg-opacity-50 p-2 outline-none hover:bg-opacity-20"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <button
                    type="button"
                    className="absolute right-1 top-1 rounded-full bg-black bg-opacity-50 p-2 outline-none hover:bg-opacity-20"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex w-full flex-row items-center justify-center gap-x-2">
                  <div className="flex w-full flex-col items-start gap-y-1">
                    <label className="ml-1 text-xs font-light" htmlFor="name">
                      Full name
                    </label>
                    <input
                      className="w-full rounded-lg bg-white bg-opacity-20 px-3 py-2 text-sm text-white outline-none backdrop-blur-sm"
                      autoComplete="off"
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.currentTarget.value)}
                    />
                  </div>
                  <div className="flex w-full flex-col items-start gap-y-1">
                    <label className="ml-1 text-xs font-light" htmlFor="username">
                      Username
                    </label>
                    <input
                      className="w-full rounded-lg bg-white bg-opacity-20 px-3 py-2 text-sm text-white outline-none backdrop-blur-sm"
                      autoComplete="off"
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.currentTarget.value)}
                    />
                  </div>
                </div>
                <div className="flex w-full flex-col items-start gap-y-1">
                  <label className="ml-1 text-xs font-light" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full rounded-lg bg-white bg-opacity-20 px-3 py-2 text-sm text-white outline-none backdrop-blur-sm"
                    autoComplete="off"
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                  />
                </div>
                <button
                  disabled={isPending}
                  type="button"
                  className={clsx(
                    isPending && 'opacity-50',
                    'w-full rounded-lg bg-black p-2.5 text-sm font-light text-white outline-none transition duration-200 hover:bg-opacity-50',
                  )}
                  onClick={handleUpdateProfile}
                >
                  {isPending ? 'Loading...' : 'Update'}
                </button>
              </div>
              {/* PRIVACY OPTIONS */}
              <div className="flex w-full flex-col items-start gap-y-3 px-3 pb-3">
                <div className="flex w-full flex-col items-start justify-center gap-y-2 py-3">
                  <h1 className="text-base font-bold">Privacy Options</h1>
                </div>
                <div className="flex w-full flex-row items-center justify-between gap-x-1">
                  <p className="text-sm font-light">Display your name in your profile</p>
                  <Switch
                    checked={displayName}
                    onChange={() => setDisplayName(!displayName)}
                    className={clsx(
                      displayName ? 'bg-blue-600' : 'bg-gray-200',
                      'relative inline-flex h-6 w-11 items-center rounded-full',
                    )}
                  >
                    <span
                      className={clsx(
                        displayName ? 'translate-x-6 bg-white' : 'translate-x-1 bg-blue-600',
                        'inline-block h-4 w-4 transform rounded-full transition',
                      )}
                    />
                  </Switch>
                </div>
                <div className="flex w-full flex-row items-center justify-between gap-x-1">
                  <p className="text-sm font-light">Receive files from anonymous</p>
                  <Switch
                    checked={receiveFilesAnonymous}
                    onChange={() => setReceiveFilesAnonymous(!receiveFilesAnonymous)}
                    className={clsx(
                      receiveFilesAnonymous ? 'bg-blue-600' : 'bg-gray-200',
                      'relative inline-flex h-6 w-11 items-center rounded-full',
                    )}
                  >
                    <span
                      className={clsx(
                        receiveFilesAnonymous
                          ? 'translate-x-6 bg-white'
                          : 'translate-x-1 bg-blue-600',
                        'inline-block h-4 w-4 transform rounded-full transition',
                      )}
                    />
                  </Switch>
                </div>
                <div className="flex w-full flex-row items-center justify-between gap-x-1">
                  <p className="text-sm font-light">Receive images from anonymous</p>
                  <Switch
                    checked={receiveImagesAnonymous}
                    onChange={() => setReceiveImagesAnonymous(!receiveImagesAnonymous)}
                    className={clsx(
                      receiveImagesAnonymous ? 'bg-blue-600' : 'bg-gray-200',
                      'relative inline-flex h-6 w-11 items-center rounded-full',
                    )}
                  >
                    <span
                      className={clsx(
                        receiveImagesAnonymous
                          ? 'translate-x-6 bg-white'
                          : 'translate-x-1 bg-blue-600',
                        'inline-block h-4 w-4 transform rounded-full transition',
                      )}
                    />
                  </Switch>
                </div>
              </div>
              {/* SOCIAL MEDIA LINK */}
              <div className="flex w-full flex-col items-start gap-y-3 px-3 pb-3">
                <div className="flex w-full flex-col items-start justify-center gap-y-2 py-3">
                  <h1 className="text-base font-bold">Social Links</h1>
                </div>
                <div className="flex w-full flex-col items-start gap-y-1">
                  <label className="ml-1 text-xs font-light" htmlFor="facebook">
                    Facebook
                  </label>
                  <input
                    className="w-full rounded-lg bg-white bg-opacity-20 px-3 py-2 text-sm text-white outline-none backdrop-blur-sm"
                    type="text"
                    id="facebook"
                    value={facebookLink}
                    onChange={(e) => setFacebookLink(e.currentTarget.value)}
                  />
                </div>
                <div className="flex w-full flex-col items-start gap-y-1">
                  <label className="ml-1 text-xs font-light" htmlFor="instagram">
                    Instagram
                  </label>
                  <input
                    className="w-full rounded-lg bg-white bg-opacity-20 px-3 py-2 text-sm text-white outline-none backdrop-blur-sm"
                    type="text"
                    id="instagram"
                    value={instagramLink}
                    onChange={(e) => setInstagramLink(e.currentTarget.value)}
                  />
                </div>
                <div className="flex w-full flex-col items-start gap-y-1">
                  <label className="ml-1 text-xs font-light" htmlFor="twitterx">
                    Twitter/X
                  </label>
                  <input
                    className="w-full rounded-lg bg-white bg-opacity-20 px-3 py-2 text-sm text-white outline-none backdrop-blur-sm"
                    type="text"
                    id="twitterx"
                    value={twitterxLink}
                    onChange={(e) => setTwitterxLink(e.currentTarget.value)}
                  />
                </div>
                <div className="flex w-full flex-col items-start gap-y-1">
                  <label className="ml-1 text-xs font-light" htmlFor="linkedin">
                    LinkedIn
                  </label>
                  <input
                    className="w-full rounded-lg bg-white bg-opacity-20 px-3 py-2 text-sm text-white outline-none backdrop-blur-sm"
                    type="text"
                    id="linkedin"
                    value={linkedinLink}
                    onChange={(e) => setLinkedinLink(e.currentTarget.value)}
                  />
                </div>
                <div className="flex w-full flex-col items-start gap-y-1">
                  <label className="ml-1 text-xs font-light" htmlFor="github">
                    Github
                  </label>
                  <input
                    className="w-full rounded-lg bg-white bg-opacity-20 px-3 py-2 text-sm text-white outline-none backdrop-blur-sm"
                    type="text"
                    id="github"
                    value={githubLink}
                    onChange={(e) => setGithubLink(e.currentTarget.value)}
                  />
                </div>
                <div className="flex w-full flex-col items-start gap-y-1">
                  <label className="ml-1 text-xs font-light" htmlFor="website">
                    Website
                  </label>
                  <input
                    className="w-full rounded-lg bg-white bg-opacity-20 px-3 py-2 text-sm text-white outline-none backdrop-blur-sm"
                    type="text"
                    id="website"
                    value={websiteLink}
                    onChange={(e) => setWebsiteLink(e.currentTarget.value)}
                  />
                </div>
                <button
                  className="w-full rounded-lg bg-black p-2.5 text-sm font-light text-white outline-none transition duration-200 hover:bg-opacity-50"
                  type="button"
                >
                  Save
                </button>
              </div>
              {/* CHANGE PASSWORD */}
              <div className="flex w-full flex-col items-start gap-y-3 px-3 pb-3">
                <div className="flex w-full flex-col items-start justify-center gap-y-2 py-3">
                  <h1 className="text-base font-bold">Change Password</h1>
                </div>
                <div className="flex w-full flex-col items-start gap-y-1">
                  <label className="ml-1 text-xs font-light" htmlFor="oldpassword">
                    Old Password
                  </label>
                  <input
                    className="w-full rounded-lg bg-white bg-opacity-20 px-3 py-2 text-sm text-white outline-none backdrop-blur-sm"
                    type="password"
                    id="oldpassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.currentTarget.value)}
                  />
                </div>
                <div className="flex w-full flex-row items-center justify-center gap-x-2">
                  <div className="flex w-full flex-col items-start gap-y-1">
                    <label className="ml-1 text-xs font-light" htmlFor="newpassword">
                      New Password
                    </label>
                    <input
                      className="w-full rounded-lg bg-white bg-opacity-20 px-3 py-2 text-sm text-white outline-none backdrop-blur-sm"
                      type="password"
                      id="newpassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.currentTarget.value)}
                    />
                  </div>
                  <div className="flex w-full flex-col items-start gap-y-1">
                    <label className="ml-1 text-xs font-light" htmlFor="repassword">
                      Re-enter Password
                    </label>
                    <input
                      className="w-full rounded-lg bg-white bg-opacity-20 px-3 py-2 text-sm text-white outline-none backdrop-blur-sm"
                      type="password"
                      id="repassword"
                      value={repassword}
                      onChange={(e) => setRepassword(e.currentTarget.value)}
                    />
                  </div>
                </div>
                <button
                  className="w-full rounded-lg bg-black p-2.5 text-sm font-light text-white outline-none transition duration-200 hover:bg-opacity-50"
                  type="button"
                >
                  Confirm
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
