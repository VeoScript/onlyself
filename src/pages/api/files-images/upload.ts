import type { NextApiResponse } from 'next';
import { withSessionApiRoute } from '~/config/withSession';
import prisma from '~/config/Prisma';

export default withSessionApiRoute(async function handler(req: any, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') return res.status(500).json('INVALID REQUEST METHOD');

    const { type, name, url, delete_url } = req.body;

    const upload = await prisma.filesImages.create({
      data: {
        type,
        name,
        url,
        delete_url,
      },
    });

    if (upload) {
      res.status(200).json(upload);
    } else {
      return res.status(400).json({
        message: 'Something wrong while uploading a files/images.',
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});
