import type { NextApiResponse } from 'next';
import { withSessionApiRoute } from '~/config/withSession';
import prisma from '~/config/Prisma';

export default withSessionApiRoute(async function handler(req: any, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(500).json('INVALID REQUEST METHOD');

  if (!req.session.user) return res.status(403).json('NOT AUTHENTICATED');

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
      short_bio: true,
      favorite_quote: true,
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
});
