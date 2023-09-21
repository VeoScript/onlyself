import type { NextApiResponse } from 'next';
import { withSessionApiRoute } from '~/config/withSession';
import prisma from '~/config/Prisma';

export default withSessionApiRoute(async function handler(req: any, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') return res.status(500).json('INVALID REQUEST METHOD');

    const { is_anonymous, type, name, url, delete_url, sender_id, receiver_id } = req.body;

    const upload = await prisma.filesImages.create({
      data: {
        is_anonymous,
        type,
        name,
        url,
        delete_url,
        sender_id: is_anonymous ? null : sender_id,
        receiver_id,
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
