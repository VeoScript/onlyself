import type { NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import prisma from '~/config/Prisma';

export default withIronSessionApiRoute(
  async function handler(req: any, res: NextApiResponse) {
    if (req.method !== 'GET') return res.status(500).json('INVALID REQUEST METHOD');

    const user = await prisma.user.findUnique({
      where: {
        id: req.session.user.id,
      },
      select: {
        id: true,
        profile_photo: true,
        cover_photo: true,
        name: true,
        username: true,
        email: true,
        facebook_link: true,
        instagram_link: true,
        twitterx_link: true,
        linkedin_link: true,
        github_link: true,
        website_link: true,
        is_display_name: true,
        is_receive_files_anonymous: true,
        is_receive_images_anonymous: true,
        created_at: true,
      },
    });

    res.status(200).json(user);
  },
  {
    cookieName: 'onlyself',
    password: 'complex_password_at_least_32_characters_long',
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
);
