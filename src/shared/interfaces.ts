export interface UserProps {
  id: string;
  profile_photo: string;
  cover_photo: string;
  name: string;
  username: string;
  email: string;
  short_bio: string,
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