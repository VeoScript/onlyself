import type { NextApiResponse } from 'next';
import { withSessionApiRoute } from '~/config/withSession';
import prisma from '~/config/Prisma';

export default withSessionApiRoute(async function handler(req: any, res: NextApiResponse) {
  try {
    // DELETE SINGLE MESSAGE...
    if (req.method !== 'DELETE') return res.status(500).json('INVALID REQUEST METHOD');

    if (!req.session.user) return res.status(403).json('NOT AUTHENTICATED');

    const { id } = req.query;

    const message = await prisma.message.delete({
      where: {
        id,
      },
    });

    if (message) {
      res.status(200).json({
        message: 'Message deleted successfully.',
      });
    } else {
      return res.status(400).json({
        message: 'Something wrong while deleting a message.',
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});
