import Link from 'next/link';
import Image from 'next/image';

import facebook from '../../../public/svg/facebook.svg';
import instagram from '../../../public/svg/instagram.svg';
import twitter from '../../../public/svg/twitter.svg';
import linkedin from '../../../public/svg/linkedin.svg';
import github from '../../../public/svg/github.svg';

interface SocialMediaHolderProps {
  facebook_link: string;
  instagram_link: string;
  twitterx_link: string;
  linkedin_link: string;
  github_link: string;
  website_link: string;
}

const SocialMediaHolder = ({
  facebook_link,
  instagram_link,
  twitterx_link,
  linkedin_link,
  github_link,
  website_link,
}: SocialMediaHolderProps): JSX.Element => {
  return (
    <div className="my-3 flex flex-row items-center gap-x-3">
      {facebook_link && (
        <Link
          href={`https://www.facebook.com/${facebook_link}`}
          target="_blank"
          data-tooltip-id="onlyself-tooltip"
          data-tooltip-content="Facebook"
        >
          <Image
            priority
            src={facebook}
            alt="facebook"
            width={100}
            height={100}
            className="h-6 w-6"
          />
        </Link>
      )}
      {instagram_link && (
        <Link
          href={`https://www.instagram.com/${instagram_link}`}
          target="_blank"
          data-tooltip-id="onlyself-tooltip"
          data-tooltip-content="Instagram"
        >
          <Image
            priority
            src={instagram}
            alt="instagram"
            width={100}
            height={100}
            className="h-6 w-6"
          />
        </Link>
      )}
      {twitterx_link && (
        <Link
          href={`https://twitter.com/${twitterx_link}`}
          target="_blank"
          data-tooltip-id="onlyself-tooltip"
          data-tooltip-content="Twitter/X"
        >
          <Image
            priority
            src={twitter}
            alt="twitter"
            width={100}
            height={100}
            className="h-6 w-6"
          />
        </Link>
      )}
      {linkedin_link && (
        <Link
          href={`https://www.linkedin.com/in/${linkedin_link}`}
          target="_blank"
          data-tooltip-id="onlyself-tooltip"
          data-tooltip-content="LinkedIn"
        >
          <Image
            priority
            src={linkedin}
            alt="linkedin"
            width={100}
            height={100}
            className="h-6 w-6"
          />
        </Link>
      )}
      {github_link && (
        <Link
          href={`https://github.com/${github_link}`}
          target="_blank"
          data-tooltip-id="onlyself-tooltip"
          data-tooltip-content="Github"
        >
          <Image priority src={github} alt="github" width={100} height={100} className="h-6 w-6" />
        </Link>
      )}
      {website_link && (
        <Link
          href={website_link}
          target="_blank"
          data-tooltip-id="onlyself-tooltip"
          data-tooltip-content="Website"
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
            className="h-6 w-6 text-white"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </Link>
      )}
    </div>
  );
};

export default SocialMediaHolder;
