import type { NextApiResponse } from 'next';
import { withSessionApiRoute } from '~/config/withSession';
import prisma from '~/config/Prisma';
import * as bcrypt from 'bcrypt';

const roundsOfHashing = 10;

export default withSessionApiRoute(async function handler(req: any, res: NextApiResponse) {
  try {
    if (req.method !== 'PATCH') return res.status(500).json('INVALID REQUEST METHOD');

    if (!req.session.user) return res.status(403).json('NOT AUTHENTICATED');

    const { old_password, new_password } = req.body;

    const currentUser = await prisma.user.findUnique({
      where: {
        id: req.session.user.id,
      },
      select: {
        password: true,
      },
    });

    if (currentUser) {
      const matchedPassword = await bcrypt.compare(old_password, currentUser.password);

      if (!matchedPassword) {
        return res.status(400).json({
          message: 'Old password is invalid.',
        });
      }

      const hashedPassword = await bcrypt.hash(new_password, roundsOfHashing);

      const user = await prisma.user.update({
        where: {
          id: req.session.user.id,
        },
        data: {
          password: hashedPassword,
        },
      });

      if (user) {
        res.status(200).json(user);
      } else {
        return res.status(400).json({
          message: 'Something wrong while updating the password.',
        });
      }
    } else {
      return res.status(400).json({
        message: 'UNAUTHENTICATED',
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});
