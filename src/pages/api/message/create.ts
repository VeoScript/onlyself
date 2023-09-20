import type { NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import prisma from '~/config/Prisma';

export default withIronSessionApiRoute(
  async function handler(req: any, res: NextApiResponse) {
    try {
      if (req.method !== 'POST') return res.status(500).json('INVALID REQUEST METHOD');

      const { is_anonymous, content, sender_id, receiver_id } = req.body;

      const message = await prisma.message.create({
        data: {
          is_anonymous,
          content,
          sender_id: is_anonymous ? null : sender_id,
          receiver_id,
        },
      });

      if (message) {
        res.status(200).json(message);
      } else {
        return res.status(400).json({
          message: 'Something wrong while sending a message.',
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
