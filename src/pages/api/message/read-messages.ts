import type { NextApiResponse } from 'next';
import { withSessionApiRoute } from '~/config/withSession';
import prisma from '~/config/Prisma';

export default withSessionApiRoute(async function handler(req: any, res: NextApiResponse) {
  try {
    // DELETE SINGLE MESSAGE...
    if (req.method !== 'PUT') return res.status(500).json('INVALID REQUEST METHOD');

    if (!req.session.user) return res.status(403).json('NOT AUTHENTICATED');

    const message = await prisma.message.updateMany({
      where: {
        receiver_id: req.session.user.id,
      },
      data: {
        is_read: true,
      },
    });

    if (message) {
      res.status(200).json({
        message: 'All messages are read successfully.',
      });
    } else {
      return res.status(400).json({
        message: 'Something wrong while reading a message.',
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});
