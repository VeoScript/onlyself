import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiResponse } from 'next';

export default withIronSessionApiRoute(
  async function handler(req: any, res: NextApiResponse) {
    if (req.method !== 'DELETE') return res.status(500).json('INVALID REQUEST METHOD');

    await req.session.destroy();

    res.status(200).json({
      message: 'Logged out successfully.',
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
