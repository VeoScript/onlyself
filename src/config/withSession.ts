import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiHandler } from 'next';

const sessionOptions = {
  cookieName: 'onlyself',
  password: 'complex_password_at_least_32_characters_long',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export function withSessionApiRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}
