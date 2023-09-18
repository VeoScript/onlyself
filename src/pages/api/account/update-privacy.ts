import type { NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import prisma from '~/config/Prisma';

export default withIronSessionApiRoute(
  async function handler(req: any, res: NextApiResponse) {
    try {
      if (req.method !== 'PATCH') return res.status(500).json('INVALID REQUEST METHOD');

      if (!req.session.user) return res.status(403).json('NOT AUTHENTICATED');

      const { is_display_name, is_receive_files_anonymous, is_receive_images_anonymous } = req.body;

      const user = await prisma.user.update({
        where: {
          id: req.session.user.id,
        },
        data: {
          is_display_name,
          is_receive_files_anonymous,
          is_receive_images_anonymous,
        },
      });

      if (user) {
        res.status(200).json(user);
      } else {
        return res.status(400).json({
          message: 'Something wrong while updating the privacy options.',
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
