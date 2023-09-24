import type { NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';
import { withSessionApiRoute } from '~/config/withSession';
import prisma from '~/config/Prisma';

export default withSessionApiRoute(async function handler(req: any, res: NextApiResponse) {
  try {
    if (req.method !== 'PATCH') return res.status(500).json('INVALID REQUEST METHOD');

    if (!req.session.user) return res.status(403).json('NOT AUTHENTICATED');

    const { profile_photo, cover_photo, name, username, email, short_bio, favorite_quote } =
      req.body;

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
        short_bio,
        favorite_quote,
      },
    });

    if (user) {
      res.status(200).json(user);
    } else {
      return res.status(400).json({
        message: 'Something wrong while updating the profile.',
      });
    }
  } catch (error: any) {
    if (error.meta) {
      res.status(500).json({
        message: error.meta.target[0],
      });
    }
  }
});
