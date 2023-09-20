import type { NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import prisma from '~/config/Prisma';

export default withIronSessionApiRoute(
  async function handler(req: any, res: NextApiResponse) {
    try {
      // DELETE SINGLE MESSAGE...
      if (req.method !== 'PUT') return res.status(500).json('INVALID REQUEST METHOD');

      if (!req.session.user) return res.status(403).json('NOT AUTHENTICATED');

      const message = await prisma.message.updateMany({
        where: {
          user_id: req.session.user.id,
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
