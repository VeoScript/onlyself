import type { NextApiResponse } from 'next';
import { withSessionApiRoute } from '~/config/withSession';
import prisma from '~/config/Prisma';

export default withSessionApiRoute(async function handler(req: any, res: NextApiResponse) {
  try {
    // DELETE SINGLE FILES/IMAGES...
    if (req.method !== 'PUT') return res.status(500).json('INVALID REQUEST METHOD');

    if (!req.session.user) return res.status(403).json('NOT AUTHENTICATED');

    const filesImages = await prisma.filesImages.updateMany({
      where: {
        receiver_id: req.session.user.id,
      },
      data: {
        is_read: true,
      },
    });

    if (filesImages) {
      res.status(200).json({
        filesImages: 'All files/images are read successfully.',
      });
    } else {
      return res.status(400).json({
        filesImages: 'Something wrong while reading a files/images.',
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});
