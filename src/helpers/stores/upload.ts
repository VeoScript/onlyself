import { create } from 'zustand';
import * as type from './interfaces';

export const uploadProfileStore = create<type.UploadProfileProps>((set) => ({
  previewProfileImage: null,
  imageProfileUploaded: null,
  setPreviewProfileImage: (value: any) => set(() => ({ previewProfileImage: value })),
  setImageProfileUploaded: (value: any) => set(() => ({ imageProfileUploaded: value })),
  setDefault: () =>
    set(() => ({
      imageProfileUploaded: null,
      previewProfileImage: null,
    })),
}));

export const uploadCoverStore = create<type.UploadCoverProps>((set) => ({
  previewCoverImage: null,
  imageCoverUploaded: null,
  setPreviewCoverImage: (value: any) => set(() => ({ previewCoverImage: value })),
  setImageCoverUploaded: (value: any) => set(() => ({ imageCoverUploaded: value })),
  setDefault: () =>
    set(() => ({
      previewCoverImage: null,
      imageCoverUploaded: null,
    })),
}));

export const sendImagesStore = create<type.SendMessageImagesProps>((set, get) => ({
  previewImages: [],
  imagesUploaded: [],
  setPreviewImages: (value: any[]) => set(() => ({ previewImages: [...get().previewImages, value] })),
  setImagesUpload: (value: any[]) => set(() => ({ imagesUploaded: [...get().imagesUploaded, value] })),
  setDefault: () =>
    set(() => ({
      previewImages: [],
      imagesUploaded: [],
    })),
}));
