import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '~/config/Prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(500).json('INVALID REQUEST METHOD');

  const { username } = req.query;

  const user = await prisma.user.findUnique({
    where: {
      username: username as string,
    },
    select: {
      id: true,
      profile_photo: true,
      cover_photo: true,
      name: true,
      username: true,
      email: true,
      short_bio: true,
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

  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    })
  }

  res.status(200).json(user);
}
