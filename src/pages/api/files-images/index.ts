import type { NextApiResponse } from 'next';
import { withSessionApiRoute } from '~/config/withSession';
import prisma from '~/config/Prisma';

export default withSessionApiRoute(async function handler(req: any, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') return res.status(500).json('INVALID REQUEST METHOD');

    if (!req.session.user) return res.status(403).json('NOT AUTHENTICATED');

    const { search, cursor } = req.query;

    const limit = 20;
    const cursorObj = cursor === '' ? undefined : { id: (cursor as string) ?? '' };

    const filesImages = await prisma.filesImages.findMany({
      where: {
        receiver_id: req.session.user.id,
        name: {
          contains: search as string,
        },
      },
      select: {
        id: true,
        is_read: true,
        is_anonymous: true,
        name: true,
        type: true,
        url: true,
        delete_url: true,
        sender: {
          select: {
            id: true,
            username: true,
          },
        },
        receiver: {
          select: {
            id: true,
            username: true,
          },
        },
        created_at: true,
      },
      orderBy: {
        created_at: 'desc',
      },
      take: limit,
      cursor: cursorObj,
      skip: cursor === '' ? 0 : 1,
    });

    res.status(200).json({
      filesImages,
      nextId: filesImages.length === limit ? filesImages[limit - 1].id : undefined,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});
