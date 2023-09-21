export interface ModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export interface UploadProfileProps {
  previewProfileImage: any;
  imageProfileUploaded: any;
  setPreviewProfileImage: (value: any) => void;
  setImageProfileUploaded: (value: any) => void;
  setDefault: () => void;
}

export interface UploadCoverProps {
  previewCoverImage: any;
  imageCoverUploaded: any;
  setPreviewCoverImage: (value: any) => void;
  setImageCoverUploaded: (value: any) => void;
  setDefault: () => void;
}

export interface SendMessageImagesProps {
  previewImages: any[];
  imagesUploaded: any[];
  setPreviewImages: (value: any[]) => void;
  setImagesUpload: (value: any[]) => void;
  setDefault: () => void;
}
