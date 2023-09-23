import type { NextApiResponse } from 'next';
import { withSessionApiRoute } from '~/config/withSession';
import { utapi } from 'uploadthing/server';
import prisma from '~/config/Prisma';

export default withSessionApiRoute(async function handler(req: any, res: NextApiResponse) {
  try {
    // DELETE SINGLE FILE/IMAGE...
    if (req.method !== 'DELETE') return res.status(500).json('INVALID REQUEST METHOD');

    if (!req.session.user) return res.status(403).json('NOT AUTHENTICATED');

    const { id, type, delete_url } = req.query;

    if (type === 'FILE' && delete_url) {
      await utapi.deleteFiles(delete_url);
    }

    const files = await prisma.filesImages.delete({
      where: {
        id,
      },
    });

    if (files) {
      res.status(200).json({
        files: 'File/Image deleted successfully.',
      });
    } else {
      return res.status(400).json({
        files: 'Something wrong while deleting a file/image.',
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});
