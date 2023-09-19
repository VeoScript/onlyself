import type { NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';
import { withIronSessionApiRoute } from 'iron-session/next';
import prisma from '~/config/Prisma';

export default withIronSessionApiRoute(
  async function handler(req: any, res: NextApiResponse) {
    try {
      if (req.method !== 'PATCH') return res.status(500).json('INVALID REQUEST METHOD');

      if (!req.session.user) return res.status(403).json('NOT AUTHENTICATED');

      const { profile_photo, cover_photo, name, username, email } = req.body;

      // upload/change profile photo...
      if (profile_photo) {
        await prisma.user.update({
          where: {
            id: req.session.user.id,
          },
          data: {
            profile_photo,
          },
        });
      }

      // upload/change cover photo...
      if (cover_photo) {
        await prisma.user.update({
          where: {
            id: req.session.user.id,
          },
          data: {
            cover_photo,
          },
        });
      }

      // update/change name, username, or email...
      const user = await prisma.user.update({
        where: {
          id: req.session.user.id,
        },
        data: {
          name,
          username,
          email,
        },
      });

      if (user) {
        res.status(200).json(user);
      } else {
        return res.status(400).json({
          message: 'Something wrong while updating the profile.',
        });
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // P2002 - is prisma error code for unique constraint violation...
        if (error.code === 'P2002') {
          if (error?.meta?.target === 'User_username_key') {
            return res.status(400).json({
              message: 'Username is not available.',
            });
          }
          if (error?.meta?.target === 'User_email_key') {
            return res.status(400).json({
              message: 'Email is not available.',
            });
          }
        }
      }
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
