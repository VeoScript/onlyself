import type { NextApiResponse } from 'next';
import { withSessionApiRoute } from '~/config/withSession';
import prisma from '~/config/Prisma';

export default withSessionApiRoute(async function handler(req: any, res: NextApiResponse) {
  try {
    // DELETE ALL USER MESSAGES...
    if (req.method !== 'DELETE') return res.status(500).json('INVALID REQUEST METHOD');

    if (!req.session.user) return res.status(403).json('NOT AUTHENTICATED');

    const { username } = req.query;

    const message = await prisma.message.deleteMany({
      where: {
        receiver: {
          username,
        },
      },
    });

    if (message) {
      res.status(200).json({
        message: 'All messages deleted successfully.',
      });
    } else {
      return res.status(400).json({
        message: 'Something wrong while deleting all messages.',
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});
