import type { NextApiResponse } from 'next';
import { withSessionApiRoute } from '~/config/withSession';
import prisma from '~/config/Prisma';

export default withSessionApiRoute(async function handler(req: any, res: NextApiResponse) {
  try {
    if (req.method !== 'PATCH') return res.status(500).json('INVALID REQUEST METHOD');

    if (!req.session.user) return res.status(403).json('NOT AUTHENTICATED');

    const {
      facebook_link,
      instagram_link,
      twitterx_link,
      linkedin_link,
      github_link,
      website_link,
    } = req.body;

    const user = await prisma.user.update({
      where: {
        id: req.session.user.id,
      },
      data: {
        facebook_link,
        instagram_link,
        twitterx_link,
        linkedin_link,
        github_link,
        website_link,
      },
    });

    if (user) {
      res.status(200).json(user);
    } else {
      return res.status(400).json({
        message: 'Something wrong while updating the social links.',
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});
