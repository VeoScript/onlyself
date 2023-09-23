import type { NextApiResponse } from 'next';
import { withSessionApiRoute } from '~/config/withSession';
import prisma from '~/config/Prisma';

export default withSessionApiRoute(async function handler(req: any, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') return res.status(500).json('INVALID REQUEST METHOD');

    if (!req.session.user) return res.status(403).json('NOT AUTHENTICATED');

    const allFiles = await prisma.filesImages.findMany({
      where: {
        receiver_id: req.session.user.id,
      },
      select: {
        id: true,
        delete_url: true,
      },
    });

    res.status(200).json(allFiles);
  } catch (error) {
    return res.status(500).json(error);
  }
});
