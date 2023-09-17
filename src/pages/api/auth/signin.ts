import type { NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import prisma from '~/config/Prisma';
import * as bcrypt from 'bcrypt';

export default withIronSessionApiRoute(
  async function handler(req: any, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(500).json('INVALID REQUEST METHOD');

    const { email, password } = req.body;

    const foundUser = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        username: true,
        password: true,
      },
    });

    if (!foundUser) {
      return res.status(400).json({
        message: 'Account not found.',
      });
    }

    const matchedPassword = await bcrypt.compare(password, foundUser.password);

    if (!matchedPassword) {
      return res.status(400).json({
        message: 'Incorrect password.',
      });
    }

    req.session.user = { id: foundUser.id };

    await req.session.save();

    res.status(200).json({
      id: foundUser.id,
      email: foundUser.email,
      username: foundUser.username,
    });
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
