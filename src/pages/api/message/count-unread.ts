import type { NextApiResponse } from 'next';
import { withSessionApiRoute } from '~/config/withSession';
import prisma from '~/config/Prisma';

export default withSessionApiRoute(async function handler(req: any, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') return res.status(500).json('INVALID REQUEST METHOD');

    if (!req.session.user) return res.status(403).json('NOT AUTHENTICATED');

    const countUnread = await prisma.message.count({
      where: {
        receiver_id: req.session.user.id,
        is_read: false,
      },
    });

    res.status(200).json(countUnread);
  } catch (error) {
    return res.status(500).json(error);
  }
});
