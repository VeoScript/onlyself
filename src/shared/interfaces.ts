export interface UserProps {
  id: string;
  profile_photo: string;
  cover_photo: string;
  name: string;
  username: string;
  email: string;
  short_bio: string;
  favorite_quote: string;
  facebook_link: string;
  instagram_link: string;
  twitterx_link: string;
  linkedin_link: string;
  github_link: string;
  website_link: string;
  is_display_name: boolean;
  is_receive_files_anonymous: boolean;
  is_receive_images_anonymous: boolean;
  created_at: string;
}

export interface MessageProps {
  id: string;
  is_read: boolean;
  is_anonymous: boolean;
  content: string;
  created_at: string;
  updated_at: string;
  sender: {
    id: string;
    profile_photo: string;
    username: string;
  };
  receiver: {
    id: string;
    profile_photo: string;
    username: string;
  };
}

export interface FilesImagesProps {
  id: string;
  is_read: boolean;
  is_anonymous: boolean;
  name: string;
  type: 'IMAGE' | 'FILE';
  url: string;
  delete_url: string;
  created_at: string;
  updated_at: string;
  sender: {
    id: string;
    username: string;
  };
  receiver: {
    id: string;
    username: string;
  };
}
