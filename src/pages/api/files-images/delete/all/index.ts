import type { NextApiResponse } from 'next';
import { withSessionApiRoute } from '~/config/withSession';
import { utapi } from 'uploadthing/server';
import prisma from '~/config/Prisma';

export default withSessionApiRoute(async function handler(req: any, res: NextApiResponse) {
  try {
    // DELETE ALL USER FILES/IMAGES...
    if (req.method !== 'POST') return res.status(500).json('INVALID REQUEST METHOD');

    if (!req.session.user) return res.status(403).json('NOT AUTHENTICATED');

    const { username, type, files } = req.body;

    if (type === 'FILE' && files) {
      await utapi.deleteFiles(files);
    }

    const allFiles = await prisma.filesImages.deleteMany({
      where: {
        receiver: {
          username,
        },
      },
    });

    if (allFiles) {
      res.status(200).json({
        allFiles: 'All files/images deleted successfully.',
      });
    } else {
      return res.status(400).json({
        allFiles: 'Something wrong while deleting all files/images.',
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});
