import type { NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import prisma from '~/config/Prisma';
import * as bcrypt from 'bcrypt';

const roundsOfHashing = 10;

export default withIronSessionApiRoute(
  async function handler(req: any, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(500).json('INVALID REQUEST METHOD');

    const { name, email, password } = req.body;

    const foundUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (foundUser) {
      return res.status(400).json({
        message: 'This email is not available.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, roundsOfHashing);

    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    let username = '';

    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      username += charset.charAt(randomIndex);
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        username,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    req.session.user = { id: user.id };

    await req.session.save();

    res.status(200).json(user);
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
