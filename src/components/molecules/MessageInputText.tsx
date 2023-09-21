import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Switch } from '@headlessui/react';
import clsx from 'clsx';
import Image from 'next/image';
import ActivityIndicator from '../atoms/ActivityIndicator';

import { sendImagesStore } from '~/helpers/stores/upload';
import { useCreateMessageMutation } from '~/helpers/tanstack/mutations/message/create-message';
import { useUploadFilesImagesMutation } from '~/helpers/tanstack/mutations/files-images/upload';

interface MessageInputTextProps {
  isAuth: boolean;
  receiveFilesAnonymous: boolean;
  receiveImageAnonymous: boolean;
  senderId: string;
  receiverId: string;
}

const MessageInputText = ({
  isAuth,
  receiveFilesAnonymous,
  receiveImageAnonymous,
  senderId,
  receiverId,
}: MessageInputTextProps): JSX.Element => {
  const createMessageMutation = useCreateMessageMutation();
  const uploadFilesImagesMutation = useUploadFilesImagesMutation();

  const [isPending, setIsPending] = useState<boolean>(false);

  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  const [messageContent, setMessageContent] = useState<string>('');

  const {
    previewImages,
    imagesUploaded,
    setPreviewImages,
    setImagesUpload,
    setDefault: setDefaultImages,
  } = sendImagesStore();

  const setDefault = () => {
    setIsPending(false);
    setMessageContent('');
  };

  const deleteSingleImage = (indexToDelete: number) => {
    sendImagesStore.setState((prevState) => {
      const newPreviewImages = [...prevState.previewImages];
      const newImagesUploaded = [...prevState.imagesUploaded];

      newPreviewImages.splice(indexToDelete, 1);
      newImagesUploaded.splice(indexToDelete, 1);

      return { previewImages: newPreviewImages, imagesUploaded: newImagesUploaded };
    });
  };

  const handleAddImages = (e: any) => {
    for (const file of e.target.files) {
      setImagesUpload(file);

      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewImages([reader.result]);
      };
      reader.onerror = () => {
        console.error(reader.error);
      };
    }
  };

  const handleSendMessage = async () => {
    if (messageContent.trim() === '') return toast.error('Message is required.');

    setIsPending(true);

    // upload bulk images to hosting...
    if (imagesUploaded) {
      for (const image of imagesUploaded) {
        const formData = new FormData();
        formData.append('image', image);

        await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then(async (result) => {
            await uploadFilesImagesMutation.mutateAsync(
              {
                name: result.data.image.filename,
                type: 'IMAGE',
                url: result.data.url,
                delete_url: result.data.delete_url,
              },
              {
                onError: () => {
                  setIsPending(false);
                  toast.error('Upload images failed. Try again.');
                },
                onSuccess: () => {
                  toast.success('Images uploaded successfully.');
                  setDefaultImages();
                },
              },
            );
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }

    // send message...
    await createMessageMutation.mutateAsync(
      {
        is_anonymous: isAnonymous,
        content: messageContent,
        sender_id: senderId,
        receiver_id: receiverId,
      },
      {
        onError: (error) => {
          setIsPending(false);
          toast.error(error.response.data.message);
        },
        onSuccess: () => {
          toast.success('Message sent successfully.');
          setDefault();
        },
      },
    );
  };

  const onEnterPress = (e: React.KeyboardEvent) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      className="flex w-full flex-col items-center overflow-hidden rounded-xl"
      data-aos="fade-up"
      data-aos-delay="600"
    >
      <div className="flex w-full flex-row items-center justify-between bg-white bg-opacity-20 p-3 backdrop-blur-sm">
        <h1 className="text-xs text-white">Send me a message! 🤗</h1>
        <div className="flex items-center gap-x-2">
          <span className="text-xs font-light text-white">As anonymous</span>
          {!isAuth && <span className="text-2xl text-accent-2">&bull;</span>}
          {isAuth && (
            <Switch
              checked={isAnonymous}
              onChange={() => setIsAnonymous(!isAnonymous)}
              className={clsx(
                isAnonymous ? 'bg-green-500' : 'bg-gray-200',
                'relative inline-flex h-6 w-11 items-center rounded-full',
              )}
            >
              <span
                className={clsx(
                  isAnonymous ? 'translate-x-6 bg-white' : 'translate-x-1 bg-green-500',
                  'inline-block h-4 w-4 transform rounded-full transition',
                )}
              />
            </Switch>
          )}
        </div>
      </div>
      <textarea
        className="h-full w-full resize-none bg-white p-3 text-sm outline-none"
        rows={5}
        cols={40}
        spellCheck={false}
        placeholder="Write some short message..."
        value={messageContent}
        onChange={(e) => setMessageContent(e.currentTarget.value)}
        onKeyDown={onEnterPress}
      />
      <div className="flex w-full flex-col gap-y-3 bg-white bg-opacity-20 p-3 backdrop-blur-sm">
        <div className="flex w-full flex-row items-center justify-between gap-x-1">
          <div className="flex flex-row items-center gap-x-1">
            {receiveImageAnonymous && (
              <>
                <label
                  htmlFor="sendImage"
                  className="flex flex-row items-center gap-x-1 rounded-xl border border-neutral-400 p-2 outline-none hover:opacity-50"
                >
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
                    className="h-4 w-4 text-white"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span className="text-xs font-light text-white">Send Image</span>
                </label>
                <input
                  multiple
                  type="file"
                  id="sendImage"
                  className="hidden"
                  onChange={handleAddImages}
                  accept=".jpg, .png, .jpeg, .jfif"
                />
              </>
            )}
            {receiveFilesAnonymous && (
              <>
                <label
                  htmlFor="sendFile"
                  className="flex flex-row items-center gap-x-1 rounded-xl border border-neutral-400 p-2 outline-none hover:opacity-50"
                >
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
                    className="h-4 w-4 text-white"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  <span className="text-xs font-light text-white">Send File</span>
                </label>
                <input
                  multiple
                  type="file"
                  id="sendFile"
                  className="hidden"
                  onChange={() => ''}
                  accept=".pdf, .docx, .xlsx, .pptx"
                />
              </>
            )}
          </div>
          <button
            data-tooltip-id="onlyself-tooltip"
            data-tooltip-content="Send Message"
            disabled={isPending}
            type="button"
            className="outline-none"
            onClick={handleSendMessage}
          >
            {isPending ? (
              <ActivityIndicator className="h-6 w-6" />
            ) : (
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
                className="h-6 w-6 text-white hover:opacity-50"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            )}
          </button>
        </div>
        {previewImages.length != 0 && (
          <div className="flex w-full flex-wrap gap-3">
            {previewImages.map((link: any, index: number) => (
              <div
                key={link}
                className="relative flex h-[10rem] w-[10rem] overflow-hidden rounded-md"
              >
                {!isPending && (
                  <button
                    type="button"
                    className="absolute right-2 top-2 z-10 rounded-full bg-black bg-opacity-50 p-1 outline-none hover:opacity-50"
                    onClick={() => deleteSingleImage(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-4 w-4 text-white"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                <Image
                  src={link[0]}
                  className="h-full w-full object-cover"
                  alt="Image"
                  width={100}
                  height={100}
                  quality={100}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageInputText;
