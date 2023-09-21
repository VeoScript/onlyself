import { withSessionApiRoute } from '~/config/withSession';
import { NextApiResponse } from 'next';

export default withSessionApiRoute(async function handler(req: any, res: NextApiResponse) {
  if (req.method !== 'DELETE') return res.status(500).json('INVALID REQUEST METHOD');

  await req.session.destroy();

  res.status(200).json({
    message: 'Logged out successfully.',
  });
});
