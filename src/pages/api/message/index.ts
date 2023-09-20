import type { NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import prisma from '~/config/Prisma';

export default withIronSessionApiRoute(
  async function handler(req: any, res: NextApiResponse) {
    try {
      if (req.method !== 'GET') return res.status(500).json('INVALID REQUEST METHOD');

      if (!req.session.user) return res.status(403).json('NOT AUTHENTICATED');

      const { search, cursor } = req.query;

      const limit = 15;
      const cursorObj = cursor === '' ? undefined : { id: (cursor as string) ?? '' };

      const messages = await prisma.message.findMany({
        where: {
          receiver_id: req.session.user.id,
          content: {
            contains: search as string,
          },
        },
        select: {
          id: true,
          is_read: true,
          is_anonymous: true,
          content: true,
          sender: {
            select: {
              id: true,
              profile_photo: true,
              username: true,
            },
          },
          receiver: {
            select: {
              id: true,
              profile_photo: true,
              username: true,
            },
          },
          created_at: true,
        },
        orderBy: {
          created_at: 'desc',
        },
        take: limit,
        cursor: cursorObj,
        skip: cursor === '' ? 0 : 1,
      });

      res.status(200).json({
        messages,
        nextId: messages.length === limit ? messages[limit - 1].id : undefined,
      });
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
